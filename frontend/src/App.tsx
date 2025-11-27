import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PatientDashboard from "./pages/patient/Dashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import AddPrescription from "./pages/doctor/AddPrescription";
import Chatbot  from "./pages/patient/CHATBOT"  // <-- ADD THIS

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/book-appointment"
            element={
              <ProtectedRoute requiredRole="patient">
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          {/* 🔥 AI CHATBOT PAGE */}
          <Route
            path="/patient/chatbot"
            element={
              <ProtectedRoute requiredRole="patient">
                <Chatbot />
              </ProtectedRoute>
            }
          />

          {/* Doctor Routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/prescription/:appointmentId"
            element={
              <ProtectedRoute requiredRole="doctor">
                <AddPrescription />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
