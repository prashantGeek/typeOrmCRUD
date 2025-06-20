'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { LogOut, User, Calendar, Mail, Shield, Settings, Users, Database } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    } else if (user && !loading) {
      // Show welcome toast after a short delay
      setTimeout(() => {
        setShowWelcomeToast(true);
      }, 1000);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
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
              <Link href="/users">
                <Button variant="outline" className="flex items-center gap-2 shadow-md">
                  <Users className="h-4 w-4" />
                  Manage Users
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
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your account and explore the application features.
          </p>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                Profile Information
              </CardTitle>
              <CardDescription className="text-base">Your account details and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                {user.profilePicture && (
                  <div className="relative">
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                    </div>
                  </div>
                )}
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                      <div className="text-lg font-medium text-gray-900 mt-1">{user.firstName} {user.lastName}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                      <div className="text-lg text-gray-900 flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-blue-600" />
                        {user.email}
                      </div>
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
                    <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Member Since</label>
                      <div className="text-lg text-gray-900 flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    {user.age && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Age</label>
                        <div className="text-lg font-medium text-gray-900 mt-1">{user.age}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="group hover:scale-[1.02] transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg group-hover:from-green-200 group-hover:to-green-300 transition-colors">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription className="text-base">Common tasks and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
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
              <Link href="/profile">
                <Button className="w-full justify-start h-12 text-left shadow-md hover:shadow-lg transition-shadow" variant="outline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>Edit Profile</span>
                  </div>
                </Button>
              </Link>
              <Link href="/settings">
                <Button className="w-full justify-start h-12 text-left shadow-md hover:shadow-lg transition-shadow" variant="outline">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Settings className="h-4 w-4 text-orange-600" />
                    </div>
                    <span>Account Settings</span>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold text-gray-700">Account Type</CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {user.provider === 'google' ? 'Google' : 'Local'}
              </div>
              <p className="text-sm text-gray-600">
                Authentication method
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold text-gray-700">Account Status</CardTitle>
              <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg group-hover:from-green-200 group-hover:to-green-300 transition-colors">
                <User className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-2 ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </div>
              <p className="text-sm text-gray-600">
                Current account status
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold text-gray-700">User ID</CardTitle>
              <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg group-hover:from-purple-200 group-hover:to-purple-300 transition-colors">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">#{user.id}</div>
              <p className="text-sm text-gray-600">
                Unique identifier
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Welcome Toast */}
      {showWelcomeToast && (
        <Toast
          title={`Welcome back, ${user.firstName}!`}
          description="You have successfully logged into your dashboard."
          variant="success"
          onClose={() => setShowWelcomeToast(false)}
        />
      )}
    </div>
  );
}
