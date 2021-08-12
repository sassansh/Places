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

  <p align="center">
  Places lets you rate and rank your favourite places to eat, drink, hang out and more. By joining trusted groups of friends or family and choosing your own criteria for ratings, you can get reliable recommendations about where to go based on what’s most important to you.
    <br />
    <br />
    <a href="https://places-cpsc455.herokuapp.com/"><strong>🌎 View Demo »</strong></a>
    <br />
    <br />
    <img src="/images/app-capture.gif" alt="live-app" width="600"/>
  </p>
</p>

## Table of Contents

- [App Description ℹ️](#app-description-ℹ%EF%B8%8F)
- [Task Requirements 💼](#task-requirements-)
  - [Minimal Requirements](#minimal-requirements)
  - [Standard Requirements](#standard-requirements)
  - [Stretch Requirements](#stretch-requirements)
- [Technology Stack 🛠️](#technology-stack-%EF%B8%8F)
  - [HTML, CSS, JS](#html-css-js)
  - [React](#react)
  - [Node & Express](#node--express)
  - [NoSQL with MongoDB](#nosql-with-mongodb)
  - [Release Engineering](#release-engineering)
- [Above and Beyond Functionality 🌟](#above-and-beyond-functionality-)
- [Next Steps 🔮](#next-steps-)
- [Team Contributions ‎😃](#team-contributions-)
- [Project Description 🏝](#project-description-)
- [Task Breakdown 📝](#task-breakdown-)
- [Prototypes 🎨](#prototypes-)
- [Prerequisites 🍪](#prerequisites-)
- [Setup And Deployment 🔧](#setup-and-deployment-)
- [License 📔](#license-)

## App Description ℹ️

Places lets you rate and rank your favourite places to eat, drink, hang out and more. By joining trusted groups of friends or family and choosing your own criteria for ratings, you can get reliable recommendations about where to go based on what’s most important to you.

## Task Requirements 💼

### Minimal Requirements

- ✅ Register new account or log in to existing account
- ✅ Create a group
- ✅ Request and join an existing group / accept or reject requests to join
- ✅ Each user can rate (scale 1-5) a place, rating attached to their group
- ✅ View places by category and order by average rating

### Standard Requirements

- ✅ Modify an existing rating
- ✅ Create new categories
  - ✅ Choose custom rating criteria for the new category (by group)
- ✅ Display ranked list of places based on selected criteria
  - ✅ Search bar & other filters to narrow down list of places
- ✅ Allow users to upload photos for their profile picture or of places
- ✅ Profile for each place containing images, address, details, reviews.
- ✅ User profiles displaying:
  - ✅ Name, picture, list of reviewed places, name of group they are in
- ✅ Moderator ability for group members:
  - ✅ Accept other member requests into group
  - ✅ Delete members from group

### Stretch Requirements

- ✅ Allow users to be members of multiple groups and post different information to different groups
- ✅ Allow user to save and view favorite places
- ❌ Engaging dashboard with newly reviewed places, highest-rated places, and new members that have joined the group

## Technology Stack 🛠️

### HTML, CSS, JS

While React and design frameworks like Ant Design allow us to not directly work with HTML and CSS, having an in-depth understanding of HTML and CSS allows us to work easily with JSX (a JavaScript-based language used in React to easily write HTML and JavaScript together) to build our components. On top of using Ant Design’s built in styles for our components, we further customized our components through custom written CSS (dedicated .css file for each component) for better styling and responsiveness on various screen sizes. Lastly, JavaScript was fundamental to our entire application as the main language to build our React frontend components all the way to our Node backend for building our API’s while allowing it all to run fast and efficiently compared to its counterparts like Python and Java.

### React

React, as a modern, fast and easy-to-learn JavaScript library, enabled us to jump in quickly and create all of our application’s reusable UI components, with which we used to organize our application into a tree structure. We took advantage of React Hooks to handle our application’s state and lifecycle logic. Redux helped particularly because much of our application’s data is inter-related and stored without duplication

### Node & Express

Our backend server implemented using Node & Express allowed us to hide the critical “business logic” from the front end users while allowing us to establish secure connections to our third party data sources such as our MongoDB database and External APIs (e.g. Cloudinary for image upload functionality). Compared to other backends, Node strengthened our application by being fast, javascript based (same as our frontend), and provided many free packages. Express made it super easy for us to create a really simple RESTful API that performs our applications C.R.U.D. operations on our user, group, category, place and review data.

### NoSQL with MongoDB

Entities such as users, places, categories and reviews are stored as MongoDB collections, with each item its own document. While we are using a non-relational database, we have kept the data stored in each collection as lean as possible to reduce redundancy -- if something is already recorded in another collection, we don’t duplicate it elsewhere, which also makes consistency problems less likely. Our Express-based back end uses Mongoose to validate data being added to each collection conforms to the expected schema, and to ease communication with the database itself.

### Release Engineering

To structure and manage our code, a simple monorepo structure was adopted on GitHub where the team could take advantage of version control for code history & sharing, pull requests for code review, and GitHub actions for automated deploying, linting and testing. Later, CI/CD was implemented using GitHub Actions (triggered by pushes/pull requests on the main branch) and Heroku to build, deploy and host our application. These release engineering efforts along with our cloud hosted MonogDB on Atlas, allowed us to decrease the amount of work for us developers to focus our attention on closing requirements, implementing new features and fixing bugs.

## Above and Beyond Functionality 🌟

### Fully Responsive 📱

In the later stages of design we realized this application would be particularly useful for users to actually add and check places while they’re out and about, and as a result we refactored all views in the application as necessary to be as functional on mobile as they are on desktop.

We had used [Ant Design](https://ant.design/)’s framework on our frontend to build our components which utilizes a responsive design similar to Bootstrap where you can assign dimensions for different screen sizes: xs, sm, md, lg, xl, xxl. Therefore, we used these properties to make all of our components and views mobile friendly. Chrome’s developer tools were also of great use to emulate different mobile screens and debug CSS issues during this process.

We used this multi-platform ethos for other design decisions too: no essential information is ever shown as tooltips, which are difficult to access on mobile; and the AddCategory component, where a user can select a custom emoji, contains a popup emoji picker for desktop users who don’t have an emoji keyboard at the ready.

<p align="center">
  <img src="/images/responsive.gif" alt="responsive" width="450"/>
</p>

### Image Uploading using External API 🖼

Our application relies heavily on images to create an engaging user interface and experience. Therefore, from early on we knew we wanted a way for our users to add their own custom images to our application. However, image data is sized very differently from other data stored in our MongoDB database, so it was not feasible to store it alongside regular data objects. To get around this, we initially had the user input an image URL which meant normally they had to google for images and copy the image’s url address from there or upload their images to another service and grab the link then come back to our application, completely ruining the user experience and flow of our application.

We recognized the poor experience this was creating for us and our users (our friends tested our app), hence set out to implement an upload your own image functionality. Through research and comparing many ways of implementing this feature, the most cost effective (free) and least technically challenging method was chosen. By restructuring our frontend and backend slightly, we were able to include the user’s chosen image file in the form data request to our backend where we integrated with an external API ([Cloudinary](https://cloudinary.com/documentation/image_upload_api_reference)) to forward them the image and they host the image and respond back with an Image URL that can be easily stored in our MongoDB as text then later fetched and the image displayed on our interface. This created a seamless experience for our end users to easily upload profile pictures, customize their group logos and add pictures of the places they visit.

<p align="center">
  <img src="/images/upload_image.gif" alt="upload-image" width="450"/>
</p>

### Authentication System 🔐

The unique feature that sets our application apart from its big brothers like Yelp and Google Maps is its private groups. In order to keep these groups and its content private, we had to take authentication to the next level. Authentication in our application would be used to identify the user, give them access to specific groups, remember who they are on the client side, and give them access to our backend API.

Initially, we had a very weak form of authentication (if you could call it that) where we were storing the users password in plain text in our database, using local storage to simply store a user id to remember them across sessions and our API was completely open and you could pretend to be whoever you wanted and access all of our data by making requests without any authorization.

Now, to the front-end user everything seemed functioning and we could have left it at that, but we knew fundamentally something critical to our application was “broken”. After sifting through many articles on different ways of authentication, we first got rid of all the plain text passwords and implemented industry standards of salting/hashing passwords using [bcrpyt](https://www.npmjs.com/package/bcrypt). To prevent the users from easily modifying their local storage to pretend to be another user, we implemented [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken). These tokens are signed by our backend after successful login and any tampering with them renders them useless. Then we also locked down all of our private API endpoints to require an Authorization Header in the form of a JWT Bearer Token preventing all non-authorized users from fetching any user, place or review data. The backend also uses the auth header token to identify the user making the request to prevent anyone from leaving reviews as another user or letting people into groups they are not a part of and more.

<p align="center">
  <img src="/images/secure_auth.png" alt="secure-authentication" width="450"/>
</p>

## Next Steps 🔮

- We completed all of our standard and stretch goals for the project except one - a dashboard showing recent activity; this could be implemented by storing creation dates or times for various data objects and displaying a few of the most recent ones on a list-based page.
- We also discussed adding location functionality to users could view places as pins on a map or find a place close to their current location, which would help users find places they see on the app in real life
- We also considered adding single sign on so users could log in with existing accounts from other services, which would streamline the registration and login processes

## Team Contributions ‎😃

### Team Name: Green 🌱

### Amir Jafarvand - [GitHub](https://github.com/amirjfr) - [LinkedIn](https://www.linkedin.com/in/amir-jafarvand/) - [Personal Website](http://www.amirjafarvand.com/)

- Created the components to view a place or group, to create a group, to manage a group (moderator ability), to update reviews and rankings of places based on the selected criteria.
- I also added the necessary backend API and database schemas for the above mentioned frontend components.
- I also helped with making our app mobile friendly.

### Johnny Li - [GitHub](https://github.com/johnnybcs) - [LinkedIn](https://www.linkedin.com/in/johnny-li-ubc/) - [Personal Website](https://johnnyli.herokuapp.com/about)

- I created some of the core components of the application, including the components that enable users to add or edit reviews and components that allow the user to view their profile information.

- I also created all the corresponding backend API routes and mongoDB schemas for the above mentioned frontend components.

### Laura Rodgers - [GitHub](https://github.com/laurarodgers) - [LinkedIn](https://www.linkedin.com/in/rodgerslaura/)

- I designed the overall concept for what the app would do, how its data would be organized, and the flow of what would be displayed across various views.
- I created many components and pages including dynamically sorting and ranking places in PlaceView, a dynamic custom category form for AddCategory with support for Unicode-compliant emoji grapheme splitting, and fully responsive layouts for PlaceList, GroupList, RequestList and PlaceView
- I refactored frontend code across the application to use declarative/array function-based data filtering and processing, and designed intuitive user flows such as being taken to a new place after it is created

### Sassan Shokoohi - [GitHub](https://github.com/sassansh) - [LinkedIn](https://www.linkedin.com/in/sassanshokoohi/) - [Personal Website](https://sassanshokoohi.ca)

- On the frontend, my main contributions were building the redux system, navigation bar, login, register, addplace, search bar, notification banner system, and favourites.
- On the backend side, I mainly worked on the users endpoint by building a secure login/register (salting/hashing/json web tokens), favorites, and group requests endpoints while implementing image upload functionality in various endpoints (users, groups, places).
- I also took a bit of a project management role to keep track of tasks being worked on/completed (on google docs) and paved the way for my team to get things done quickly by structuring our repo, sketching prototypes, and implementing automatic deployments, testing and linting.

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

## Task Breakdown 📝

- ✅ Register new account or log in to existing account

  - ✅ Login UI with email/user name and password inputs and login button
  - ✅ Button to Register and form for creating new account
    - ✅ User Name, Email, Password
  - ✅ Database structure for storing email and password for each user
  - ✅ Simple authentication backend & remember user on the same device

- ✅ User should be able to leave ratings
  - ✅ Display list of existing places to choose from
    - ✅ Or option to create new place with name and address
  - ✅ User can choose a numerical rating (1-5)
  - ✅ Submit to add rating of place, for user’s group, attributed to user
  - ✅ Database structure to associate rating of place to a group and user.

## Prototypes 🎨

Groups Screen (after login)

![Groups Sketch][groups]

Reviews in a group (after clicking a joined group)

![Reviews][reviews]

Adding a review to a place (after clicking add review on a place)
![Add Review][add_review]

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
   JWT_SECRET=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
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
