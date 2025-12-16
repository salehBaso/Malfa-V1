
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import { PROPERTIES } from '../constants';
import { UploadCloud, Star, Plus, MapPin, Building2, Activity, Key, Sparkles, Check, Crown, LayoutGrid } from 'lucide-react';

interface OwnerPortalProps {
  initialTab?: 'units' | 'subscriptions';
}

const OwnerMap = () => {
  const { t, language, dir } = useLanguage();

  // Map city names from properties to updated 3D SVG coordinates for Peninsula
  const getCoordinates = (location: string) => {
    if (location.includes('Riyadh') || location.includes('الرياض')) return { x: 280, y: 240 };
    if (location.includes('Jeddah') || location.includes('جدة')) return { x: 120, y: 300 };
    if (location.includes('Makkah') || location.includes('مكة')) return { x: 140, y: 310 };
    if (location.includes('Dammam') || location.includes('الدمام')) return { x: 380, y: 200 };
    if (location.includes('Khobar') || location.includes('الخبر')) return { x: 385, y: 210 };
    if (location.includes('Abha') || location.includes('أبها')) return { x: 180, y: 400 };
    if (location.includes('Tabuk') || location.includes('تبوك')) return { x: 80, y: 100 };
    return { x: 280, y: 240 }; // Default to Riyadh
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige/30 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="font-bold text-lg text-brand-dark">{t('propertyDistribution')}</h3>
          <p className="text-xs text-slate-500">{t('mapViewDesc')}</p>
        </div>
      </div>

      <div className="relative w-full h-[400px] flex items-center justify-center bg-white rounded-lg border border-brand-beige/20">
        <svg viewBox="0 0 600 550" className="w-full h-full p-4 select-none">
          <defs>
            <linearGradient id="ownerMapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="shadowOwner" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
            </filter>
          </defs>

          <text x="30" y="350" className="text-[10px] fill-blue-100 font-bold opacity-80 tracking-widest font-sans" transform="rotate(-90 30,350)">
            {language === 'ar' ? 'البحر الأحمر' : 'RED SEA'}
          </text>
          <text x="480" y="150" className="text-[10px] fill-blue-100 font-bold opacity-80 tracking-widest font-sans">
             {language === 'ar' ? 'الخليج العربي' : 'THE ARABIAN GULF'}
          </text>

          {/* 3D Extrusion Layer */}
          <path
            d="
            M 60 100 
            L 120 70  
            L 250 60 
            L 340 100 
            L 380 120 
            L 400 130 
            L 420 180 
            L 460 210 
            L 550 220 
            L 580 260
            L 570 350
            L 540 400
            L 400 480
            L 250 500
            L 140 490
            L 120 450
            L 100 350
            L 80 250
            Z
            "
            transform="translate(0, 6)"
            fill="#0f2557" 
          />

          {/* Main Map Surface */}
          <path
            d="
            M 60 100 
            L 120 70  
            L 250 60 
            L 340 100 
            L 380 120 
            L 400 130 
            L 420 180 
            L 460 210 
            L 550 220 
            L 580 260
            L 570 350
            L 540 400
            L 400 480
            L 250 500
            L 140 490
            L 120 450
            L 100 350
            L 80 250
            Z
            "
            fill="url(#ownerMapGradient)"
            stroke="#60a5fa"
            strokeWidth="1.2"
            filter="url(#shadowOwner)"
          />

           {/* Country Boundaries */}
           <g stroke="#93c5fd" strokeWidth="0.6" fill="none" opacity="0.5">
             {/* KSA / Yemen Border */}
            <path d="M 170 430 Q 250 420 320 450" />
            
            {/* KSA / Oman Border */}
            <path d="M 320 450 L 380 380 L 380 280" />
            
            {/* KSA / UAE Border */}
            <path d="M 380 280 L 480 250" />

            {/* KSA / Qatar Border */}
            <path d="M 430 230 L 430 210" />

            {/* KSA / Kuwait Border */}
            <path d="M 360 140 L 380 140" />
          </g>

          {PROPERTIES.map((prop) => {
            const coords = getCoordinates(prop.location);
            return (
              <g key={prop.id} className="group cursor-pointer">
                <circle cx={coords.x} cy={coords.y} r="8" className="fill-white animate-ping opacity-50" />
                <circle cx={coords.x} cy={coords.y} r="4" className="fill-brand-mauve stroke-white stroke-2" />
                
                <foreignObject x={coords.x - 60} y={coords.y - 70} width="120" height="60" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className={`bg-white text-xs p-2 rounded-lg shadow-lg border border-brand-beige/50 text-center ${dir === 'rtl' ? 'font-arabic' : ''}`}>
                    <p className="font-bold text-brand-dark truncate">{prop.name}</p>
                    <p className="text-slate-500">{prop.type}</p>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        <div className={`absolute bottom-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm border border-brand-beige/20`}>
          <div className="flex items-center gap-2 text-xs text-brand-dark">
            <span className="w-2 h-2 bg-brand-mauve rounded-full"></span>
            {t('activeUnit')}
          </div>
        </div>
      </div>
    </div>
  );
};

const OwnerPortal: React.FC<OwnerPortalProps> = ({ initialTab = 'units' }) => {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'units' | 'subscriptions'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-brand-dark">{activeTab === 'subscriptions' ? t('subscriptions') : t('myUnits')}</h2>
           <p className="text-slate-500 text-sm">{activeTab === 'subscriptions' ? t('subscriptionsDesc') : t('ownerDashboard')}</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center bg-white rounded-lg p-1 border border-brand-beige/30 shadow-sm">
           <button
             onClick={() => setActiveTab('units')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'units' ? 'bg-brand-dark text-white shadow' : 'text-slate-500 hover:text-brand-dark'}`}
           >
             <LayoutGrid className="w-4 h-4" />
             {t('myUnits')}
           </button>
           <button
             onClick={() => setActiveTab('subscriptions')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'subscriptions' ? 'bg-brand-mauve text-white shadow' : 'text-slate-500 hover:text-brand-mauve'}`}
           >
             <Crown className="w-4 h-4" />
             {t('subscriptions')}
           </button>
        </div>
        
        {activeTab === 'units' && (
          <button className="bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-dark transition-colors shadow-sm self-end md:self-auto">
            <Plus className="w-4 h-4" />
            {t('addProperty')}
          </button>
        )}
      </div>

      {activeTab === 'subscriptions' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-500">
          {/* Package 1: Tech Connect */}
          <div className="bg-white rounded-2xl border border-brand-beige/30 p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col relative group">
             <div className="absolute top-0 inset-x-0 h-1 bg-slate-300 rounded-t-2xl"></div>
             <div className="mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                   <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">{t('pkg1Title')}</h3>
                <p className="text-sm text-slate-500">{t('pkg1Desc')}</p>
             </div>
             
             <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                   <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                   {t('featDashboard')}
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                   <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                   {t('featPricing')}
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                   <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                   {t('featHeatmap')}
                </li>
             </ul>

             <button className="w-full py-3 rounded-xl border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors">
                {t('subscribe')}
             </button>
          </div>

          {/* Package 2: Smart Ops (Recommended) */}
          <div className="bg-white rounded-2xl border-2 border-brand-primary p-6 shadow-xl relative flex flex-col transform md:-translate-y-2">
             <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Recommended</div>
             <div className="mb-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-4">
                   <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">{t('pkg2Title')}</h3>
                <p className="text-sm text-slate-500">{t('pkg2Desc')}</p>
             </div>
             
             <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700 font-semibold">
                   <Check className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
                   {t('featSmartLock')}
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 font-semibold">
                   <Check className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
                   {t('featAccess')}
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 font-semibold">
                   <Check className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
                   {t('featBilling')}
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-500">
                   <Check className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                   {t('pkg1Title')} ({t('featDashboard')})
                </li>
             </ul>

             <button className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-dark transition-colors shadow-lg">
                {t('subscribe')}
             </button>
          </div>

          {/* Package 3: Full Management */}
          <div className="bg-white rounded-2xl border border-brand-mauve/30 p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col relative group">
             <div className="absolute top-0 inset-x-0 h-1 bg-brand-mauve rounded-t-2xl"></div>
             <div className="mb-4">
                <div className="w-12 h-12 bg-brand-mauve/10 rounded-xl flex items-center justify-center text-brand-mauve mb-4 group-hover:scale-110 transition-transform">
                   <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">{t('pkg3Title')}</h3>
                <p className="text-sm text-slate-500">{t('pkg3Desc')}</p>
             </div>
             
             <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                   <Check className="w-4 h-4 text-brand-mauve mt-0.5 flex-shrink-0" />
                   {t('featTurnover')}
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                   <Check className="w-4 h-4 text-brand-mauve mt-0.5 flex-shrink-0" />
                   {t('featCleaning')}
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                   <Check className="w-4 h-4 text-brand-mauve mt-0.5 flex-shrink-0" />
                   {t('featRestock')}
                </li>
                 <li className="flex items-start gap-2 text-sm text-slate-500">
                   <Check className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                   {t('pkg2Title')}
                </li>
             </ul>

             <button className="w-full py-3 rounded-xl border border-brand-mauve text-brand-mauve font-bold hover:bg-brand-mauve hover:text-white transition-colors">
                {t('subscribe')}
             </button>
          </div>
        </div>
      ) : (
        /* Original Units View */
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in slide-in-from-left duration-500">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige/30">
              <h3 className="font-bold text-lg mb-4 text-brand-dark flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-mauve" />
                {t('addProperty')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t('propertyName')} className="border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary transition-all" />
                <input type="text" placeholder={t('location')} className="border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary transition-all" />
                <div className="relative">
                   <input type="number" placeholder={t('price')} className="border border-slate-300 rounded-lg p-3 text-sm w-full outline-none focus:ring-2 focus:ring-brand-primary transition-all" />
                   <span className={`absolute top-3 text-slate-400 text-sm ${dir === 'rtl' ? 'left-3' : 'right-3'}`}>SAR</span>
                </div>
                <select className="border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary bg-white transition-all cursor-pointer">
                  <option>{t('unitVilla')}</option>
                  <option>{t('unitApartment')}</option>
                  <option>{t('unitStudio')}</option>
                  <option>{t('unitFloor')}</option>
                </select>
              </div>

              <div className="mt-4 border-2 border-dashed border-brand-beige/50 rounded-xl p-8 flex flex-col items-center justify-center bg-brand-bg/30 hover:bg-brand-beige/10 hover:border-brand-primary/50 transition-all cursor-pointer group">
                <div className="p-3 bg-brand-mauve/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-brand-mauve" />
                </div>
                <p className="font-medium text-slate-700">{t('uploadDocs')}</p>
                <p className="text-xs text-slate-500 mt-1">{t('uploadDocsDesc')}</p>
                <button className="mt-4 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-brand-primary hover:text-white hover:border-transparent transition-colors text-brand-dark shadow-sm">
                  {t('browse')}
                </button>
              </div>
            </div>

            <OwnerMap />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-brand-dark flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              {t('guestRatings')}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {PROPERTIES.slice(0, 3).map((prop) => (
                <div key={prop.id} className="bg-white p-4 rounded-xl shadow-sm border border-brand-beige/30 flex gap-4 hover:shadow-md transition-all group">
                  <img src={prop.imageUrl} className="w-20 h-20 rounded-lg object-cover flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform" alt={prop.name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-brand-dark text-sm truncate pr-2">{prop.name}</h4>
                      <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-700 flex-shrink-0">
                        <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500 mr-1" />
                        {prop.rating}
                      </div>
                    </div>
                    <div className="flex items-center text-[10px] text-slate-500 mt-1 mb-2 truncate">
                       <MapPin className="w-3 h-3 mr-1 text-brand-mauve" />
                       {prop.location}
                    </div>
                    
                    <div className="text-[10px] bg-brand-bg p-2 rounded text-slate-600 italic line-clamp-2">
                       "{prop.id === '1' ? 'Excellent facilities and very clean.' : 'Great location, loved the view.'}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerPortal;
