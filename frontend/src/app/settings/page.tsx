'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/lib/useToast';
import { LogOut, User, Settings, Shield, Database, ArrowLeft, AlertTriangle, Info, CheckCircle, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function SettingsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleting, setDeleting] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleDeleteAccount = async () => {
    if (!user || deleteInput !== 'DELETE') return;

    try {
      setDeleting(true);
      await axios.delete(`/api/users/${user.id}`);
      
      // Logout after successful deletion
      await logout();
      showSuccess('Account Deleted', 'Your account has been successfully deleted.');
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      showError('Delete Failed', 'Failed to delete account. Please try again.');
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
      setDeleteInput('');
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
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full mb-6">
            <Settings className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Account Settings</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your account preferences and security settings.
          </p>
        </div>

        <div className="space-y-8">
          {/* Account Information */}
          <Card className="group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                Account Information
              </CardTitle>
              <CardDescription className="text-base">Your basic account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">User ID</label>
                  <div className="text-lg font-mono font-bold text-gray-900 mt-1">#{user.id}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Type</label>
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Created</label>
                  <div className="text-lg text-gray-900 mt-1">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription className="text-base">Common account management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/profile">
                  <Button className="w-full justify-start h-12 text-left shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="h-4 w-4 text-purple-600" />
                      </div>
                      <span>Edit Profile</span>
                    </div>
                  </Button>
                </Link>
                <Link href="/users">
                  <Button className="w-full justify-start h-12 text-left shadow-md hover:shadow-lg transition-shadow" variant="outline">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Manage Users</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Information */}
          <Card className="group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                Security
              </CardTitle>
              <CardDescription className="text-base">Your account security information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800">Account Secured</h4>
                    <p className="text-green-700 text-sm">Your account is protected with {user.provider === 'google' ? 'Google OAuth 2.0' : 'secure authentication'}.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Session Management</h4>
                    <p className="text-blue-700 text-sm">Your session is secured with httpOnly cookies and CSRF protection.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-red-600">
                <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                Danger Zone
              </CardTitle>
              <CardDescription className="text-base text-red-600">
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Delete Account</h4>
                  <p className="text-red-700 text-sm mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  
                  {!confirmDelete ? (
                    <Button 
                      onClick={() => setConfirmDelete(true)}
                      variant="destructive"
                      className="shadow-md hover:shadow-lg transition-shadow"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-red-800 font-medium">Type "DELETE" to confirm:</p>
                      <input
                        type="text"
                        value={deleteInput}
                        onChange={(e) => setDeleteInput(e.target.value)}
                        placeholder="Type DELETE here"
                        className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <div className="flex gap-3">
                        <Button 
                          onClick={handleDeleteAccount}
                          disabled={deleteInput !== 'DELETE' || deleting}
                          variant="destructive"
                          className="shadow-md hover:shadow-lg transition-shadow"
                        >
                          {deleting ? 'Deleting...' : 'Confirm Delete'}
                        </Button>
                        <Button 
                          onClick={() => {
                            setConfirmDelete(false);
                            setDeleteInput('');
                          }}
                          variant="outline"
                          className="shadow-md hover:shadow-lg transition-shadow"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
