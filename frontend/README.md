# TypeORM CRUD Frontend

This is the React frontend for the TypeORM CRUD application with Google Authentication.

## Features

- Google OAuth Authentication
- User Dashboard
- User Management (View, Delete)
- Protected Routes
- Responsive Design
- Session Management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will run on `http://localhost:3000` and will proxy API requests to the backend running on `http://localhost:4000`.

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Removes the single build dependency

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Home.js
│   │   ├── Navbar.js
│   │   └── Users.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Configuration

The frontend is configured to work with the backend API running on `http://localhost:4000`. This is set up through the proxy configuration in `package.json`.

## Authentication Flow

1. User clicks "Login with Google" on the home page
2. User is redirected to Google OAuth
3. After successful authentication, user is redirected back to the frontend
4. Frontend checks authentication status and redirects to dashboard
5. Protected routes are accessible only to authenticated users

## Components

- **App.js** - Main application component with routing
- **Navbar.js** - Navigation component with user info and logout
- **Home.js** - Landing page for unauthenticated users
- **Dashboard.js** - User dashboard with profile information
- **Users.js** - User management interface
