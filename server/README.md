# Error Tracker Backend API

A robust Express.js backend server for the Error Tracker application with MongoDB integration.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with bcrypt password hashing
- 📝 **Error Log Management** - Full CRUD operations for error logs
- 📊 **Analytics** - Comprehensive analytics and statistics
- 🛡️ **Security** - Rate limiting, CORS, helmet, input validation
- 🔍 **Search & Filter** - Advanced filtering and search capabilities
- 📄 **Pagination** - Efficient data pagination
- ✅ **Validation** - Comprehensive input validation with express-validator

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Error Logs
- `POST /api/error-logs` - Create new error log (protected)
- `GET /api/error-logs` - Get user's error logs with filtering (protected)
- `GET /api/error-logs/:id` - Get specific error log (protected)
- `PUT /api/error-logs/:id` - Update error log (protected)
- `DELETE /api/error-logs/:id` - Delete error log (protected)
- `GET /api/error-logs/analytics` - Get analytics data (protected)

### Health Check
- `GET /api/health` - Server health check

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/error-tracker
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

3. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file

4. **Start the Server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## Database Models

### User Model
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `createdAt` - Account creation timestamp
- `lastLogin` - Last login timestamp

### ErrorLog Model
- `title` - Error title/summary
- `description` - Detailed error description
- `programmingLanguage` - Programming language
- `category` - Error category
- `solution` - Solution and learning notes
- `userId` - Reference to user
- `tags` - Optional tags array
- `severity` - Error severity level
- `isResolved` - Resolution status
- `timeToResolve` - Time taken to resolve (minutes)

## Security Features

- **Rate Limiting** - Prevents abuse with configurable limits
- **CORS Protection** - Configured for frontend integration
- **Helmet** - Security headers
- **Input Validation** - Comprehensive validation with express-validator
- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based authentication

## Query Parameters

### Error Logs Endpoint (`GET /api/error-logs`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `programmingLanguage` - Filter by programming language
- `category` - Filter by error category
- `search` - Search in title, description, and solution
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order: asc/desc (default: desc)

## Response Format

All API responses follow this format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {
    // Response data
  },
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- Server errors
- Not found errors

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secret
4. Configure proper CORS origins
5. Use process manager like PM2
6. Set up reverse proxy (nginx)
7. Enable HTTPS

## Testing

The API can be tested using tools like:
- Postman
- Insomnia
- curl
- Frontend application