import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import Landing from './Landing';

const Index = () => {
  const { user, isAuthenticated } = useUserStore();

  if (isAuthenticated() && user) {
    const redirectPath = user.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <Landing />;
};

export default Index;
