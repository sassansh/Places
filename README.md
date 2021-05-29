<!-- Using README template from: https://github.com/othneildrew/Best-README-Template -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sassansh/Places">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Places</h3>
  
  <h4 align="center">Team Name: Green 🌱</h4>

  <p align="center">
    Find the best places recommended by only your trusted friends.
    <br />
    Group project for <a href="https://blogs.ubc.ca/cpsc436i2021s/"> CPSC 455</a> (Applied Industry Practices)
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<h2 style="display: inline-block">Table of Contents</h2>
<ol>
  <li>
    <a href="#project-description">Project Description</a>
  </li>
  <li>
    <a href="#project-task-requirements">Project Task Requirements</a>
  </li>
  <li>
    <a href="#task-breakdown">Task Breakdown</a>
  </li>
  <li>
    <a href="#prototypes">Prototypes</a>
  </li>
  <li><a href="#the-team">The Team</a></li>
  <li><a href="#license">License</a></li>
</ol>




<!-- PROJECT DESCRIPTION -->
## Project Description 

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


<!-- PROJECT TASK REQUIREMENTS -->
## Project Task Requirements 

**Minimal Requirements**
- Register new account or log in to existing account
- Create a group
- Request and join an existing group / accept or reject requests to join
- Each user can rate (scale 1-5)  a place, rating is attached to their group
- View places by category and order by average rating

**Standard Requirements**
- Modify an existing rating
- Create new categories 
- Choose custom criteria for a category (by group)
- Display ranked list of places based on selected criteria
  - Multiple search criteria including location tags
- Allow users to upload photos for their profile picture or of places
- Profile for each place containing images, address, hours, details, reviews.
- User profiles displaying:
  - Name, picture, list of reviewed places, name of group they are in
- Moderator ability for group creator:
  - Add members
  - Delete members

**Stretch Requirements**
- Allow user to save favorite places
- Engaging dashboard with newly reviewed places, highest-rated places, and new members that have joined the group
- Allow users to be members of multiple groups and post different information to different groups


<!-- TASK BREAKDOWN -->
## Task Breakdown 

- Register new account or log in to existing account
  - Login UI with email/user name and password inputs and login button
  - Button to Register and form for creating new account
    - User Name, Email, Password
  - Database structure for storing email and password for each user
  - Simple authentication backend & remember user on the same device

- User should be able to leave ratings
  - Display list of existing places to choose from 
    - Or option to create new place with name and address
  - User can choose a numerical rating (1-5)
  - Submit to add rating of place, for user’s group, attributed to user
  - Database structure to associate rating of place to a group and user.



<!-- PROTOTYPES -->
## Prototypes 
Groups Screen (after login)

![Groups Sketch][groups]

Reviews in a group (after clicking a joined group)

![Reviews][reviews]

Adding a review to a place (after clicking add review on a place)
![Add Review][add_review]

<!-- THE TEAM -->
## The Team

Team Name: Green 🌱

Amir Jafarvand - [GitHub](https://github.com/amirjfr) - [LinkedIn](https://www.linkedin.com/in/amir-jafarvand/)

Johnny Li - [GitHub](https://github.com/johnnybcs) - [LinkedIn](https://www.linkedin.com/in/johnny-li-ubc/)

Laura Rodgers - [GitHub](https://github.com/laurarodgers) - [LinkedIn](https://www.linkedin.com/in/rodgerslaura/)

Sassan Shokoohi - [GitHub](https://github.com/sassansh) - [LinkedIn](https://www.linkedin.com/in/sassanshokoohi/) - [Personal Website](https://sassanshokoohi.ca)

Project Link: [https://github.com/sassansh/Places](https://github.com/sassansh/Places)


<!-- LICENSE -->
## License

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

