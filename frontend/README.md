
# Welcome to Shelter Aid

Welcome to the Shelter Aid project! This project is designed to provide a comprehensive solution for aiding shelters using a modern web application. The project consists of both a backend and a frontend, working together to deliver a seamless experience.

## Project Structure

- **Backend**: Manages user authentication and provides protected routes.
- **Frontend**: Provides the user interface for interacting with the application.

## Getting Started

To get started with the Shelter Aid project, follow the instructions below.

### Backend

The backend is built using Node.js, Express, and SQLite. It handles user authentication and data management.

#### Setting Up the Backend

1. **Install Dependencies**: Make sure you have Node.js installed, then run:
   ```sh
   npm install
   ```

2. **Create Users and Passwords**: Modify the `database.js` file to add more users and passwords as needed.

3. **Start the Backend Server**:
   ```sh
   node server.js
   ```

#### Backend Details

- **`server.js`**: Sets up the Express server, handles routes for login, and manages protected routes.
- **`database.js`**: Configures the SQLite database and initializes user data.
- **`PrivateRoute.js`**: Middleware for protecting routes, ensuring only authenticated users can access certain endpoints.

### Frontend

The frontend is built using React and provides the user interface for interacting with the Shelter Aid services.

#### Setting Up the Frontend

1. **Install Dependencies**: Run the following command in the project directory:
   ```sh
   npm install
   ```

2. **Start the Frontend Application**:
   ```sh
   npm start
   ```
   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### Frontend Routes

- **`/`**: Home page with information about Shelter Aid.
- **`/login`**: Login page for user authentication.
- **`/code`**: Protected route that users can access after logging in.

### Full Setup

To run both the backend and frontend concurrently, follow these steps:

1. **Start the Backend**:
   ```sh
   node server.js
   ```

2. **Start the Frontend** (in a separate terminal):
   ```sh
   npm start
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the frontend app in development mode.Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the frontend app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Additional Documentation

- **Code Splitting**: [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- **Analyzing the Bundle Size**: [Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- **Making a Progressive Web App**: [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- **Advanced Configuration**: [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- **Deployment**: [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- **Troubleshooting**: [Troubleshooting](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
