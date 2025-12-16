

import React, { useState, createContext, useContext, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PropertyListing from './components/PropertyListing';
import Operations from './components/Operations';
import SmartAssistant from './components/SmartAssistant';
import AuthModal from './components/AuthModal';
import OwnerPortal from './components/OwnerPortal';
import AdminPanel from './components/AdminPanel';
import { ViewState, Language, LanguageContextType, UserRole, Currency, PropertyType } from './types';
import { translations } from './translations';
import { LogIn } from 'lucide-react';

// Create Context
export const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  setLanguage: () => {},
  t: (key) => key,
  dir: 'rtl',
  userRole: 'tenant',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  openAuthModal: () => {},
  currency: 'SAR',
  toggleCurrency: () => {},
  formatPrice: (p) => `${p}`,
  selectedTypeFilter: null,
  setSelectedTypeFilter: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('properties'); // Default to properties (Tenant view)
  const [language, setLanguage] = useState<Language>('ar');
  const [userRole, setUserRole] = useState<UserRole>('tenant');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currency, setCurrency] = useState<Currency>('SAR');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<PropertyType | null>(null);

  // Translation helper
  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    // Redirect to appropriate view
    if (role === 'owner') setCurrentView('dashboard');
    else if (role === 'admin') setCurrentView('admin-panel');
    else setCurrentView('properties');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('tenant');
    setCurrentView('properties');
    setSelectedTypeFilter(null);
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'SAR' ? 'USD' : 'SAR');
  };

  const formatPrice = (sarPrice: number) => {
    if (currency === 'SAR') {
      return `SAR ${sarPrice.toLocaleString()}`;
    } else {
      // Simple fixed conversion rate: 1 USD = 3.75 SAR
      const usdPrice = Math.round(sarPrice / 3.75);
      return `$${usdPrice.toLocaleString()}`;
    }
  };

  const renderView = () => {
    // Role-based access control simulation
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <PropertyListing onReqLogin={() => setShowAuthModal(true)} />;
      case 'owner-units':
        return userRole === 'owner' ? <OwnerPortal initialTab="units" /> : <Dashboard />;
      case 'subscriptions':
        return userRole === 'owner' ? <OwnerPortal initialTab="subscriptions" /> : <Dashboard />;
      case 'operations':
        return <Operations />;
      case 'assistant':
        return <SmartAssistant />;
      case 'admin-panel':
         return userRole === 'admin' ? <AdminPanel /> : <Dashboard />;
      case 'settings':
        return (
          <div className="flex items-center justify-center h-full text-slate-400 flex-col gap-4 text-center">
            <h2 className="text-xl font-bold text-brand-dark">{t('settingsTitle')}</h2>
            <p>{t('settingsDesc')}</p>
            {!isLoggedIn && (
               <button 
                 onClick={() => setShowAuthModal(true)}
                 className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-colors"
               >
                 {t('login')}
               </button>
            )}
          </div>
        );
      default:
        return <PropertyListing onReqLogin={() => setShowAuthModal(true)} />;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      dir, 
      userRole, 
      isLoggedIn, 
      login: handleLogin, 
      logout: handleLogout, 
      openAuthModal,
      currency,
      toggleCurrency,
      formatPrice,
      selectedTypeFilter,
      setSelectedTypeFilter
    }}>
      <Layout currentView={currentView} onNavigate={setCurrentView}>
        {renderView()}
      </Layout>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      
      {/* Login Floating Button for generic entry if not logged in */}
      {!isLoggedIn && (
        <button
          onClick={() => setShowAuthModal(true)}
          className={`fixed bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-40 bg-brand-dark text-brand-beige p-4 rounded-full shadow-lg hover:bg-brand-primary transition-all hover:scale-105 border-2 border-brand-beige md:hidden`}
          title={t('login')}
        >
          <LogIn className="w-6 h-6" />
        </button>
      )}
    </LanguageContext.Provider>
  );
}

export default App;
