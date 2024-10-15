# Fitness Tracker Backend API
A backend API built with Node.js, Express, and MongoDB to manage user authentication, workout logs, goals, and fitness programs. It supports both admin and user roles, allowing users to track workouts and goals while enabling admins to manage user accounts and fitness programs.

## Features
JWT Authentication with role-based access control (Admin/User).
Workout Management: Log, update, and delete workout activities.
Goal Tracking: Set, update, and track weekly or monthly goals.
Admin Functions:
View aggregate statistics across all users.
Manage user accounts (activate/deactivate).
Create, view, and delete fitness programs.
Data Persistence with MongoDB.

## Set Up Environment Variables
Create a .env file in the project root and add the following environment variables:

MONGODB_URI=mongodb+srv://rjparsana8:glJJTAZPPPcKXRJ6@cluster0.a307w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=RJ_SECRET
PORT=5000

## Run the Server Locally
node server.js

## API Endpoints
### Authentication
Method	Endpoint	Description	Role
POST	/api/auth/signup	Register a new user	All
POST	/api/auth/login	Log in a user	All

### User-Specific Endpoints
Method	Endpoint	Description
POST	/api/workouts	Log a new workout
GET	/api/workouts	Get all workout logs
PUT	/api/workouts/:id	Update a workout log
DELETE	/api/workouts/:id	Delete a workout log
POST	/api/goals	Create a goal
GET	/api/goals	Get all goals
PUT	/api/goals/:id	Update a goal
DELETE	/api/goals/:id	Delete a goal
GET	/api/statistics/date-range	Get workout logs by date range
GET	/api/statistics/activity-type	Get logs by activity type
GET	/api/statistics/goals-status	Get goal achievement status

### Admin-Specific Endpoints
Method	Endpoint	Description
GET	/api/admin/aggregate-stats	View aggregate statistics
PUT	/api/admin/manage-users/:userId	Activate/deactivate a user
POST	/api/admin/fitness-programs	Create a fitness program
GET	/api/admin/fitness-programs	Get all fitness programs
DELETE	/api/admin/fitness-programs/:programId	Delete a fitness program

## Authentication & Authorization
JWT tokens are required for all endpoints except signup and login.
Admin-only endpoints require the user to have an admin role.

## Contributing
Feel free to open issues or submit pull requests if you find bugs or want to improve the project.
