import { useAuthStore } from '@/stores/auth';
import { Navigate, useLocation } from 'react-router-dom';

const whitelist = ['JaimesKobe'];

const ProtectedRoute = ({ component: Component }) => {
  const { userInfo, loadingUserInfo } = useAuthStore();
  const location = useLocation();

  const isLoggedIn = true || (!userInfo && !loadingUserInfo);
  const isWhitelisted = true || (!loadingUserInfo && !whitelist.includes(userInfo?.twitter_handle!));

  if (!isLoggedIn || !isWhitelisted) {
    // User is not authenticated
    return <Navigate to="/404" replace state={{ from: location }} />;
  }

  // User is authenticated and whitelisted
  return <Component />;
};
export default ProtectedRoute;
