import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <div className="card">
        <h2>Welcome back, {user.firstName}!</h2>
        <div className="user-info">
          {user.profilePicture && (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="user-avatar"
              style={{ width: '80px', height: '80px' }}
            />
          )}
          <div className="user-details">
            <h3>{user.firstName} {user.lastName}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Provider:</strong> {user.provider}</p>
            <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
            <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/users" className="btn btn-primary">
            View All Users
          </Link>
          <button className="btn btn-secondary">
            Update Profile
          </button>
          <button className="btn btn-secondary">
            Account Settings
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Account Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <h4>User ID</h4>
            <p>{user.id}</p>
          </div>
          <div>
            <h4>Authentication Method</h4>
            <p>{user.provider === 'google' ? 'Google OAuth' : 'Local Account'}</p>
          </div>
          <div>
            <h4>Account Status</h4>
            <p style={{ color: user.isActive ? 'green' : 'red' }}>
              {user.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
          {user.age && (
            <div>
              <h4>Age</h4>
              <p>{user.age}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
