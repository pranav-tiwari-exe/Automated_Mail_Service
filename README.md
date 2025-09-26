# 📧 Automated Mail Service

> A modern, full-stack email automation platform with Google OAuth integration and bulk email capabilities

[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.2-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ Features

### 🔐 **Secure Authentication**
- **Google OAuth 2.0** integration with refresh token management
- **Session-based authentication** with automatic token refresh
- **Secure credential storage** with database encryption

### 📊 **Smart File Processing**
- **Multi-format support**: CSV and Excel (.xlsx, .xls) files
- **Intelligent email extraction** with regex pattern matching
- **Bulk email identification** from uploaded contact lists

### 🚀 **Advanced Email Capabilities**
- **Gmail API integration** for reliable email delivery
- **Rich HTML email support** with attachment handling
- **Background task processing** for bulk email operations
- **Real-time progress tracking** and error handling

### 🎨 **Modern User Interface**
- **Rich text editor** powered by TipTap
- **Responsive design** with Tailwind CSS
- **Toast notifications** for user feedback
- **File drag-and-drop** upload interface

## 🏗️ Architecture

```
📁 Automated_Mail_Service/
├── 📁 backend/                    # FastAPI Backend
│   ├── 📁 database/              # Database models and config
│   │   ├── database.py           # SQLAlchemy setup
│   │   └── modal.py              # Database models
│   ├── 📁 routers/               # API endpoints
│   │   ├── app_router.py         # Main application routes
│   │   └── o_auth_router.py      # OAuth authentication routes
│   ├── 📁 utils/                 # Utility functions
│   │   ├── extract_emails.py     # File processing & email extraction
│   │   ├── send_email.py         # Gmail API email sending
│   │   ├── o_auth_helper.py      # OAuth credential management
│   │   └── database_operations.py # Database CRUD operations
│   ├── main.py                   # FastAPI application entry point
│   └── requirements.txt          # Python dependencies
├── 📁 frontend/                  # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/        # React components
│   │   ├── 📁 context/          # Application state management
│   │   └── App.jsx              # Main React component
│   ├── package.json             # Node.js dependencies
│   └── ...                      # Vite configuration files
└── README.md                    # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **Google Cloud Project** with Gmail API enabled
- **Google OAuth 2.0 credentials**

### 1. Clone the Repository

```bash
git clone https://github.com/pranav-tiwari-exe/Automated_Mail_Service.git
cd Automated_Mail_Service
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
```

#### Configure `.env` file:

```env
# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Application Settings
SESSION_SECRET_KEY=your_secure_random_secret_key
FRONTEND_URL=http://localhost:5173
ENCRYPTION_KEY=your_encryption_key_for_database

# Database (SQLite by default)
DATABASE_URL=sqlite:///database/tokens.db
```

#### Start the backend server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

#### Configure frontend `.env`:

```env
VITE_BACKEND_URL=http://localhost:8000
```

#### Start the frontend development server:

```bash
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 Configuration

### Google OAuth Setup

1. **Create a Google Cloud Project**
2. **Enable Gmail API** in the Google Cloud Console
3. **Create OAuth 2.0 credentials**:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:8000/auth`
4. **Download credentials** and add to your `.env` file

### Database Configuration

The application uses **SQLite** by default for simplicity. For production, consider:

- **PostgreSQL** for better performance
- **MySQL** for traditional setups
- **Cloud databases** for scalability

Update the `DATABASE_URL` in `.env` accordingly.

## 📡 API Reference

### Authentication Endpoints

- `GET /login` - Initiate Google OAuth flow
- `GET /auth` - OAuth callback endpoint
- `GET /user` - Get current user information
- `GET /logout` - Clear user session

### Email Processing Endpoints

- `POST /api/initiate` - Process file and send bulk emails
  - **Form Data**:
    - `recipient_list`: CSV/Excel file
    - `subject`: Email subject
    - `body`: HTML email body
    - `attachments`: Optional file attachments

## 🛠️ Technologies Used

### Backend Stack
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[SQLAlchemy](https://www.sqlalchemy.org/)** - Database ORM
- **[Google API Client](https://github.com/googleapis/google-api-python-client)** - Gmail integration
- **[Authlib](https://authlib.org/)** - OAuth implementation
- **[Pandas](https://pandas.pydata.org/)** - Data processing
- **[Cryptography](https://cryptography.io/)** - Secure token storage

### Frontend Stack
- **[React 19](https://reactjs.org/)** - UI framework
- **[Vite](https://vitejs.dev/)** - Build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework  
- **[TipTap](https://tiptap.dev/)** - Rich text editor
- **[Axios](https://axios-http.com/)** - HTTP client
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Notifications

## 🔐 Security Features

- **OAuth 2.0** secure authentication flow
- **Encrypted token storage** in database
- **Session management** with automatic refresh
- **CORS protection** configured for frontend
- **Input validation** and sanitization
- **Error handling** without exposing sensitive data

## 📝 Usage Guide

### 1. **Authentication**
- Click "Login with Google" to authenticate
- Grant necessary Gmail permissions
- Your session will be automatically managed

### 2. **Preparing Contact Lists**
- **CSV Format**: Any column containing email addresses
- **Excel Format**: .xlsx or .xls files supported
- **Email Detection**: Automatic email extraction from any cell

### 3. **Composing Emails**
- Use the rich text editor for formatting
- Add subject line and recipients
- Attach files if needed (multiple attachments supported)

### 4. **Sending Emails**
- Upload your contact list file
- Review detected email count
- Emails are sent in the background
- Monitor progress through the interface

## 🔍 Troubleshooting

### Common Issues

**"Authentication Error"**
- Verify Google OAuth credentials in `.env`
- Check authorized redirect URIs in Google Console
- Ensure Gmail API is enabled

**"File Processing Error"**
- Verify file format (CSV/Excel)
- Check file encoding (UTF-8 recommended)
- Ensure file contains valid email addresses

**"Email Sending Failed"**
- Verify Gmail API permissions
- Check Google account sending limits
- Ensure OAuth scope includes Gmail send permission

### Debug Mode

Enable debug logging:

```bash
# Backend
uvicorn main:app --reload --log-level debug

# Frontend
npm run dev -- --debug
```

## 🚀 Deployment

### Production Deployment Options

#### Option 1: Traditional Server
```bash
# Backend
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker

# Frontend
npm run build
# Serve build folder with nginx/apache
```

#### Option 2: Docker
```dockerfile
# Example Dockerfile for backend
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Option 3: Cloud Platforms
- **Vercel/Netlify** for frontend
- **Railway/Render** for backend
- **Google Cloud Run** for containerized deployment

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow **PEP 8** for Python code
- Use **ESLint** configuration for JavaScript
- Write **descriptive commit messages**
- Add **tests** for new features
- Update **documentation** as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pranav Tiwari**
- GitHub: [@pranav-tiwari-exe](https://github.com/pranav-tiwari-exe)
- Email: [your-email@example.com](mailto:your-email@example.com)

## 🙏 Acknowledgments

- **Google** for Gmail API and OAuth services
- **FastAPI** community for excellent documentation
- **React** team for the amazing frontend framework
- **Open source contributors** who made this project possible

## 📊 Project Status

- ✅ **Core functionality** implemented
- ✅ **OAuth authentication** working
- ✅ **File processing** completed
- ✅ **Email sending** functional
- 🔄 **Performance optimizations** in progress
- 📋 **Additional features** planned

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

[Report Bug](https://github.com/pranav-tiwari-exe/Automated_Mail_Service/issues) · [Request Feature](https://github.com/pranav-tiwari-exe/Automated_Mail_Service/issues) · [Documentation](https://github.com/pranav-tiwari-exe/Automated_Mail_Service/wiki)

</div>
