import React from 'react';

const Home = () => {
  return (
    <div className="welcome-section">
      <h1>Welcome to TypeORM CRUD Application</h1>
      <p>
        A modern web application with Google Authentication and user management.
      </p>
      <p>
        Please login with your Google account to access the dashboard and manage users.
      </p>
      <div className="card">
        <h3>Features</h3>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li>Google OAuth Authentication</li>
          <li>User Management (CRUD Operations)</li>
          <li>Session Management</li>
          <li>Protected Routes</li>
          <li>Modern React Frontend</li>
          <li>TypeORM Database Integration</li>
        </ul>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <a 
          href="http://localhost:4000/api/auth/google" 
          className="btn btn-primary"
          style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}
        >
          Get Started - Login with Google
        </a>
      </div>
    </div>
  );
};

export default Home;
