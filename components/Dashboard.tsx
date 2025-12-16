
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { REVENUE_DATA, OCCUPANCY_DATA } from '../constants';
import { TrendingUp, Users, Wallet, Activity } from 'lucide-react';
import { useLanguage } from '../App';

const StatCard = ({ title, value, sub, icon: Icon, colorClass, iconColorClass }: any) => {
  const { dir } = useLanguage();
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige/30 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-brand-dark mt-1">{value}</h3>
        <p className={`text-xs mt-2 font-medium ${sub.includes('+') ? 'text-green-600' : 'text-slate-400'}`}>
          {sub}
        </p>
      </div>
      <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass} ${dir === 'rtl' ? 'mr-4' : 'ml-4'}`}>
        <Icon className={`w-6 h-6 ${iconColorClass}`} />
      </div>
    </div>
  );
}

const SaudiMapHeatmap = () => {
  const { t, language } = useLanguage();
  
  // Coordinates adjusted for the full Peninsula Map
  const locations = [
    // Central KSA
    { id: 'riyadh', en: 'Riyadh', ar: 'الرياض', x: 280, y: 240, intensity: 'high' },
    { id: 'buraydah', en: 'Buraydah', ar: 'بريدة', x: 240, y: 190, intensity: 'medium' },
    
    // West KSA
    { id: 'jeddah', en: 'Jeddah', ar: 'جدة', x: 120, y: 300, intensity: 'high' },
    { id: 'makkah', en: 'Makkah', ar: 'مكة المكرمة', x: 140, y: 310, intensity: 'high' },
    { id: 'madinah', en: 'Madinah', ar: 'المدينة المنورة', x: 130, y: 220, intensity: 'high' },
    { id: 'tabuk', en: 'Tabuk', ar: 'تبوك', x: 80, y: 100, intensity: 'low' },

    // East KSA & Gulf
    { id: 'dammam', en: 'Dammam', ar: 'الدمام', x: 380, y: 200, intensity: 'medium' },
    { id: 'khobar', en: 'Al Khobar', ar: 'الخبر', x: 385, y: 210, intensity: 'medium' },
    
    // South KSA
    { id: 'abha', en: 'Abha', ar: 'أبها', x: 180, y: 400, intensity: 'medium' },
    { id: 'jizan', en: 'Jizan', ar: 'جازان', x: 170, y: 430, intensity: 'medium' },
    
    // Neighbors (Context)
    { id: 'dubai', en: 'Dubai', ar: 'دبي', x: 530, y: 230, intensity: 'low' },
    { id: 'doha', en: 'Doha', ar: 'الدوحة', x: 440, y: 220, intensity: 'low' },
    { id: 'kuwait', en: 'Kuwait', ar: 'الكويت', x: 360, y: 130, intensity: 'low' },
  ];

  const generateVillages = (cx: number, cy: number, count: number, radius: number) => {
    const villages = [];
    for(let i=0; i<count; i++) {
       const angle = Math.random() * 2 * Math.PI;
       const r = Math.sqrt(Math.random()) * radius;
       villages.push({
         x: cx + r * Math.cos(angle),
         y: cy + r * Math.sin(angle)
       });
    }
    return villages;
  };

  const getColor = (intensity: string) => {
    switch(intensity) {
      case 'high': return '#F59E0B'; 
      case 'medium': return '#10B981'; 
      case 'low': return '#94A3B8'; 
      default: return '#cbd5e1';
    }
  };

  return (
    <div className="relative w-full h-[550px] bg-white rounded-lg flex items-center justify-center overflow-hidden border border-brand-beige/30">
      <svg viewBox="0 0 600 550" className="w-full h-full p-2 md:p-6 select-none">
        <defs>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="ksaSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" /> 
            <stop offset="100%" stopColor="#3b82f6" /> 
          </linearGradient>
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="4" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 3D Extrusion Layer (Peninsula Shape) */}
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
          transform="translate(0, 10)"
          fill="#0f2557"
        />

        {/* Main Map Shape (Full Arabian Peninsula) */}
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
          fill="url(#ksaSurface)"
          stroke="#60a5fa"
          strokeWidth="1.5"
          filter="url(#shadow3d)"
        />

        {/* Country Borders & Details */}
        <g stroke="#93c5fd" strokeWidth="0.8" fill="none" opacity="0.6">
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

            {/* Internal KSA Regions (Simplified) */}
            <path d="M 280 130 Q 320 180 380 200" /> {/* Central/East */}
            <path d="M 130 220 Q 200 200 280 240" /> {/* Madinah/Central */}
            <path d="M 140 310 Q 200 350 250 420" /> {/* Makkah/South */}
        </g>
        
        {/* Render Locations */}
        {locations.map((loc) => {
           const isHigh = loc.intensity === 'high';
           const villageCount = isHigh ? 8 : (loc.intensity === 'medium' ? 4 : 2);
           const spread = isHigh ? 25 : 15;
           const villages = generateVillages(loc.x, loc.y, villageCount, spread);

           return (
            <g key={loc.id} className="cursor-pointer group">
              {villages.map((v, i) => (
                <circle 
                  key={i} 
                  cx={v.x} 
                  cy={v.y} 
                  r={Math.random() * 1.5 + 0.5} 
                  fill={getColor(loc.intensity)} 
                  opacity="0.8" 
                />
              ))}

              <circle cx={loc.x} cy={loc.y} r={isHigh ? 30 : 20} fill={getColor(loc.intensity)} opacity="0.3" filter="url(#glow)">
                <animate attributeName="r" values={`${isHigh?30:20};${isHigh?40:25};${isHigh?30:20}`} dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
              
              <circle cx={loc.x} cy={loc.y} r={isHigh ? 3 : 2} fill="#ffffff" stroke={getColor(loc.intensity)} strokeWidth="1" />
              
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <rect x={loc.x - 50} y={loc.y - 45} width="100" height="30" rx="6" fill="#0F2D4D" fillOpacity="0.9" />
                <text x={loc.x} y={loc.y - 25} textAnchor="middle" fill="#DED1C6" fontSize="11px" fontWeight="bold" fontFamily="sans-serif">
                  {language === 'ar' ? loc.ar : loc.en}
                </text>
              </g>
            </g>
           );
        })}
      </svg>
      
      <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg shadow-sm backdrop-blur text-xs space-y-2 border border-brand-beige/20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div> {t('highDemand')}</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div> {t('medDemand')}</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-400 rounded-full"></div> {t('lowDemand')}</div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">{t('ownerDashboard')}</h2>
          <p className="text-slate-500 text-sm">{t('dashboardDesc')}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium border border-green-200">{t('ejarVerified')}</span>
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-full font-medium border border-brand-primary/20">{t('nafathConnected')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('totalRevenue')} 
          value="SAR 345,200" 
          sub={`+12.5% ${t('vsLastMonth')}`}
          icon={Wallet} 
          colorClass="bg-brand-primary" 
          iconColorClass="text-brand-primary"
        />
        <StatCard 
          title={t('occupancyRate')} 
          value="82%" 
          sub={`+5% ${t('seasonalAvg')}`}
          icon={Users} 
          colorClass="bg-brand-mauve"
          iconColorClass="text-brand-mauve" 
        />
        <StatCard 
          title={t('activeBookings')} 
          value="24" 
          sub={t('acrossProperties')} 
          icon={Activity} 
          colorClass="bg-brand-dark" 
          iconColorClass="text-brand-dark"
        />
        <StatCard 
          title={t('avgDailyRate')} 
          value="SAR 750" 
          sub={`+2% ${t('pricingBoost')}`} 
          icon={TrendingUp} 
          colorClass="bg-brand-beige" 
          iconColorClass="text-brand-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige/30">
          <h3 className="text-lg font-bold text-brand-dark mb-4">{t('revenueTrend')}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis orientation={language === 'ar' ? 'right' : 'left'} tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `${(val/1000)}k`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  cursor={{fill: '#f1f5f9'}}
                />
                <Bar dataKey="value" fill="#174871" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige/30">
          <h3 className="text-lg font-bold text-brand-dark mb-4">{t('occupancyDemand')}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={OCCUPANCY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis orientation={language === 'ar' ? 'right' : 'left'} tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Line type="monotone" dataKey="value" name="Occupancy %" stroke="#174871" strokeWidth={3} dot={{r: 4}} />
                <Line type="monotone" dataKey="uv" name="Cancellations" stroke="#A77693" strokeWidth={2} dot={{r: 3}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-beige/30">
        <h3 className="text-lg font-bold text-brand-dark mb-2">{t('heatmapTitle')}</h3>
        <p className="text-sm text-slate-500 mb-6">{t('heatmapDesc')}</p>
        
        <SaudiMapHeatmap />
      </div>
    </div>
  );
};

export default Dashboard;
