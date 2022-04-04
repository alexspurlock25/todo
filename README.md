# Getting Started with this Todo React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

NOTE: Don't forget to check out the `.env.local.your-copy` file to set up your own todo server on firebase.
In Firebase, create a Firestore session, and have a root directory of called 'todo'. It will ask you to add fields. 
Auto generate the DocumentID, then add the following fiels: `id: string, dateAdded: timestamp, title: string, and isDone: boolean`.
After that, run the commands below `npm install` and then `npm run`

## Available Scripts

In the project directory, you can run:

### `npm install`

First run this to install the packages required that are in the package.json.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.