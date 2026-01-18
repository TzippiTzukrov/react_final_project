# ConnectPro - Professional Social Network

![ConnectPro Logo](public/full-logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF.svg)](https://vitejs.dev/)

**ConnectPro** is a LinkedIn-style professional social network built with React and Vite. Connect with developers, designers, and managers in your professional community.

## 📸 Screenshots

### Homepage
![Homepage](README/images/homepage.png)

### User Profile
![Profile](README/images/profile.png)

---

## Features

* **Secure Authentication:** Sign up and log in safely.
* **Profile Management:** Customize professional profiles.
* **Posts & Feed:** Share updates, articles, and ideas.
* **Comments & Search:** Engage with content and search easily.
* **Photo Albums & Todos:** Manage media and tasks.
* **Responsive Design:** Works perfectly on desktop and mobile.
* **Modern UI:** Dark and elegant interface for a professional feel.

---

## Tech Stack

* **Frontend:** React 19, Vite, React Router, CSS Modules
* **Backend:** JSON Server (mock API), Local Storage
* **Tools:** ESLint, Concurrently

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/TzippiTzukrov/react_final_project.git
   cd react_final_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:5173/](http://localhost:5173/) to view the application.

### Available Scripts
```bash
npm run dev          # Start both frontend and backend servers
npm run dev:client   # Start only React development server
npm run dev:server   # Start only JSON Server backend
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🏗️ Project Structure

```
connectpro/
├── public/                 # Static assets
│   ├── full-logo.png      # Main logo
│   └── short-logo.png     # Favicon
├── src/
│   ├── Components/        # Reusable UI components
│   │   ├── CommentForm.jsx
│   │   ├── CommentItem.jsx
│   │   ├── CommentsList.jsx
│   │   ├── PostFeed.jsx
│   │   ├── PostItem.jsx
│   │   └── UserProfile.jsx
│   ├── Context/           # React Context for global state
│   ├── Hooks/             # Custom React hooks
│   ├── Pages/             # Page components
│   │   ├── EntryPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── Services/          # API services
│   ├── styles/            # CSS Modules
│   ├── Utils/             # Utility functions
│   ├── App.jsx
│   └── main.jsx
├── Server/
│   └── db.json           # Mock database
├── dist/                 # Production build (generated)
├── README.md
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🔌 API Endpoints

The application uses JSON Server to simulate a REST API. Available endpoints:

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Comments
- `GET /comments` - Get all comments
- `GET /comments/:id` - Get comment by ID
- `POST /comments` - Create new comment

### Other
- `GET /todos` - Get all todos
- `GET /albums` - Get all photo albums
- `GET /photos` - Get all photos

---

## Future Improvements

* Real backend integration (Node.js + Express + database)
* Private messaging system
* Notifications and alerts
* Add links to resumes and professional portfolios

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and test thoroughly
4. **Commit your changes**
   ```bash
   git commit -m 'Add: brief description of your feature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use meaningful commit messages
- Write clean, readable code
- Test your changes
- Update documentation when needed

---

## 📞 Contact

**Tzippi Tzukrov**
- GitHub: [@TzippiTzukrov](https://github.com/TzippiTzukrov)
- LinkedIn: [Your LinkedIn Profile]
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Mock API by [JSON Server](https://github.com/typicode/json-server)
- Icons and assets from various open-source projects

---

## 📄 License

MIT License © 2026 Tzippi Tzukrov
