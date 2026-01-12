# Task Manager - Full Stack Web Application

A complete task management application built with React, Node.js, Express, PostgreSQL, and Prisma with JWT authentication.

## 🚀 Features

- **Authentication**: User registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Search & Filter**: Search tasks by title
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Responsive Design**: Clean UI built with Material-UI
- **Real-time Updates**: Instant task updates without page refresh

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MySQL with Prisma ORM
- JWT Authentication
- bcrypt for password hashing
- Express Validator for input validation

### Frontend
- React 18
- React Router for navigation
- Material-UI for components
- Axios for API calls
- Context API for state management

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ProjectFront1
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/taskmanager"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=5000
NODE_ENV=development
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate

# (Optional) Open Prisma Studio to view database
npm run studio
```

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Endpoints (Require JWT Token)

#### Get User Profile
```
GET /user/profile
Authorization: Bearer <jwt-token>
```

#### Get Tasks
```
GET /tasks?search=optional-search-term
Authorization: Bearer <jwt-token>
```

#### Create Task
```
POST /tasks
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending"
}
```

#### Update Task
```
PUT /tasks/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "completed"
}
```

#### Delete Task
```
DELETE /tasks/:id
Authorization: Bearer <jwt-token>
```

## 🔐 JWT Authentication Flow

1. **Registration/Login**: User provides credentials
2. **Token Generation**: Server creates JWT token with user ID
3. **Token Storage**: Frontend stores token in localStorage
4. **Request Authentication**: Token sent in Authorization header
5. **Token Verification**: Middleware validates token on protected routes
6. **User Access**: Valid tokens grant access to user-specific data

## 🏗️ Project Structure

```
ProjectFront1/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── app.js          # Express app setup
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── context/        # React context
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   └── App.js         # Main app component
    └── package.json
```

## 📈 Scaling for Production

### Backend Optimizations

1. **Environment Configuration**
   - Use production database
   - Set NODE_ENV=production
   - Configure proper CORS origins

2. **Security Enhancements**
   - Implement rate limiting
   - Add helmet for security headers
   - Use HTTPS in production
   - Implement refresh tokens

3. **Performance**
   - Add database indexing
   - Implement caching (Redis)
   - Use connection pooling
   - Add request logging

4. **Deployment**
   - Use PM2 for process management
   - Set up load balancing
   - Implement health checks
   - Add monitoring (New Relic, DataDog)

### Frontend Optimizations

1. **Build Optimization**
   - Code splitting with React.lazy()
   - Bundle analysis and optimization
   - Image optimization
   - PWA implementation

2. **Performance**
   - Implement virtual scrolling for large lists
   - Add pagination for tasks
   - Use React.memo for component optimization
   - Implement service workers

3. **User Experience**
   - Add offline support
   - Implement push notifications
   - Add loading states and skeletons
   - Error boundary implementation

### Infrastructure

1. **Database**
   - Use managed MySQL (AWS RDS, Google Cloud SQL)
   - Implement read replicas
   - Set up automated backups
   - Database monitoring

2. **Hosting**
   - Frontend: Vercel, Netlify, or AWS S3 + CloudFront
   - Backend: AWS EC2, Google Cloud Run, or Heroku
   - Use CDN for static assets

3. **CI/CD**
   - GitHub Actions or GitLab CI
   - Automated testing
   - Staged deployments
   - Rollback strategies

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check DATABASE_URL in .env file
   - Ensure database exists

2. **JWT Token Issues**
   - Check JWT_SECRET is set
   - Verify token format in requests
   - Check token expiration

3. **CORS Errors**
   - Ensure backend CORS is configured
   - Check frontend API base URL
   - Verify ports are correct

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Ensure all dependencies are installed
- Check that both servers are running

## 📞 Support

For support, please open an issue in the repository or contact the development team.