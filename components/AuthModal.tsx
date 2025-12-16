import React, { useState } from 'react';
import { useLanguage } from '../App';
import { UserRole } from '../types';
import { X, User, Building, ShieldAlert } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: UserRole) => void;
  defaultMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, defaultMode = 'login' }) => {
  const { t, dir } = useLanguage();
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    onLogin(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm" dir={dir}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="p-4 border-b border-brand-beige/20 flex justify-between items-center bg-brand-bg">
          <h3 className="font-bold text-lg text-brand-dark">
            {mode === 'login' ? t('login') : t('signup')}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-brand-dark">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-brand-dark mb-2">{t('welcome')}</h2>
            <p className="text-slate-500 text-sm">{mode === 'login' ? t('loginDesc') : t('signupDesc')}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleRoleSelect('tenant')}
              className="w-full flex items-center p-4 border border-brand-beige/40 rounded-xl hover:border-brand-primary hover:bg-brand-primary/5 transition-all group"
            >
              <div className="p-2 bg-brand-primary/10 rounded-full group-hover:bg-brand-primary/20 text-brand-primary transition-colors">
                <User className="w-5 h-5" />
              </div>
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right mr-4' : 'text-left ml-4'}`}>
                <div className="font-semibold text-brand-dark">{t('roleTenant')}</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('owner')}
              className="w-full flex items-center p-4 border border-brand-beige/40 rounded-xl hover:border-brand-mauve hover:bg-brand-mauve/5 transition-all group"
            >
              <div className="p-2 bg-brand-mauve/10 rounded-full group-hover:bg-brand-mauve/20 text-brand-mauve transition-colors">
                <Building className="w-5 h-5" />
              </div>
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right mr-4' : 'text-left ml-4'}`}>
                <div className="font-semibold text-brand-dark">{t('roleOwner')}</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('admin')}
              className="w-full flex items-center p-4 border border-brand-beige/40 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group"
            >
              <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 text-red-600 transition-colors">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right mr-4' : 'text-left ml-4'}`}>
                <div className="font-semibold text-brand-dark">{t('roleAdmin')}</div>
              </div>
            </button>
          </div>

          <div className="text-center text-xs text-slate-400 mt-4">
             {mode === 'login' ? (
               <p>Don't have an account? <span className="text-brand-primary cursor-pointer hover:underline" onClick={() => setMode('signup')}>{t('signup')}</span></p>
             ) : (
               <p>Already have an account? <span className="text-brand-primary cursor-pointer hover:underline" onClick={() => setMode('login')}>{t('login')}</span></p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;