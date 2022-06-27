# Chat-App

Hybrid live chat app where people are able to login anonymously and write in chat rooms about specific topic.

Technologies used: 
- Frontend: React (React Toolkit for state management) and Framework7.
- Database and authentication: Firebase.
- Hybrid deployment: Monaca.

https://user-images.githubusercontent.com/62658199/175479129-de1952ff-4684-4510-aea3-9c29aee8f031.mp4


[Figma wireframe](https://www.figma.com/file/dFN5MKzvpFhl9fY5Z696dz/Chat-App?node-id=0%3A1).  

## Tutorial
Tutorial will be available in Medium soon.

## How to start
1. Download the project.
2. Run `npm install` in the directory.
3. Run `npm run dev` to start the project.
4. If the browser opens url *0.0.0.0:8080*, change it to *localhost:8080*.

## Important files
#### JS
- `store.js` - Redux Toolkit store
- `groupsSlice.js` - Redux Toolkit slice for chat group information
- `userSlice.js` - Redux Toolkit slice for user information

#### React
- `LoginPage.vue` - login page to write name and choose gender
- `GroupsPage.vue` - screen containing chat groups
- `MessagesPage.vue` - screen with chat messages
