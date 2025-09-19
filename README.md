# ✉️ QuickMail - Modern Email Sender Application

A powerful, user-friendly email sending application built with React that allows users to compose, customize, and send professional emails with ease. Perfect for businesses, marketers, and individuals who need reliable email delivery.

## ✨ Features

### 📧 Email Composition
- **Simple Email Form** - Clean, intuitive email composition interface
- **To Field** - Enter recipient email address
- **Subject Line** - Add email subject
- **Message Body** - Plain text email composition
- **File Attachments** - Attach files to your emails

### 📁 Email Management
- **Email History** - View all your email activity in the sidebar
- **Sent Emails** - Track all emails you've sent with timestamps
- **Received Emails** - View received emails (if applicable)
- **Email Details** - See recipient, subject, and send time for each email

### 🎨 User Interface
- **Modern Design** - Beautiful gradient background with clean UI
- **Responsive Layout** - Works on desktop and mobile devices
- **Sidebar Navigation** - Easy access to email history
- **User Authentication** - Secure login system with logout functionality
- **About Section** - Information about the app and developer

### 🔐 Security & Authentication
- **Secure Login** - User authentication system
- **Session Management** - Secure user sessions
- **Protected Routes** - Authenticated access to email features
- **Logout Functionality** - Safe session termination

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **Create React App** - Bootstrapped with CRA
- **CSS3** - Modern gradient design and responsive layout
- **JavaScript ES6+** - Modern JavaScript features

### Backend (Node.js/Express)
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **Email Service Integration** - SMTP/Email API integration
- **User Authentication** - Secure login system
- **File Upload** - Attachment handling

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- Email service account (Gmail, Outlook, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RadhikaCongreja/MailCraft.git
   cd MailCraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SMTP_HOST=smtp.gmail.com
   REACT_APP_SMTP_PORT=587
   REACT_APP_EMAIL_SERVICE=gmail
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The app will open at `http://localhost:3000`

## 📁 Project Structure

```
MailCraft/
├── models/
│   ├── Email.js                 # Email data model
│   └── User.js                  # User data model
├── routes/
│   └── auth.js                  # Authentication routes
├── src/
│   ├── components/              # React components folder
│   ├── pages/                   # Page components folder
│   ├── App.css                  # Main application styles
│   ├── App.js                   # Main React component
│   ├── App.test.js              # App component tests
│   ├── EmailForm.css            # Email form specific styles
│   ├── EmailForm.js             # Email composition form component
│   ├── index.css                # Global styles
│   ├── index.js                 # React app entry point
│   ├── logo.svg                 # App logo
│   ├── reportWebVitals.js       # Performance monitoring
│   └── setupTests.js            # Testing configuration
├── db.js                        # Database connection and configuration
├── server.js                    # Express server entry point
└── README.md                    # This file
```

## 🔧 Configuration

### Email Service Setup

#### Gmail Configuration
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Update environment variables:
   ```env
   REACT_APP_SMTP_HOST=smtp.gmail.com
   REACT_APP_SMTP_PORT=587
   REACT_APP_EMAIL_USER=your-email@gmail.com
   REACT_APP_EMAIL_PASS=your-app-password
   ```

#### Outlook/Hotmail Configuration
```env
REACT_APP_SMTP_HOST=smtp.live.com
REACT_APP_SMTP_PORT=587
REACT_APP_EMAIL_USER=your-email@outlook.com
REACT_APP_EMAIL_PASS=your-password
```

#### Custom SMTP Configuration
```env
REACT_APP_SMTP_HOST=your-smtp-server.com
REACT_APP_SMTP_PORT=587
REACT_APP_EMAIL_USER=your-email@domain.com
REACT_APP_EMAIL_PASS=your-password
```

## 📧 Usage Guide

### Basic Email Sending
1. **Login to the Application**
   - Use your credentials to access the email sender
   - Secure authentication system

2. **Compose Email**
   - Enter recipient email address in the "To" field
   - Add a subject line
   - Write your message in the compose area
   - Optionally attach files using "Choose File"

3. **Send Email**
   - Click the "Send Email" button
   - Email will be sent and added to your history

4. **View Email History**
   - Check the left sidebar for "Email History"
   - View "Sent Emails" with timestamps
   - See "Received Emails" (if available)
   - Click on any email to view details

### Navigation Features
- **About the App**: Learn more about the application and developer
- **Logout**: Safely exit your session
- **Email History**: Track all your email activity

## 🎯 Use Cases

- **Personal Email** - Send personal emails with file attachments
- **Professional Communication** - Business correspondence with history tracking
- **Simple Email Client** - Alternative to complex email clients
- **File Sharing** - Send documents and files via email
- **Email History Management** - Keep track of sent and received emails

## 🧪 Testing

### Manual Testing
1. **Email Composition Testing**
   - Test email form with different inputs
   - Verify file attachment functionality
   - Test form validation

2. **Authentication Testing**
   - Test login and logout functionality
   - Verify session management
   - Test protected routes

3. **Email History Testing**
   - Send test emails and verify they appear in history
   - Check timestamp accuracy
   - Verify email details display correctly

### Running Tests
```bash
npm test
# or
yarn test
```

## 🚧 Future Enhancements

- [ ] **Multiple Recipients** - Send emails to multiple recipients at once
- [ ] **Rich Text Editor** - Add formatting options for emails
- [ ] **Email Templates** - Pre-designed email templates
- [ ] **Email Scheduling** - Schedule emails for future delivery
- [ ] **Contact Management** - Save and organize contacts
- [ ] **Email Search** - Search through email history
- [ ] **Dark Mode** - Dark theme support
- [ ] **Email Drafts** - Save emails as drafts
- [ ] **Reply Functionality** - Reply to received emails
- [ ] **Email Categories** - Organize emails by categories
- [ ] **Export History** - Export email history to CSV
- [ ] **Mobile App** - React Native mobile version

## 🔐 Security Features

- **Secure SMTP** - Encrypted email transmission
- **Input Validation** - Prevent malicious input
- **Environment Variables** - Secure credential storage
- **Error Handling** - Safe error messaging
- **Rate Limiting** - Prevent spam and abuse

## 📊 Performance

- **Optimized React Components** - Efficient rendering
- **Lazy Loading** - Load components as needed
- **Caching** - Cache templates and settings
- **Error Boundaries** - Graceful error handling
- **Progressive Enhancement** - Works without JavaScript

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Write clear commit messages
- Add tests for new features
- Update documentation
- Follow existing code style
- Test thoroughly before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Radhika Congreja**
- GitHub: [@RadhikaCongreja](https://github.com/RadhikaCongreja)
- Email: radhikacongreja@gmail.com
- LinkedIn: [Radhika Congreja](https://linkedin.com/in/radhika-congreja)

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Create React App** - For the excellent boilerplate
- **SMTP Libraries** - For reliable email delivery
- **Open Source Community** - For inspiration and tools
- **Email Service Providers** - For reliable infrastructure

## 📞 Support

Need help? Here are your options:

1. **Documentation** - Check this README for common questions
2. **Issues** - Create a GitHub issue for bugs or feature requests
3. **Email** - Reach out directly for support
4. **Discussions** - Join GitHub discussions for community support

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Netlify
1. Build the project
2. Upload `build` folder to Netlify
3. Configure environment variables

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📈 Project Stats
<img width="3937" height="2000" alt="APP" src="https://github.com/user-attachments/assets/e9322876-a7b7-4218-99f5-3b1db999f2b9" />


![GitHub last commit](https://img.shields.io/github/last-commit/RadhikaCongreja/MailCraft)
![GitHub stars](https://img.shields.io/github/stars/RadhikaCongreja/MailCraft)
![GitHub forks](https://img.shields.io/github/forks/RadhikaCongreja/MailCraft)
![GitHub issues](https://img.shields.io/github/issues/RadhikaCongreja/MailCraft)
![GitHub pull requests](https://img.shields.io/github/issues-pr/RadhikaCongreja/MailCraft)

---

**Craft Beautiful Emails, Deliver with Confidence! ✨**

*Built with ❤️ for seamless email communication*
