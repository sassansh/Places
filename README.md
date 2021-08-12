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

As with most modern web applications, our has little to no literal HTML, but having an in-depth understanding of HTML allowed us to work easily with JSX (a JavaScript syntax extension, based on HTML markup conventions, used to arrange and render React components) to structure our front-end elements.
 
While we generally used the Ant Design framework in lieu of explicit styling to ensure visual consistency, sometimes we still needed to use dedicated CSS files for components to directly control appearance, positioning or other properties of DOM elements.

The logic of our application was built in JavaScript from top to bottom, from its React front-end components, to its integrated Node packages, to its Express-based back-end server. We made extensive use of ES6 features such as arrow functions, rest parameters and array methods.

### React

We used React to create modular UI components and render dynamic views that changed according to user input. We took advantage of React Hooks to handle state and life-cycle logic for each component. We used a Redux store to maintain data such as reviews, places and categories on the front end to ensure consistency and accessibility throughout complex components.

### Node & Express

Our back end server, implemented using Node and Express, let us hide critical business logic from users while allowing us to establish secure connections to external data sources such as our MongoDB database and the Cloudinary third-party API for image upload functionality. Node is popular and well-supported, it allowed us to use Javascript throughout the application, and it provides many useful packages. Express was a straightforward framework with which we created a RESTful API to perform our application's C.R.U.D. operations on user, group, category, place and review data.

### NoSQL with MongoDB

Entities such as users, places, categories and reviews are stored as MongoDB collections, with each item its own document. While we are using a non-relational database, we kept the data stored in each collection as lean as possible to reduce redundancy — if something is already recorded in another collection, we don’t duplicate it elsewhere. Our Express-based back end uses Mongoose to ensure data being added to each collection conforms to the expected schema, and to ease communication with the database itself.

### Release Engineering

To structure and manage our code, we adopted a simple monorepo structure on GitHub where we could take advantage of version control for code history and sharing, pull requests for code review, and GitHub actions for automated deployment, linting and testing. Later, we implemented CI/CD with GitHub actions (triggered by pushes/pull requests on the main branch) and Heroku to build, deploy and host our application. These release engineering efforts, along with our cloud hosted MonogDB on Atlas, made it easier for us to focus our attention on completing requirements, implementing new features and fixing bugs.

## Above and Beyond Functionality 🌟

### Fully Responsive 📱

In the later stages of design we realized users would want to view, add and review places while they were  out and about, and as a result we refactored all views in the application to be as functional on mobile as they are on desktop.

We had been using [Ant Design](https://ant.design/)’s framework on our front end to keep design elements like buttons and dividers visually consistent. We refactored all views and components to use Ant Design's implementation of Bootstrap breakpoints for different screen sizes to ensure spacing, sizing and positioning of all elements would create a usable experience on any device. Chrome’s developer tools were also of great use to emulate different mobile screens and debug CSS issues during this process.

We used this multi-platform ethos for other design decisions too: no essential information is ever shown as tooltips, which are difficult to access on mobile; and the AddCategory component, where a user can select a custom emoji, contains a popup emoji picker for desktop users who don’t have an emoji keyboard at the ready.

<p align="center">
  <img src="/images/responsive.gif" alt="responsive" width="450"/>
</p>

### Image Uploading using External API 🖼

Our application relies heavily on images to create an engaging user experience. From early on, we knew we wanted a way for users to add images of their choice to their profiles, groups and places. However, as images are so much larger than the strings and numbers being stored in our MongoDB database documents, it was not feasible to store images within our regular database collections. We initially had users input external image URLs, which meant they couldn't use their own pictures and would need to leave our application to find externally hosted files.

We recognized the poor experience this was creating for our users (our friends tested our app), and set out to add upload-your-own-image functionality. We researched and compared many ways of implementing this feature, and chose the most cost effective (free!) and least technically challenging method. We added an image upload field to our front-end forms, and included the user’s chosen image file in the form data sent to our back end, where we forwarded the image to an external API ([Cloudinary](https://cloudinary.com/documentation/image_upload_api_reference)). Cloudinary saves the image and responds back with an image URL that can be easily stored in our MongoDB as text; this URL can later be fetched when our interface needs to display the image. This allows users to easily upload profile pictures, customize their group logos and add pictures of the places they visit.

<p align="center">
  <img src="/images/upload_image.gif" alt="upload-image" width="450"/>
</p>

### Authentication System 🔐

The unique features that set our application apart from its big brothers like Yelp and Google Maps are its private groups and group-specific rankings: rather than using vague and unreliable scores from strangers, Places' place rankings are determined by people you know with tastes you trust. In order to keep groups private, we had to ensure user authentication was secure. Authentication in our application would be used to identify the user, give them access to specific groups, remember who they are on the client side, and give them access to our back-end API.

Initially, we had a very weak form of authentication (if you could call it that) where we stored the user's password in plain text in our database, using local storage to simply store a user ID to remember them across sessions. Our API was completely open; you could pretend to be whoever you wanted and access all of our data by making requests without any authorization.

To the front-end user, everything seemed functional. We could have left it at that, but we knew, fundamentally something critical to our application was “broken”. After a lot of research on authentication, we first got rid of all the plain text passwords and implemented industry standards of salting/hashing passwords using [bcrpyt](https://www.npmjs.com/package/bcrypt). To prevent the users from easily modifying their local storage to pretend to be another user, we implemented [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken). These tokens are signed by our back end after successful login and any tampering with them renders them useless. Then, we also locked down all of our private API endpoints to require an authorization header in the form of a JWT bearer token preventing all non-authorized users from fetching any user, place or review data. The back end also uses the auth header token to identify the user making the request to prevent anyone from leaving reviews as another user or letting people into groups where they are not a member.

<p align="center">
  <img src="/images/secure_auth.png" alt="secure-authentication" width="450"/>
</p>

## Next Steps 🔮

- We completed all of our standard and stretch goals for the project except one — a dashboard showing recent activity; this could be implemented by storing creation dates or times for various data objects and displaying a few of the most recent ones on a list-based page.
- We also discussed adding location functionality to users could view places as pins on a map or find a place close to their current location, which would help users get to places they see on the app in real life.
- We also considered adding single sign-on so users could log in with existing accounts from other services, which would streamline the registration and login processes.

## Team Contributions ‎😃

### Team Name: Green 🌱

### Amir Jafarvand - [GitHub](https://github.com/amirjfr) - [LinkedIn](https://www.linkedin.com/in/amir-jafarvand/) - [Personal Website](http://www.amirjafarvand.com/)

- Created the components to view a place or group, to create a group, to manage a group (moderator ability), and to update reviews and rankings of places based on the selected criteria.
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
