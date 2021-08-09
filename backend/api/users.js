import Category from '../models/Category.js';
import Group from '../models/Group.js';
import Place from '../models/Place.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import authenticateToken from '../util/AuthToken.js';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', authenticateToken, (req, res) => {
  // Search the MongoDB
  User.find({}, '-_id user_id name avatarURL groups requestGroups')
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

router.get('/favourites', authenticateToken, (req, res) => {
  const user_id = req.user.user_id;

  User.findOne({ user_id }, '-_id favourite_places')
    .then((favourites) => {
      res.json(favourites.favourite_places);
    })
    .catch((err) => console.log(err));
});

router.post('/favourites', authenticateToken, (req, res) => {
  const { place_id } = req.body;
  const user_id = req.user.user_id;

  if (place_id === undefined) {
    return res.status(400).json({ message: 'place_id not sent' });
  }

  Place.findOne({ place_id }).then((place) => {
    // Check if place exists
    if (!place) {
      return res.status(400).send({ message: 'Place not found' });
    }

    // Check if already favourited
    User.findOne({ user_id }, '-_id favourite_places').then((favourites) => {
      const favourited_places = favourites.favourite_places;
      if (favourited_places.includes(place_id)) {
        return res.status(400).send({ message: 'Place already favourited' });
      }
      User.updateOne({ user_id: user_id }, { $push: { favourite_places: place_id } }).then(() =>
        res.json({ message: 'Place has been favourited' })
      );
    });
  });
});

router.delete('/favourites', authenticateToken, (req, res) => {
  const { place_id } = req.body;
  const user_id = req.user.user_id;

  if (place_id === undefined) {
    return res.status(400).json({ message: 'place_id not sent' });
  }

  Place.findOne({ place_id }).then((place) => {
    // Check if place exists
    if (!place) {
      return res.status(400).json({ message: 'Place not found' });
    }

    // Check if already favourited
    User.findOne({ user_id }, '-_id favourite_places').then((favourites) => {
      const favourited_places = favourites.favourite_places;
      if (!favourited_places.includes(place_id)) {
        return res.status(400).send({ message: 'Place is not favourited' });
      }
      User.updateOne({ user_id: user_id }, { $pull: { favourite_places: place_id } }).then(() =>
        res.json({ message: 'Place has been removed from favourites' })
      );
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === '') {
    return res.status(400).send('Email field must be filled');
  }

  if (password === '') {
    return res.status(400).send('Password field must be filled');
  }

  // Find user by email
  User.findOne({ email: email.toLowerCase() }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(400).send('Email not found');
    }
    // Check password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        // Create JWT Payload
        const payload = {
          user_id: user.user_id,
          name: user.name,
          email: user.email
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).send('Password incorrect');
      }
    });
  });
});

router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (name === '') {
    return res.status(400).send('Name field must be filled');
  }

  if (email === '') {
    return res.status(400).send('Email field must be filled');
  }

  if (password === '') {
    return res.status(400).send('Password field must be filled');
  }

  if (password2 === '') {
    return res.status(400).send('Please confirm password');
  }

  if (password !== password2) {
    return res.status(400).send('Password fields do not match');
  }

  let avatarURL;
  const profPicSubmitted = Object.keys(req.files).length > 0;

  if (profPicSubmitted) {
    const profilePicPath = Object.values(req.files)[0].path;
    const cloudinaryResponse = await cloudinary.uploader.upload(profilePicPath);
    avatarURL = cloudinaryResponse.secure_url;
  } else {
    avatarURL =
      'https://res.cloudinary.com/dariaxbty/image/upload/v1628292561/default_user_rsbump.jpg'; // generic profile picture
  }

  User.findOne({ email: email.toLowerCase() }).then((user) => {
    if (user) {
      return res.status(400).send('Email already exists');
    } else {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const newUser = new User({
          user_id: uuidv4(),
          name: name,
          email: email.toLowerCase(),
          password: hash,
          avatarURL: avatarURL,
          groups: [],
          requestGroups: [],
          favourite_places: []
        });

        newUser
          .save()
          .then(() => res.send('User created successfully'))
          .catch((err) =>
            res.status(400).json({
              error: err,
              message: 'Error creating user'
            })
          );
      });
    }
  });
});

router.post('/group/request', authenticateToken, (req, res) => {
  const { group_id } = req.body;
  const user_id = req.user.user_id;
  // Find group to join
  Group.findOne({ group_id }).then((group) => {
    // Check if group exists
    if (!group) {
      return res.status(400).send('Group requested to join not found');
    }

    // Check if user is not already in the group or request to join before
    User.findOne({ user_id }).then((user) => {
      if (user.groups.includes(group_id)) {
        return res.status(400).send('Already a member of this group');
      }

      if (user.requestGroups.includes(group_id)) {
        return res.status(400).send('Already requested to join this group');
      }

      // Add group ID to user's requestGroups
      User.updateOne({ user_id }, { $push: { requestGroups: group_id } })
        .then(() => res.json({ success: true }))
        .catch((err) => console.log(err));
    });
  });
});

router.post('/group/accept', authenticateToken, (req, res) => {
  const { other_user_id, group_id } = req.body;
  const my_user_id = req.user.user_id;

  // Find group
  Group.findOne({ group_id }).then((group) => {
    // Check if group exists
    if (!group) {
      return res.status(400).send('Group does not exist');
    }
  });

  // Check if current user is part of group
  User.findOne({ user_id: my_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send('Cannot verify current user');
    }

    if (!user.groups.includes(group_id)) {
      return res
        .status(400)
        .send('Not authorized to accept users into a group you are not a member of');
    }
  });

  // Check if other user exists and has requested to join group
  User.findOne({ user_id: other_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send('Cannot find other user');
    }

    // Check if other user is already a member of this group
    if (user.groups.includes(group_id)) {
      return res.status(400).send('Other user is already part of this group');
    }

    if (user.requestGroups.includes(group_id)) {
      // Remove group ID from other user's requestGroup
      User.updateOne({ user_id: other_user_id }, { $pullAll: { requestGroups: [group_id] } })
        .then(() => {
          // Add group ID to user's groups
          User.updateOne({ user_id: other_user_id }, { $push: { groups: group_id } })
            .then(() => res.json({ success: true }))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(400).send('Other user has not requested to join this group');
    }
  });
});

router.post('/group/reject', authenticateToken, (req, res) => {
  const { other_user_id, group_id } = req.body;
  const my_user_id = req.user.user_id;

  // Find group
  Group.findOne({ group_id }).then((group) => {
    // Check if group exists
    if (!group) {
      return res.status(400).send('Group does not exist');
    }
  });

  // Check if current user is part of group
  User.findOne({ user_id: my_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send('Cannot verify current user');
    }

    if (!user.groups.includes(group_id)) {
      return res
        .status(400)
        .send('Not authorized to accept users into a group you are not a member of');
    }
  });

  // Check if other user exists and has requested to join group
  User.findOne({ user_id: other_user_id }).then((user) => {
    if (!user) {
      return res.status(400).send('Cannot find other user');
    }

    // Check if other user is already a member of this group
    if (user.groups.includes(group_id)) {
      return res.status(400).send('Other user is already part of this group');
    }

    if (user.requestGroups.includes(group_id)) {
      // Remove group ID from other user's requestGroup
      User.updateOne({ user_id: other_user_id }, { $pullAll: { requestGroups: [group_id] } })
        .then(() => res.json({ success: true }))
        .catch((err) => console.log(err));
    } else {
      return res.status(400).send('Other user has not requested to join this group');
    }
  });
});

router.delete('/group', authenticateToken, (req, res) => {
  const { user_id, currentGroupID } = req.body;

  User.updateOne({ user_id: user_id }, { $pullAll: { groups: [currentGroupID] } })
    .then(() => {
      Place.find({ group_id: currentGroupID }).then((places) => {
        for (let i = 0; i < places.length; i++) {
          Review.deleteOne({
            place_id: places[i].place_id,
            user_id: user_id
          }).catch((err) => {
            console.log(err);
          });
        }
      });
      User.find({ groups: currentGroupID }).then((data) => {
        if (data.length === 0) {
          Group.deleteOne({ group_id: currentGroupID }).catch((err) => {
            console.log(err);
          });
          Category.deleteMany({ group_id: currentGroupID }).catch((err) => {
            console.log(err);
          });
          Place.deleteMany({ group_id: currentGroupID }).catch((err) => {
            console.log(err);
          });
        }
      });
    })
    .then(() => res.json({ success: true }))
    .catch((err) => console.log(err));
});

export default router;
