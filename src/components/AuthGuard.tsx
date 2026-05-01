import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/state/store/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.accessToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
