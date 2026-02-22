
# TypeORM CRUD Application

A modern full-stack web application featuring Google OAuth authentication, user management, and CRUD operations built with TypeORM, Express.js, and Next.js.

## 🚀 Features

- **Google OAuth Authentication**: Secure login using Google OAuth 2.0
- **User Management**: Complete CRUD operations for user management
- **Profile Management**: Edit user profiles with real-time updates
- **Account Settings**: Comprehensive account management and security settings
- **Inline Editing**: Edit user information directly in the users list
- **Modern Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Database Integration**: PostgreSQL with TypeORM ORM
- **Session Management**: Secure session handling with express-session
- **Protected Routes**: Authentication middleware for secure endpoints
- **Responsive Design**: Modern UI with glassmorphism effects and animations
- **Toast Notifications**: Custom toast system for user feedback

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Database
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - Authentication provider
- **Express Session** - Session management

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- PostgreSQL database
- Google Cloud Console project with OAuth 2.0 credentials

## 🔧 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd typeOrmCRUD
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit the `.env` file with your configuration:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_db_password
DB_DATABASE=your_database_name

# Server Configuration
PORT=4000
NODE_ENV=development

# Google OAuth (Get these from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# Session (Use a strong random string)
SESSION_SECRET=your_very_secure_session_secret_here

# Client URL (frontend)
CLIENT_URL=http://localhost:3002
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:4000/api/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

### 5. Database Setup

1. Create a PostgreSQL database
2. Update database credentials in `.env` file
3. The application will automatically create tables on first run

## 🚀 Running the Application

### Start the Backend

```bash
# From root directory
npm start
```

The backend will run on `http://localhost:4000`

### Start the Frontend

```bash
# From frontend directory
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3002`

## 📁 Project Structure

```
typeOrmCRUD/
├── config/
│   └── passport.js           # Passport.js configuration
├── controllers/
│   └── userController.js     # User CRUD operations
├── database/
│   └── database.js           # Database connection
├── entities/
│   └── User.js              # User entity definition
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── dashboard/   # Dashboard page
│   │   │   ├── profile/     # Profile editing page
│   │   │   ├── settings/    # Account settings page
│   │   │   ├── users/       # Users management page
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── page.tsx     # Home page
│   │   ├── components/
│   │   │   ├── providers/   # React context providers
│   │   │   └── ui/          # Reusable UI components
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── middleware/
│   └── auth.js             # Authentication middleware
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── userRoutes.js       # User CRUD routes
├── .env.example            # Environment variables template
├── .gitignore
├── index.js                # Server entry point
└── package.json

```

Built with ❤️ using Next.js, TypeORM, and Google Authentication
