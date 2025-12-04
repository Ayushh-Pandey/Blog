# Blog App

A simple blogging website where users can read and write blog posts.

## What it does

- Read blog posts from other users
- Sign up and log in to create an account
- Write your own blog posts
- Edit or delete your posts
- Comment on posts

## Tech Stack

**Frontend:**
- React
- Material-UI 
- React Router for routing

**Backend:**
- Node.js
- Express
- MongoDB with mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Setup with Docker (Easy Way)

1. Make sure you have Docker installed on your computer
2. Clone this repo
3. Create a `server.env` file in the `server` folder and add these
```
JWT_ACCESS_SECRET_KEY=your_jwt_access_secret_key
JWT_REFRESH_SECRET_KEY=your_jwt_refresh_secret_key
MONGO_DB=your_mongodb_connection_url
PORT=5000
MONGO_INITDB_ROOT_USERNAME=your_mongodb_username
MONGO_INITDB_ROOT_PASSWORD=your_mongodb_password
ME_CONFIG_MONGODB_URL=mongodb://your_mongodb_usernam:your_mongodb_password@mongo:27017/
ME_CONFIG_BASICAUTH_ENABLED=true
ME_CONFIG_BASICAUTH_USERNAME=your_mongodb_username
ME_CONFIG_BASICAUTH_PASSWORD=your_mongodb_password
```

4. Run this command:
```bash
docker-compose up
```
4. That's it! The app should be running

### Setup Locally (Manual Way)
**Clone this repo**
**Step 1: Install MongoDB**
- Make sure MongoDB is installed and running on your computer

**Step 2: Setup Backend**
1. Open terminal and go to server folder:
```bash
cd server
```

2. Install packages:
```bash
npm install
```

3. Create a file called `server.env` in the server folder and add these:
```
MONGO_DB=your_mongodb_connection_url
PORT=5000
JWT_ACCESS_SECRET_KEY=your_access_secret_key_here
JWT_REFRESH_SECRET_KEY=your_refresh_secret_key_here
```

Replace `your_access_secret_key_here` and `your_refresh_secret_key_here` with any random text (they're used for login security).

4. Start the server:
```bash
npm start
```

**Step 3: Setup Frontend**
1. Open a new terminal and go to client folder:
```bash
cd client
```

2. Install packages:
```bash
npm install
```
3. Create a `.env ` file in client folder and add these
```
REACT_APP_API_URL=your_backend_api_url
```

4. Start the app:
```bash
npm start
```

**Step 4: Open the app**
- The app will open automatically in your browser at `http://localhost:3000`

**What environment variables mean:**
- `MONGO_DB` - Where your database is located
- `PORT` - What port the server runs on (default is 5000)
- `JWT_ACCESS_SECRET_KEY` - Secret key for login tokens (use any random text)
- `JWT_REFRESH_SECRET_KEY` - Secret key for refresh tokens (use any random text)
