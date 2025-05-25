
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">HealthPal</h1>
          <p className="text-slate-600">Professional Medical Practice Management</p>
        </div>

        {isLogin ? (
          <LoginForm 
            onSuccess={handleAuthSuccess} 
            onSwitchToRegister={() => setIsLogin(false)} 
          />
        ) : (
          <RegisterForm 
            onSuccess={handleAuthSuccess} 
            onSwitchToLogin={() => setIsLogin(true)} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
