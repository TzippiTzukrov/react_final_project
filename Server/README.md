# ConnectPro Server - JWT Authentication

## 🔐 Authentication System

השרת עכשיו כולל מערכת אימות מלאה עם JWT tokens ו-middleware לאבטחה.

### Features
- **JWT Tokens** - אימות מאובטח עם תוקף של 24 שעות
- **Middleware Protection** - הגנה על נתיבים רגישים
- **Ownership Validation** - משתמשים יכולים לגשת רק למשאבים שלהם
- **Password Hashing** - סיסמאות מוצפנות עם bcrypt
- **Request Logging** - מעקב אחר בקשות ושגיאות

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   cd Server
   npm install
   ```

2. **Setup MySQL database:**
   - Create database: `connectpro`
   - Run schema: `mysql -u root -p connectpro < db/schema.sql`

3. **Environment variables (.env):**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=connectpro
   PORT=3000
   JWT_SECRET=connectpro_secret_key_2026
   ```

4. **Migrate data (optional):**
   ```bash
   npm run migrate
   ```

5. **Start server:**
   ```bash
   npm run dev
   ```

## 🔑 Authentication Endpoints

### Register User
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { "id": 1, "name": "John Doe", ... },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "User created successfully"
}
```

### Login
```http
POST /users/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { "id": 1, "name": "John Doe", ... },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

### Get Current User
```http
GET /users/me/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## 🛡️ Protected Routes

### Authentication Required
- `POST /posts` - Create post
- `PUT/PATCH /posts/:id` - Update post (owner only)
- `DELETE /posts/:id` - Delete post (owner only)
- `GET/POST/PUT/DELETE /todos` - All todo operations
- `GET/POST/PUT/DELETE /albums` - All album operations
- `POST /comments` - Create comment
- `PUT/PATCH/DELETE /comments/:id` - Update/delete comment (owner only)

### Public Routes
- `GET /posts` - View all posts
- `GET /posts/:id` - View specific post
- `GET /comments` - View all comments
- `GET /users` - View all users
- `POST /users` - Register
- `POST /users/login` - Login

## 📝 Usage Examples

### Create Post (Authenticated)
```http
POST /posts
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "title": "My New Post",
  "body": "This is the content of my post"
}
```

### Get User's Todos
```http
GET /todos
Authorization: Bearer your_jwt_token
```

### Update User Profile
```http
PUT /users/1
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

## 🔒 Security Features

1. **JWT Validation** - כל token נבדק לתוקף ואמינות
2. **Ownership Checks** - משתמשים יכולים לערוך רק את המשאבים שלהם
3. **Password Encryption** - סיסמאות מוצפנות עם bcrypt
4. **Request Logging** - כל בקשה מתועדת לצורכי אבטחה
5. **Error Handling** - טיפול מאובטח בשגיאות

## 📊 Token Structure

JWT Token מכיל:
```json
{
  "id": 1,
  "username": "johndoe", 
  "email": "john@example.com",
  "name": "John Doe",
  "iat": 1640995200,
  "exp": 1641081600
}
```

## 🚨 Error Codes

- `NO_TOKEN` - לא סופק token
- `TOKEN_EXPIRED` - Token פג תוקף
- `INVALID_TOKEN` - Token לא תקין
- `ACCESS_DENIED` - אין הרשאה למשאב

## 🔧 Development

- **Logs:** `Server/logs/access.log`
- **Database:** MySQL on port 3306
- **Server:** Express on port 3000
- **Environment:** Development mode shows detailed errors