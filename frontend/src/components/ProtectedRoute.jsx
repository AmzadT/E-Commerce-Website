import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, token }) => {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!token) {
            setIsChecking(false); 
        } else {
            setIsChecking(false); 
        }
    }, [token]);

    if (isChecking) {
        return <div>Loading...</div>;
    }

    if (!token) {
        toast.error('You need to log in to access this page');
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
