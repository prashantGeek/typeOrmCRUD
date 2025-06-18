import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data.users);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <button onClick={fetchUsers} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Users Management</h1>
        <button onClick={fetchUsers} className="btn btn-secondary">
          Refresh
        </button>
      </div>

      <div className="card">
        <h3>Total Users: {users.length}</h3>
        <p>Manage all registered users in the system.</p>
      </div>

      {users.length === 0 ? (
        <div className="card">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                {user.profilePicture && (
                  <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    className="user-avatar"
                    style={{ marginRight: '1rem' }}
                  />
                )}
                <div>
                  <h4>{user.firstName} {user.lastName}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                <p><strong>Provider:</strong> {user.provider}</p>
                <p><strong>Status:</strong> 
                  <span style={{ color: user.isActive ? 'green' : 'red', marginLeft: '0.5rem' }}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
                {user.age && <p><strong>Age:</strong> {user.age}</p>}
                <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-danger"
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
