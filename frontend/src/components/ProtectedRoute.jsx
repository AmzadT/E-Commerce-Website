import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, token }) => {
    if (!token) {
        toast.error('You need to log in to access this page');
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
