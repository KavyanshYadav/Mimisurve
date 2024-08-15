# MIMISURVE

**A Survey Application with Independent Frontend and Backend**

This repository currently houses the frontend and backend components of the MIMISURVE application as separate projects. While they are independent now, the plan is to merge them into a unified codebase in the future.

## Table of Contents

- [Features](#features)
    - [Backend Features](#backend-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Scripts](#scripts)
    - [Backend Scripts](#backend-scripts)
    - [Frontend Scripts](#frontend-scripts)
- [Environment Variables](#environment-variables)
    - [Backend Environment Variables](#backend-environment-variables)
    - [Frontend Environment Variables](#frontend-environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

### Backend Features

- **Authentication:**
    - OAuth (Google, GitHub, Facebook, X)
    - Native Email and Password
    - Email Verification
    - Two-Factor Authentication
- **Mail:**
    - Send emails and notifications to users
- **Security:**
    - Up-to-date security practices
    - Rate limiting to prevent cyberattacks
    - Cloudflare/reCAPTCHA support
- **Scalability:**
    - Designed to handle thousands of concurrent users
- **Logging:**
    - Categorized logs in various formats
- **Dashboard:**
    - Grafana and Prometheus integration for metrics

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Prisma (ORM)
- JWT (JSON Web Tokens)
- bcrypt
- Redis
- Passport.js (for OAuth)
- Twilio (for SMS)
- Winston (logging)
- and more (see `backend/package.json`)

### Frontend

- React.js
- React Router
- Axios
- Redux Toolkit (state management)
- React Query (data fetching)
- Mantine (component library)
- Nivo (charts)
- Tailwind CSS
- Emotion (CSS-in-JS)
- TypeScript
- and more (see `frontend/package.json`)

### DevOps

- Docker
- GitHub Actions

## Getting Started

### Backend

1. `cd backend`
2. `npm install`
3. Create a `.env` file in the `backend/` directory (refer to [Backend Environment Variables](#backend-environment-variables)).
4. `npm start`

### Frontend

1. `cd frontend`
2. `npm install`
3. Create a `.env` file in the `frontend/` directory (refer to [Frontend Environment Variables](#frontend-environment-variables)).
4. `npm start`

## Scripts

### Backend Scripts

- `npm start`: Start the backend server
- `npm run dev`: Start the backend server in development mode (with hot reloading if configured)
- `npm test`: Run backend tests

### Frontend Scripts

- `npm start`: Start the frontend development server
- `npm run build`: Build the frontend application for production
- `npm test`: Run frontend tests
- `npm test`: Run frontend tests
- `npm run storybook`: Run Storybook for component development
- `npm run build-storybook`: Build the Storybook for deployment

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
DATABASE_URL="MONGODB_URL"

# MAIL OPTIONS
MAIL_EMAIL="EMAIL"
APP_PASSWORD="PASSWORD"

# TWILIO CONFIGURATION
ACCOUNT_SSID="KEY"
AUTHTOKEN="KEY"
TWILIO_PHONENUMBER="NUMBER"

# GOOGLE OAUTH2
GOOGLE_CLIENT_ID="KEY"
GOOGLE_CLIENT_SECRET="KEY"
GOOGLE_CALLBACK_URL="/api/auth/google/callback"

# REDIS CONSOLE
REDIS_PASSWORD="PASSWORD"
REDIS_HOST="URL"
REDIS_PORT="PORT"

# GITHUB OAUTH2
GITHUB_CLIENT_ID="KEY"
GITHUB_CLIENT_SECRET="KEY"
GITHUB_CALLBACK_URL="/api/auth/github/callback"

### frontend-environment-variables
The Frontend project uses environment variables to configure the application. Create a `.env` file in the `Fronend/` directory with the following variables:

```env
API_SERVER_DOMAIN = "<Your backend api entry point>"
```
### Frontend Environment Variables
Create a `.env` file in the `frontend/` directory with the following variable:
```env
API_SERVER_DOMAIN="<Your backend API entry point>"

```
### Contributing
Contributions are welcome! Please read the CONTRIBUTING.md file for guidelines.

### License
This project is licensed under the `MIT License`.

**This version keeps all the improvements while consolidating the information into a single, easy-to-read code block. 
Sources and related content**



