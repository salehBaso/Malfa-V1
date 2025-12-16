
import React, { useState, useEffect } from 'react';
import { ViewState, PropertyType } from '../types';
import { useLanguage } from '../App';
import SmartAssistant from './SmartAssistant';
import { 
  LayoutDashboard, 
  Building2, 
  ClipboardList, 
  Bot, 
  Settings, 
  Menu, 
  X,
  Globe,
  LogOut,
  ShieldCheck,
  Building,
  LogIn,
  MapPin,
  Calendar as CalendarIcon,
  Home,
  Layers,
  LayoutGrid,
  Coins,
  CreditCard
} from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  children: React.ReactNode;
}

const BrandLogo = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#174871" />
        <stop offset="100%" stopColor="#0F2D4D" />
      </linearGradient>
    </defs>
    {/* Abstract Building/House Shape - Represents 'Maskn' */}
    <path 
      d="M20 80 V 45 L 50 20 L 80 45 V 80 H 20 Z" 
      fill="url(#logoGradient)" 
      stroke="none"
    />
    {/* Interlocking Arch/Shelter - Represents 'Malfa' */}
    <path 
      d="M35 80 V 55 C 35 45 65 45 65 55 V 80" 
      stroke="#DED1C6" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    {/* Accent Roof/M Shape - Modern Touch */}
    <path 
      d="M15 50 L 50 20 L 85 50" 
      stroke="#A77693" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Small Window/Accent */}
    <circle cx="50" cy="40" r="5" fill="#A77693" />
  </svg>
);

const SidebarWidget = () => {
  const { language, t, dir } = useLanguage();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Format Dates
  const locale = language === 'ar' ? 'ar-SA' : 'en-US';
  
  const gregorianDate = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }).format(date);

  const hijriDate = new Intl.DateTimeFormat(locale + '-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    calendar: 'islamic-umalqura'
  }).format(date);

  return (
    <div className="mx-4 my-6 p-4 rounded-xl bg-white/5 border border-white/10 text-brand-beige space-y-4 shadow-inner">
      {/* Location Section */}
      <div className="flex items-start gap-3 border-b border-white/10 pb-3">
        <MapPin className="w-5 h-5 text-brand-mauve mt-1 flex-shrink-0" />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-brand-beige/50 font-bold mb-1">
            {language === 'ar' ? 'الموقع الحالي' : 'CURRENT LOCATION'}
          </p>
          <div className="font-medium text-sm leading-tight text-white">
            {language === 'ar' ? 'الرياض' : 'Riyadh'}
          </div>
          <div className="text-xs text-brand-beige/70">
            {language === 'ar' ? 'منطقة الرياض' : 'Riyadh Region'}
          </div>
          <div className="text-xs text-brand-beige/70">
            {language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="flex items-start gap-3">
        <CalendarIcon className="w-5 h-5 text-brand-primary mt-1 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-wider text-brand-beige/50 font-bold mb-1">
            {language === 'ar' ? 'التقويم' : 'CALENDAR'}
          </p>
          
          <div className="mb-2">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="text-xs text-blue-200 opacity-80">{language === 'ar' ? 'ميلادي' : 'Gregorian'}</span>
            </div>
            <div className="text-sm font-medium text-white pl-2.5 border-l border-blue-400/30">
              {gregorianDate}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              <span className="text-xs text-green-200 opacity-80">{language === 'ar' ? 'هجري' : 'Hijri'}</span>
            </div>
            <div className="text-sm font-medium text-white pl-2.5 border-l border-green-400/30">
              {hijriDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const { 
    language, setLanguage, t, dir, 
    userRole, isLoggedIn, logout, openAuthModal, 
    currency, toggleCurrency, 
    selectedTypeFilter, setSelectedTypeFilter 
  } = useLanguage();

  // Define navigation items per role
  const getNavItems = () => {
    const common = [
      { id: 'settings', label: t('settings'), icon: Settings },
    ];

    if (!isLoggedIn || userRole === 'tenant') {
      return [
        { id: 'properties', label: t('properties'), icon: Building2 }, // Main view for tenant
        ...common
      ];
    }

    if (userRole === 'owner') {
      return [
        { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { id: 'owner-units', label: t('myUnits'), icon: Building },
        { id: 'subscriptions', label: t('subscriptions'), icon: CreditCard },
        { id: 'operations', label: t('operations'), icon: ClipboardList },
        ...common
      ];
    }

    if (userRole === 'admin') {
      return [
        { id: 'admin-panel', label: t('adminPanel'), icon: ShieldCheck },
        { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard }, // Global view
        ...common
      ];
    }
    
    return common;
  };

  const navItems = getNavItems();
  
  const unitTypes = [
    { id: PropertyType.VILLA, label: t('unitVilla'), icon: Home },
    { id: PropertyType.APARTMENT, label: t('unitApartment'), icon: Building2 },
    { id: PropertyType.STUDIO, label: t('unitStudio'), icon: LayoutGrid },
    { id: PropertyType.FLOOR, label: t('unitFloor'), icon: Layers },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleNavClick = (viewId: string) => {
    // If clicking main properties link, reset filter
    if (viewId === 'properties') {
      setSelectedTypeFilter(null);
    }
    onNavigate(viewId as ViewState);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (userRole === 'owner') {
      onNavigate('dashboard');
    } else if (userRole === 'admin') {
      onNavigate('admin-panel');
    } else {
      onNavigate('properties');
      setSelectedTypeFilter(null);
    }
    setIsMobileMenuOpen(false);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-brand-dark text-white w-64 shadow-xl overflow-y-auto scrollbar-hide">
      <div 
        onClick={handleLogoClick}
        className="p-6 border-b border-white/10 flex items-center gap-3 flex-shrink-0 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <BrandLogo />
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-brand-beige to-brand-mauve bg-clip-text text-transparent">
            {language === 'ar' ? 'ملفا ومسكن' : 'Malfa & Maskn'}
          </h1>
          <p className="text-[10px] text-brand-beige/70 uppercase tracking-widest">{language === 'ar' ? 'إدارة الأصول' : 'Asset Mgmt'}</p>
        </div>
      </div>
      
      {/* Location & Calendar Widget */}
      <SidebarWidget />

      {/* Role Badge */}
      {isLoggedIn && (
        <div className="px-6 pb-2">
           <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-white/10 text-brand-beige">
               {userRole === 'owner' ? t('roleOwner') : userRole === 'admin' ? t('roleAdmin') : t('roleTenant')}
            </span>
        </div>
      )}
      
      <nav className="flex-1 py-2 space-y-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id && !selectedTypeFilter
                ? 'bg-brand-primary text-white shadow-md border border-white/10' 
                : 'text-brand-beige/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${dir === 'rtl' ? 'ml-3' : 'mr-3'} ${currentView === item.id ? 'text-brand-mauve' : ''}`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}

        {/* Preferred Unit Types Section */}
        {(!isLoggedIn || userRole === 'tenant') && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <h3 className={`px-4 text-xs font-bold text-brand-beige/50 uppercase tracking-wider mb-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('preferredUnits')}
            </h3>
            <div className="space-y-1">
              {unitTypes.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => {
                     setSelectedTypeFilter(unit.id);
                     onNavigate('properties');
                     setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2.5 rounded-lg transition-colors group ${
                    selectedTypeFilter === unit.id && currentView === 'properties'
                      ? 'bg-white/10 text-white' 
                      : 'text-brand-beige/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <unit.icon className={`w-4 h-4 ${dir === 'rtl' ? 'ml-3' : 'mr-3'} ${selectedTypeFilter === unit.id ? 'text-brand-mauve' : 'group-hover:text-brand-mauve'} transition-colors`} />
                  <span className="text-sm">{unit.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-white/10 bg-black/20 space-y-3 mt-auto">
        {isLoggedIn ? (
          <button 
            onClick={logout}
            className="flex items-center justify-center w-full py-2 bg-red-900/30 text-red-200 hover:bg-red-900/50 rounded-md text-sm transition-colors"
          >
            <LogOut className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            {t('logout')}
          </button>
        ) : (
          <button 
            onClick={() => {
              openAuthModal();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center justify-center w-full py-2 bg-brand-primary text-white hover:bg-brand-primary/80 rounded-md text-sm transition-colors shadow-sm border border-brand-beige/20"
          >
            <LogIn className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            {t('loginBtn')}
          </button>
        )}

        <button 
          onClick={toggleCurrency}
          className="flex items-center justify-center w-full py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors text-brand-beige"
        >
          <Coins className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
          <span>{currency === 'SAR' ? 'USD' : 'SAR'}</span>
        </button>

        <button 
          onClick={toggleLanguage}
          className="flex items-center justify-center w-full py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors text-brand-beige"
        >
          <Globe className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
          {language === 'en' ? 'العربية' : 'English'}
        </button>

        <div>
          <a 
            href="https://wa.me/966504128878"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-brand-beige/80 hover:text-white transition-colors group justify-center"
          >
             {/* WhatsApp SVG Logo */}
             <svg 
               viewBox="0 0 24 24" 
               width="24" 
               height="24" 
               className={`w-5 h-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'} text-[#25D366] fill-current`}
               xmlns="http://www.w3.org/2000/svg"
             >
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
             </svg>
             <span>{t('connectWhatsApp')}</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden" dir={dir}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <NavContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="relative z-50">
            <NavContent />
          </div>
          <div 
            className="flex-1 bg-brand-dark/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-brand-beige/30 p-4 flex items-center justify-between">
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer"
          >
            <BrandLogo />
            <h1 className="font-bold text-brand-dark">{t('appTitle')}</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-brand-dark">
             {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>

        {/* Floating Assistant Button */}
        <button
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className={`fixed md:bottom-6 bottom-24 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-40 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-brand-dark transition-all hover:scale-105 border-2 border-brand-beige`}
        >
          {isAssistantOpen ? <X /> : <Bot />}
        </button>

        {/* Assistant Window Overlay */}
        {isAssistantOpen && (
          <div className={`fixed md:bottom-24 bottom-40 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-50 w-[90%] md:w-full max-w-sm h-[500px] shadow-2xl rounded-2xl animate-in slide-in-from-bottom-10`}>
             <SmartAssistant onClose={() => setIsAssistantOpen(false)} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Layout;
