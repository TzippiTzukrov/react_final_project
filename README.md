# ConnectPro - Professional Social Network

![ConnectPro Logo](public/full-logo.png)

A modern, professional social networking platform built as a LinkedIn clone using React and modern web technologies. Connect with developers, designers, and managers in your professional community.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login and registration system
- **Profile Management**: Create and customize professional profiles
- **Posts & Feed**: Share updates, articles, and professional insights
- **Comments System**: Engage with posts through threaded comments
- **Search Functionality**: Find people, posts, and content
- **Responsive Design**: Optimized for desktop and mobile devices

### Advanced Features
- **Real-time Updates**: Live feed updates and notifications
- **Photo Albums**: Share professional photo galleries
- **Todo Management**: Keep track of tasks and goals
- **User Roles**: Different access levels for users
- **RESTful API**: Backend powered by JSON Server

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling
- **ESLint** - Code linting and formatting

### Backend
- **JSON Server** - REST API simulation
- **Local Storage** - Client-side data persistence

### Development Tools
- **Vite** - Development server and build tool
- **ESLint** - Code quality
- **Concurrently** - Run multiple scripts simultaneously

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/connectpro.git
   cd connectpro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both the React development server and the JSON Server backend simultaneously.

4. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📖 Usage

### Development
```bash
# Start development servers (frontend + backend)
npm run dev

# Start only the frontend
npm run dev:client

# Start only the backend
npm run dev:server
```

### Production Build
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

## 🏗️ Project Structure

```
connectpro/
├── public/                 # Static assets
│   ├── full-logo.png      # Main logo
│   └── short-logo.png     # Favicon
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── styles/           # CSS stylesheets
│   ├── utils/            # Utility functions
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   └── routing/          # Routing configuration
├── server/
│   └── db.json           # Mock database
├── dist/                 # Production build output
└── package.json          # Dependencies and scripts
```

## 🔧 API Endpoints

The application uses JSON Server to simulate a REST API. Available endpoints:

- `GET /users` - Get all users
- `GET /posts` - Get all posts
- `GET /comments` - Get all comments
- `GET /todos` - Get all todos
- `GET /albums` - Get all photo albums
- `GET /photos` - Get all photos

## 🎨 Customization

### Themes and Styling
- Modify CSS files in `src/styles/` for custom styling
- Update color schemes in component-specific CSS modules

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Implement API calls in `src/services/`
4. Update routing in `src/routing/`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use meaningful commit messages
- Write clean, readable code
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Icons and assets from various open-source projects
- Inspired by professional networking platforms

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ by [Your Name]**

*ConnectPro - Building professional connections, one link at a time.*
