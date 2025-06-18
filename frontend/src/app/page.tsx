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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">TypeORM CRUD</span>
            </div>
            <div className="flex items-center">
              <Button onClick={login} className="flex items-center gap-2">
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to{' '}
            <span className="text-blue-600">TypeORM CRUD</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            A modern web application featuring Google Authentication, user management,
            and full CRUD operations powered by TypeORM and Next.js.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={login} size="lg" className="text-lg px-8 py-3">
              <LogIn className="h-5 w-5 mr-2" />
              Get Started with Google
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need for modern web application development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Google OAuth</CardTitle>
              <CardDescription>
                Secure authentication using Google OAuth 2.0 with session management
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Complete CRUD operations for user management with TypeORM
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>
                Built with Next.js, TypeScript, Tailwind CSS, and Express.js
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>TypeORM Integration</CardTitle>
              <CardDescription>
                Powerful ORM with PostgreSQL database integration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Protected Routes</CardTitle>
              <CardDescription>
                Secure routing with authentication middleware and session handling
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Robust session handling with secure cookie configuration
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Sign in with your Google account to access the dashboard and start managing users.
            </p>
            <div className="mt-8">
              <Button
                onClick={login}
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-3"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login with Google
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-semibold text-gray-900">TypeORM CRUD</span>
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
