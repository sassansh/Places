[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<p align="center">
  <a href="https://github.com/sassansh/Places">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Places</h3>
  <h4 align="center"><a href="https://places-cpsc455.herokuapp.com/">View Demo</a></h4>
  
 
  <h4 align="center">Team Name: Green 🌱</h4>

  <p align="center">
    Find the best places recommended by only your trusted friends.
    <br />
    Group project for <a href="https://blogs.ubc.ca/cpsc436i2021s/"> CPSC 455</a> (Applied Industry Practices)
    <br />
    <br />
  </p>
</p>

[![Site preview](/images/app-capture.gif)](https://places-cpsc455.herokuapp.com/)

## Table of Contents

- [Project Description 🏝](#project-description-)
- [Task Requirements 💼](#task-requirements-)
- [Task Breakdown 📝](#task-breakdown-)
- [Prototypes 🎨](#prototypes-)
- [Technology Stack 🛠️](#technology-stack-%EF%B8%8F)
- [Prerequisites 🍪](#prerequisites-)
- [Setup And Deployment 🔧](#setup-and-deployment-)
- [The Team ‎😃](#the-team-)
- [License 📔](#license-)

## Project Description 🏝

**Who is it for?**

- People in cities (mostly) with lots of choices of amenities (restaurants/bars/breweries/parks) who want to talk with trusted groups about what places they like best

**What will it do?**

- Allow people to enter ratings/reviews for places
- Help people find the best place out of many options through reliable, trusted recommendations
- Help people recommend the places they like to their friends, and keep this knowledge without forgetting

**What type of data will it store?**

- Registered users and groups
- Members of groups
- Lists of places
- Sets of criteria a group considers important
- Individuals’ ratings of individual places in specific categories, using specific criteria

**What will users be able to do with this data?**

- Join an existing group or create a new one
- Add a rating for a place
- Look at ranked lists of places in given categories
- Search for a place based on needed requirements (park in Vancouver with playground, bar in Burnaby open at 11pm)
- Decide where to go

**What is some additional functionality you can add/remove based on time constraints?**

- Ability to publish a group’s ratings to the public
  - Option to publish only aggregate data or ranking
- Create custom rating criteria/templates for each category of place
- Allow users to add profile pictures and images of the places
- Allow users to add new categories for places

## Task Requirements 💼

**Minimal Requirements**

- [ ] Register new account or log in to existing account
- [x] Create a group
- [ ] Request and join an existing group / accept or reject requests to join
- [x] Each user can rate (scale 1-5) a place, rating attached to their group
- [x] View places by category and order by average rating

**Standard Requirements**

- [ ] Modify an existing rating
- [ ] Create new categories
- [ ] Choose custom criteria for a category (by group)
- [ ] Display ranked list of places based on selected criteria
  - [ ] Multiple search criteria including location tags
- [ ] Allow users to upload photos for their profile picture or of places
- [ ] Profile for each place containing images, address, hours, details, reviews.
- [ ] User profiles displaying:
  - [ ] Name, picture, list of reviewed places, name of group they are in
- [ ] Moderator ability for group creator:
  - [ ] Add members
  - [ ] Delete members

**Stretch Requirements**

- [ ] Allow user to save favorite places
- [ ] Engaging dashboard with newly reviewed places, highest-rated places, and new members that have joined the group
- [ ] Allow users to be members of multiple groups and post different information to different groups

## Task Breakdown 📝

- [ ] Register new account or log in to existing account

  - [ ] Login UI with email/user name and password inputs and login button
  - [ ] Button to Register and form for creating new account
    - [ ] User Name, Email, Password
  - [ ] Database structure for storing email and password for each user
  - [ ] Simple authentication backend & remember user on the same device

- [ ] User should be able to leave ratings
  - [x] Display list of existing places to choose from
    - [x] Or option to create new place with name and address
  - [x] User can choose a numerical rating (1-5)
  - [x] Submit to add rating of place, for user’s group, attributed to user
  - [ ] Database structure to associate rating of place to a group and user.

## Prototypes 🎨

Groups Screen (after login)

![Groups Sketch][groups]

Reviews in a group (after clicking a joined group)

![Reviews][reviews]

Adding a review to a place (after clicking add review on a place)
![Add Review][add_review]

## Technology Stack 🛠️

[MongoDB](https://www.mongodb.com/)

[ExpressJs](https://expressjs.com/)

[ReactJs](https://reactjs.org/)

[NodeJs](https://nodejs.org/en/)

## Prerequisites 🍪

You should have [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) and [Git](https://git-scm.com/) installed on your PC.

## Setup And Deployment 🔧

1. Clone the repo using:

   ```bash
     git clone https://github.com/sassansh/Places.git
   ```

2. In the root of the project `/Places/`, create a `.env` file and add these environment variables:

   ```bash
   PLACES_DB_URI=
   PORT=
   ```

3. To start frontend & backend in dev mode together, run:

   ```bash
   yarn first-install
   yarn dev
   ```

4. Automatic deployments are setup with Heroku each time a push is made to the `main` branch.

5. Access the current live app at:

   ```https
     https://places-cpsc455.herokuapp.com/
   ```

## The Team ‎😃

Team Name: Green 🌱

Amir Jafarvand - [GitHub](https://github.com/amirjfr) - [LinkedIn](https://www.linkedin.com/in/amir-jafarvand/) - [Personal Website](http://www.amirjafarvand.com/)

Johnny Li - [GitHub](https://github.com/johnnybcs) - [LinkedIn](https://www.linkedin.com/in/johnny-li-ubc/)

Laura Rodgers - [GitHub](https://github.com/laurarodgers) - [LinkedIn](https://www.linkedin.com/in/rodgerslaura/)

Sassan Shokoohi - [GitHub](https://github.com/sassansh) - [LinkedIn](https://www.linkedin.com/in/sassanshokoohi/) - [Personal Website](https://sassanshokoohi.ca)

## License 📔

Distributed under the MIT License. See `LICENSE` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/sassansh/Places.svg?style=for-the-badge
[contributors-url]: https://github.com/sassansh/Places/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sassansh/Places.svg?style=for-the-badge
[forks-url]: https://github.com/sassansh/Places/network/members
[stars-shield]: https://img.shields.io/github/stars/sassansh/Places.svg?style=for-the-badge
[stars-url]: https://github.com/sassansh/Places/stargazers
[issues-shield]: https://img.shields.io/github/issues/sassansh/Places.svg?style=for-the-badge
[issues-url]: https://github.com/sassansh/Places/issues
[license-shield]: https://img.shields.io/github/license/sassansh/Places.svg?style=for-the-badge
[license-url]: https://github.com/sassansh/Places/blob/main/LICENSE.txt
[groups]: images/groups_sketch.png
[add_review]: images/add_review_sketch.png
[reviews]: images/reviews_sketch.png
