import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          TypeORM CRUD
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
              <Link to="/users" className="btn btn-secondary">
                Users
              </Link>
              <div className="user-info">
                {user.profilePicture && (
                  <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    className="user-avatar"
                  />
                )}
                <span>Hi, {user.firstName}!</span>
              </div>
              <button onClick={onLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <a 
              href="http://localhost:4000/api/auth/google" 
              className="btn btn-primary"
            >
              Login with Google
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
