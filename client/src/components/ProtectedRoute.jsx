import { Navigate } from 'react-router-dom';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('bakecraft_user') || 'null');
  } catch {
    return null;
  }
}

export default function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem('bakecraft_token');
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    const fallback = user.role === 'baker' ? '/dashboard/baker' : '/dashboard/customer';
    return <Navigate to={fallback} replace />;
  }

  return children;
}
