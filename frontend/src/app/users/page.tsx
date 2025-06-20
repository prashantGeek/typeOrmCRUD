'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/lib/useToast';
import { LogOut, Users, Database, Trash2, Edit, Mail, Calendar, Shield, RefreshCw, ArrowLeft, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  profilePicture?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  age?: number;
}

export default function UsersPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    age: ''
  });
  const [saving, setSaving] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      setError(null);
      const response = await axios.get('/api/users');
      setUsers(response.data.users);
      // Only show success toast when manually refreshing, not on initial load
      if (users.length > 0) {
        showSuccess('Refreshed!', `Loaded ${response.data.users.length} users successfully.`);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
      showError('Error', 'Failed to load users. Please try again.');
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const deleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      showSuccess('User Deleted!', 'User has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
      showError('Delete Failed', 'Failed to delete user. Please try again.');
    }
  };

  const startEditUser = (userData: User) => {
    setEditingUser(userData);
    setEditForm({
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age?.toString() || ''
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({
      firstName: '',
      lastName: '',
      age: ''
    });
  };

  const saveUser = async () => {
    if (!editingUser) return;

    try {
      setSaving(true);
      const updateData: any = {
        firstName: editForm.firstName,
        lastName: editForm.lastName
      };

      if (editForm.age) {
        updateData.age = parseInt(editForm.age);
      }

      const response = await axios.put(`/api/users/${editingUser.id}`, updateData);
      
      // Update the users list with the updated user
      setUsers(users.map(u => u.id === editingUser.id ? response.data.updatedUser : u));
      setEditingUser(null);
      showSuccess('User Updated!', 'User has been successfully updated.');
    } catch (error) {
      console.error('Error updating user:', error);
      showError('Update Failed', 'Failed to update user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to home
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TypeORM CRUD
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" className="flex items-center gap-2 shadow-md">
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                {user.profilePicture && (
                  <div className="relative">
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-9 w-9 rounded-full ring-2 ring-blue-200"
                    />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">Hi, {user.firstName}!</span>
              </div>
              <Button onClick={logout} variant="destructive" size="sm" className="shadow-md">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Management</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage all users in your application with full CRUD operations.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-3">
            <Button 
              onClick={fetchUsers} 
              variant="outline" 
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
              disabled={usersLoading}
            >
              <RefreshCw className={`h-4 w-4 ${usersLoading ? 'animate-spin' : ''}`} />
              {usersLoading ? 'Refreshing...' : 'Refresh Users'}
            </Button>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-8 group hover:scale-[1.01] transition-transform duration-300">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              Overview
            </CardTitle>
            <CardDescription className="text-base">User statistics and summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-blue-50 p-6 rounded-xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">{users.length}</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</div>
              </div>
              <div className="text-center bg-green-50 p-6 rounded-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {users.filter(u => u.isActive).length}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Users</div>
              </div>
              <div className="text-center bg-purple-50 p-6 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {users.filter(u => u.provider === 'google').length}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Google Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-red-300 bg-red-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-red-700 font-medium text-center py-4">{error}</div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {usersLoading ? (
          <Card className="shadow-lg">
            <CardContent className="pt-12 pb-12">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                <p className="mt-4 text-lg text-gray-600">Loading users...</p>
              </div>
            </CardContent>
          </Card>
        ) : users.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="pt-12 pb-12">
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">There are no users registered in the system yet.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Users Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((userData) => (
              <Card key={userData.id} className="group hover:scale-105 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    {userData.profilePicture && (
                      <div className="relative">
                        <img
                          src={userData.profilePicture}
                          alt="Profile"
                          className="h-16 w-16 rounded-full border-4 border-white shadow-lg"
                        />
                        <div className={`absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-2 border-white ${userData.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      </div>
                    )}
                    <div className="flex-1">
                      {editingUser?.id === userData.id ? (
                        <div className="space-y-3 w-full">
                          <div className="grid grid-cols-1 gap-2">
                            <input
                              type="text"
                              value={editForm.firstName}
                              onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                              className="w-full text-lg font-bold text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="First Name"
                            />
                            <input
                              type="text"
                              value={editForm.lastName}
                              onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                              className="w-full text-lg font-bold text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Last Name"
                            />
                          </div>
                          <CardDescription className="flex items-center gap-2 text-base">
                            <Mail className="h-4 w-4 text-blue-600" />
                            {userData.email}
                          </CardDescription>
                        </div>
                      ) : (
                        <>
                          <CardTitle className="text-xl font-bold text-gray-900">
                            {userData.firstName} {userData.lastName}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-base">
                            <Mail className="h-4 w-4 text-blue-600" />
                            {userData.email}
                          </CardDescription>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-500 uppercase tracking-wide">Provider:</span>
                        <span className="flex items-center gap-2 font-medium">
                          <Shield className="h-4 w-4 text-blue-600" />
                          {userData.provider}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-500 uppercase tracking-wide">Status:</span>
                        <span className={`flex items-center gap-2 font-medium ${userData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          <div className={`h-3 w-3 rounded-full ${userData.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          {userData.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    
                    {(userData.age || editingUser?.id === userData.id) && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-500 uppercase tracking-wide">Age:</span>
                          {editingUser?.id === userData.id ? (
                            <input
                              type="number"
                              value={editForm.age}
                              onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                              className="w-20 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Age"
                            />
                          ) : (
                            <span className="font-medium">{userData.age || 'Not set'}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-500 uppercase tracking-wide">Joined:</span>
                        <span className="flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          {new Date(userData.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-500 uppercase tracking-wide">User ID:</span>
                        <span className="font-mono font-bold text-gray-700">#{userData.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                    {editingUser?.id === userData.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={saveUser}
                          disabled={saving}
                          className="flex-1 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          className="flex-1 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEditUser(userData)}
                          className="flex-1 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteUser(userData.id)}
                          className="flex-1 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
