import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'doctor';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useUserStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    const redirectPath = user?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
