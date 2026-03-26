import { Navigate } from 'react-router-dom';
import React from 'react';

// PHP backend uses session cookies — we check a localStorage flag
// set on login. The actual PHP session cookie is sent automatically
// by the browser with every request (withCredentials: true in Axios).
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const isAdmin = localStorage.getItem('admin_logged_in') === 'true';

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};
