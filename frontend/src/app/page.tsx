'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Database, Shield, Users, Zap, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
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

  if (user) {
    return null; // Will redirect to dashboard
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
            <div className="flex items-center">
              <Button onClick={login} className="flex items-center gap-2 shadow-lg">
                <LogIn className="h-4 w-4" />
                Login with Google
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
              <Database className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TypeORM CRUD
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
            A modern web application featuring Google Authentication, user management,
            and full CRUD operations powered by TypeORM and Next.js.
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <Button onClick={login} size="lg" className="text-lg px-10 py-4 shadow-xl">
              <LogIn className="h-5 w-5 mr-2" />
              Get Started with Google
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for modern web application development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center group hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl w-fit group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Google OAuth</CardTitle>
              <CardDescription>
                Secure authentication using Google OAuth 2.0 with session management
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center group hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl w-fit group-hover:from-green-200 group-hover:to-green-300 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Complete CRUD operations for user management with TypeORM
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center group hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl w-fit group-hover:from-purple-200 group-hover:to-purple-300 transition-colors">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>
                Built with Next.js, TypeScript, Tailwind CSS, and Express.js
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center group hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl w-fit group-hover:from-orange-200 group-hover:to-orange-300 transition-colors">
                <Database className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle>TypeORM Integration</CardTitle>
              <CardDescription>
                Powerful ORM with PostgreSQL database integration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center group hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl w-fit group-hover:from-indigo-200 group-hover:to-indigo-300 transition-colors">
                <Globe className="h-8 w-8 text-indigo-600" />
              </div>
              <CardTitle>Protected Routes</CardTitle>
              <CardDescription>
                Secure routing with authentication middleware and session handling
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center group hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-xl w-fit group-hover:from-red-200 group-hover:to-red-300 transition-colors">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Robust session handling with secure cookie configuration
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Sign in with your Google account to access the dashboard and start managing users.
            </p>
            <div className="mt-8">
              <Button
                onClick={login}
                variant="secondary"
                size="lg"
                className="text-lg px-10 py-4 shadow-xl hover:scale-105 transition-transform"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login with Google
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mr-3">
                <Database className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TypeORM CRUD
              </span>
            </div>
            <p className="text-gray-600">
              Built with ❤️ using Next.js, TypeORM, and Google Authentication
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
