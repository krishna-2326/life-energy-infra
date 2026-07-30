import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedAdmin = ({ children }) => {
  const { admin, token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!token || !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdmin;
