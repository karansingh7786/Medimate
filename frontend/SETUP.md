# MediMate Frontend Setup Guide

## 🏥 Overview

MediMate is a comprehensive healthcare platform built with React, TypeScript, and modern web technologies. It provides separate interfaces for patients and doctors with AI-powered features.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Backend API running (refer to backend setup instructions)

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```
   
   Replace with your backend API URL.

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── DashboardLayout.tsx
│   └── ProtectedRoute.tsx
├── pages/              # Application pages
│   ├── auth/           # Login & Register
│   ├── patient/        # Patient portal pages
│   ├── doctor/         # Doctor portal pages
│   └── Landing.tsx
├── store/              # Zustand state management
│   └── userStore.ts    # Global user state
├── lib/                # Utilities
│   ├── axios.ts        # API client configuration
│   └── utils.ts        # Helper functions
└── App.tsx             # Root component with routing
```

## 👥 User Roles

### Patient Features
- **Dashboard**: Overview of appointments and health stats
- **Book Appointments**: Schedule consultations with doctors
- **My Appointments**: View appointment history and prescriptions
- **AI Disease Prediction**: Get diagnosis suggestions from symptoms
- **Health Chatbot**: Ask health questions and get AI responses
- **Medicine Verification**: Check if medicines are genuine
- **Mental Health Analysis**: Assess emotional wellbeing

### Doctor Features
- **Dashboard**: View today's appointments
- **Patient Management**: See patient details and symptoms
- **Prescription Creation**: Add diagnosis, treatment, and medications
- **PDF Generation**: Automatic prescription PDF creation

## 🔐 Authentication Flow

1. Users register with name, email, password, and role (patient/doctor)
2. Login redirects to role-specific dashboard
3. JWT tokens stored in localStorage via Zustand
4. Protected routes ensure proper access control

## 🎨 Design System

### Colors (HSL)
- **Primary**: Teal `hsl(180, 70%, 40%)`
- **Accent**: Light teal `hsl(180, 60%, 50%)`
- **Medical Blue**: `hsl(200, 90%, 45%)`
- **Success Green**: `hsl(142, 71%, 45%)`
- **Warning Amber**: `hsl(38, 92%, 50%)`

### Typography
- **Font Family**: Plus Jakarta Sans
- **Weights**: 300-800

### Components
All UI components use semantic tokens from the design system. Never use direct colors like `text-white` or `bg-black`.

## 🔌 API Integration

### Backend Endpoints

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

#### Appointments
- `POST /appointment/book` - Book new appointment
- `GET /appointment/my-appointments/{patient_id}` - Patient appointments
- `GET /appointment/today-appointments/{doctor_id}` - Doctor's today appointments

#### Prescriptions
- `POST /prescription/add` - Add prescription (returns PDF path)
- `GET /prescription/get/{appointment_id}` - Get prescription

#### AI Features
- `POST /ai/predict` - Disease prediction from symptoms
- `POST /chatbot/reply` - Chatbot conversation
- `POST /fake_medicine/check` - Verify medicine authenticity
- `POST /mental_health/analyze` - Mental health assessment

### API Client Configuration

The Axios instance (`src/lib/axios.ts`) automatically:
- Adds JWT token to requests
- Handles 401 unauthorized responses
- Redirects to login on auth failure

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Key Dependencies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Styling
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icons

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS setup
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables

## 🌐 Deployment

### Build
```bash
npm run build
```

The `dist/` folder contains production-ready files.

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL`

## 🐛 Common Issues

### CORS Errors
Ensure your backend has CORS configured to allow requests from your frontend origin.

### API Connection Failed
- Check if `VITE_API_BASE_URL` is set correctly
- Verify backend is running
- Check network tab for request details

### Authentication Issues
- Clear localStorage and cookies
- Check token format in backend responses
- Verify JWT implementation matches frontend expectations

## 📝 Code Style

- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Keep components small and focused

## 🤝 Contributing

1. Create feature branch
2. Make changes following code style
3. Test thoroughly
4. Submit pull request

## 📄 License

[Add your license here]

## 📞 Support

For issues or questions, contact the development team or open an issue in the repository.
