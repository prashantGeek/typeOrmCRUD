'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/lib/useToast';
import { LogOut, User, Calendar, Mail, Shield, Settings, Users, Database, ArrowLeft, Edit2, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function ProfilePage() {
  const { user, loading, logout, checkAuth } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
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
    } else if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        age: user.age?.toString() || ''
      });
    }
  }, [user, loading, router]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form if canceling
      setEditForm({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        age: user?.age?.toString() || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      const updateData: any = {
        firstName: editForm.firstName,
        lastName: editForm.lastName
      };

      if (editForm.age) {
        updateData.age = parseInt(editForm.age);
      }

      await axios.put(`/api/users/${user.id}`, updateData);
      
      // Refresh user data
      await checkAuth();
      setIsEditing(false);
      showSuccess('Profile Updated!', 'Your profile has been successfully updated.');
    } catch (error) {
      console.error('Error updating profile:', error);
      showError('Update Failed', 'Failed to update profile. Please try again.');
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full mb-6">
            <User className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Edit Profile</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Update your personal information and profile details.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="group hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              {user.profilePicture && (
                <div className="relative">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="h-32 w-32 rounded-full border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            <CardTitle className="text-3xl text-gray-900 mb-2">
              {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription className="text-lg flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              {user.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Edit Controls */}
              <div className="flex justify-center gap-3">
                {!isEditing ? (
                  <Button onClick={handleEditToggle} className="flex items-center gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleSave} 
                      disabled={saving}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      onClick={handleEditToggle} 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                      className="w-full text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="text-lg font-medium text-gray-900">{user.firstName}</div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                      className="w-full text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="text-lg font-medium text-gray-900">{user.lastName}</div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Email
                  </label>
                  <div className="text-lg text-gray-900 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    {user.email}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.age}
                      onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                      placeholder="Enter your age"
                      className="w-full text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="text-lg font-medium text-gray-900">
                      {user.age || 'Not specified'}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Provider</label>
                  <div className="text-lg text-gray-900 flex items-center gap-2 mt-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    {user.provider === 'google' ? 'Google OAuth' : 'Local Account'}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</label>
                  <div className={`text-lg flex items-center gap-2 mt-1 ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    <div className={`h-3 w-3 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Member Since</label>
                  <div className="text-lg text-gray-900 flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
