
import React, { useState } from 'react';
import { useLanguage } from '../App';
import { CheckCircle2, XCircle, UserPlus, MessageSquare, Briefcase, Plus, Phone, X, Save, Wallet, Clock, Users, Map, LayoutGrid } from 'lucide-react';

interface ServiceProvider {
  id: number;
  name: string;
  type: string;
  contact: string;
  financialDues: number;
  avgSpeed: number; // in hours
  teamSize: number;
  city: string;
  district: string;
  region: string;
}

interface GeoStats {
  city: string;
  district: string;
  count: number;
  region: string;
}

const AdminPanel: React.FC = () => {
  const { t, dir, formatPrice, language } = useLanguage();
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [providers, setProviders] = useState<ServiceProvider[]>([
    { 
      id: 1, 
      name: "Al-Saad Cleaning Co.", 
      type: "Cleaning", 
      contact: "+966 50 123 4567",
      financialDues: 15400,
      avgSpeed: 2.5,
      teamSize: 45,
      city: "Riyadh",
      district: "Al Malqa",
      region: "Central"
    },
    { 
      id: 2, 
      name: "QuickFix Maintenance", 
      type: "Maintenance", 
      contact: "+966 55 987 6543",
      financialDues: 8200,
      avgSpeed: 4.0,
      teamSize: 12,
      city: "Jeddah",
      district: "Al Hamra",
      region: "West"
    },
    { 
      id: 3, 
      name: "LogiTech Solutions", 
      type: "Logistics", 
      contact: "support@logitech.sa",
      financialDues: 21000,
      avgSpeed: 1.5,
      teamSize: 8,
      city: "Riyadh",
      district: "Olaya",
      region: "Central"
    },
    { 
      id: 4, 
      name: "Eastern Shine", 
      type: "Cleaning", 
      contact: "+966 54 111 2222",
      financialDues: 4500,
      avgSpeed: 3.2,
      teamSize: 20,
      city: "Dammam",
      district: "Al Faisaliyah",
      region: "East"
    },
  ]);

  // Form State
  const [newProviderName, setNewProviderName] = useState('');
  const [newProviderType, setNewProviderType] = useState('Cleaning');
  const [newProviderContact, setNewProviderContact] = useState('');

  const pendingUsers = [
    { id: 1, name: "Ahmed Al-Salem", type: "Owner", date: "2023-10-25" },
    { id: 2, name: "Sara Tech Corp", type: "Owner", date: "2023-10-26" },
    { id: 3, name: "John Doe", type: "Tenant", date: "2023-10-26" },
  ];

  const complaints = [
    { id: 1, user: "Khalid M.", subject: "Booking Refund Issue", date: "2023-10-24", status: "Open" },
    { id: 2, user: "Unit 402 Owner", subject: "Platform Sync Error", date: "2023-10-25", status: "Pending" },
  ];

  const handleAddProvider = () => {
    if (newProviderName && newProviderContact) {
      const newProvider: ServiceProvider = {
        id: providers.length + 1,
        name: newProviderName,
        type: newProviderType,
        contact: newProviderContact,
        financialDues: 0,
        avgSpeed: 0,
        teamSize: 1,
        city: "Riyadh",
        district: "Pending",
        region: "Central"
      };
      setProviders([...providers, newProvider]);
      setNewProviderName('');
      setNewProviderContact('');
      setShowAddProvider(false);
    }
  };

  // derived stats
  const totalDues = providers.reduce((acc, curr) => acc + curr.financialDues, 0);
  const avgSystemSpeed = (providers.reduce((acc, curr) => acc + curr.avgSpeed, 0) / providers.length).toFixed(1);
  const totalStaff = providers.reduce((acc, curr) => acc + curr.teamSize, 0);

  // Group by geography
  const geoDistribution = providers.reduce((acc, curr) => {
    const key = `${curr.city}-${curr.district}`;
    if (!acc[key]) acc[key] = { city: curr.city, district: curr.district, count: 0, region: curr.region };
    acc[key].count++;
    return acc;
  }, {} as Record<string, GeoStats>);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">{t('adminPanel')}</h2>
          <p className="text-slate-500 text-sm">System Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-beige/30 overflow-hidden h-fit">
          <div className="p-4 border-b border-brand-beige/20 bg-brand-bg flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-primary" />
            <h3 className="font-bold text-brand-dark">{t('pendingApprovals')}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {pendingUsers.map(user => (
              <div key={user.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-brand-dark">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.type} • {user.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title={t('approve')}>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title={t('reject')}>
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-beige/30 overflow-hidden h-fit">
          <div className="p-4 border-b border-brand-beige/20 bg-brand-bg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-mauve" />
            <h3 className="font-bold text-brand-dark">{t('complaints')}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {complaints.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                 <div>
                    <p className="font-medium text-brand-dark">{item.subject}</p>
                    <p className="text-xs text-slate-500">{t('user')}: {item.user}</p>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'Open' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                     {item.status}
                   </span>
                   <button className="text-sm font-medium text-brand-primary hover:underline">{t('resolve')}</button>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Providers Section - Full Width */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
             <Briefcase className="w-6 h-6 text-brand-dark" />
             <h3 className="text-xl font-bold text-brand-dark">{t('serviceProviders')}</h3>
          </div>
          
          {/* Provider Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-brand-beige/30 shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{t('financialDues')}</span>
                  <Wallet className="w-5 h-5 text-brand-primary" />
               </div>
               <div className="text-2xl font-bold text-brand-dark">{formatPrice(totalDues)}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-brand-beige/30 shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{t('performanceSpeed')}</span>
                  <Clock className="w-5 h-5 text-brand-mauve" />
               </div>
               <div className="text-2xl font-bold text-brand-dark">{avgSystemSpeed} <span className="text-sm font-normal text-slate-400">{t('hours')}</span></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-brand-beige/30 shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{t('teamSize')}</span>
                  <Users className="w-5 h-5 text-blue-600" />
               </div>
               <div className="text-2xl font-bold text-brand-dark">{totalStaff}</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-brand-beige/30 shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{t('geoDistribution')}</span>
                  <Map className="w-5 h-5 text-green-600" />
               </div>
               <div className="text-2xl font-bold text-brand-dark">{providers.length} <span className="text-sm font-normal text-slate-400">Providers</span></div>
            </div>
          </div>

          {/* Geographic Distribution Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-brand-beige/30 overflow-hidden">
             <div className="p-4 border-b border-brand-beige/20 bg-brand-bg flex items-center gap-2">
               <LayoutGrid className="w-4 h-4 text-slate-600" />
               <h4 className="font-bold text-sm text-brand-dark">{t('geoDistribution')}</h4>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {(Object.values(geoDistribution) as GeoStats[]).map((geo, idx) => (
                   <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="text-xs text-slate-400 mb-1">{language === 'ar' ? geo.region : geo.region}</div>
                      <div className="font-bold text-brand-dark text-sm">{language === 'ar' ? geo.city : geo.city}</div>
                      <div className="text-xs text-brand-primary">{language === 'ar' ? geo.district : geo.district}</div>
                      <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
                         <span className="text-[10px] text-slate-500">{t('providerCount')}</span>
                         <span className="font-bold text-brand-mauve bg-brand-mauve/10 px-2 rounded-full text-xs">{geo.count}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Providers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-brand-beige/30 overflow-hidden">
            <div className="p-4 border-b border-brand-beige/20 bg-brand-bg flex items-center justify-between">
              <h3 className="font-bold text-brand-dark">{t('serviceProviders')}</h3>
              {!showAddProvider && (
                <button 
                  onClick={() => setShowAddProvider(true)}
                  className="flex items-center gap-1 text-xs bg-brand-primary text-white px-3 py-1.5 rounded-lg hover:bg-brand-dark transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  {t('addProvider')}
                </button>
              )}
            </div>

            {/* Add Provider Form */}
            {showAddProvider && (
               <div className="p-4 bg-brand-bg/30 border-b border-brand-beige/20 animate-in slide-in-from-top duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                     <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">{t('providerName')}</label>
                        <input 
                          type="text" 
                          value={newProviderName}
                          onChange={(e) => setNewProviderName(e.target.value)}
                          className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary outline-none"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">{t('serviceType')}</label>
                        <select 
                          value={newProviderType}
                          onChange={(e) => setNewProviderType(e.target.value)}
                          className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary outline-none bg-white"
                        >
                          <option value="Cleaning">{t('cleaning')}</option>
                          <option value="Maintenance">{t('maintenance')}</option>
                          <option value="Logistics">{t('logistics')}</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">{t('contactInfo')}</label>
                        <input 
                          type="text" 
                          value={newProviderContact}
                          onChange={(e) => setNewProviderContact(e.target.value)}
                          className="w-full text-sm border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-primary outline-none"
                          placeholder="+966..."
                          style={{direction: 'ltr'}}
                        />
                     </div>
                     <div className="flex gap-2">
                        <button 
                          onClick={handleAddProvider}
                          className="flex-1 bg-green-600 text-white p-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-1"
                        >
                          <Save className="w-4 h-4" />
                          {t('saveProvider')}
                        </button>
                        <button 
                          onClick={() => setShowAddProvider(false)}
                          className="bg-slate-200 text-slate-600 p-2 rounded-lg hover:bg-slate-300"
                          title={t('cancel')}
                        >
                          <X className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* Providers List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" dir={dir}>
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                     <th className={`px-6 py-3 font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('providerName')}</th>
                     <th className={`px-6 py-3 font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('serviceType')}</th>
                     <th className={`px-6 py-3 font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('financialDues')}</th>
                     <th className={`px-6 py-3 font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('performanceSpeed')}</th>
                     <th className={`px-6 py-3 font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('coverageArea')}</th>
                     <th className={`px-6 py-3 font-medium ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('contactInfo')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {providers.map((provider) => (
                    <tr key={provider.id} className="hover:bg-brand-bg/50 transition-colors">
                      <td className="px-6 py-4">
                         <div className="font-medium text-brand-dark">{provider.name}</div>
                         <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {provider.teamSize} members
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${provider.type === 'Cleaning' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                            provider.type === 'Maintenance' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                            'bg-green-50 text-green-700 border-green-100'}`}>
                          {provider.type === 'Cleaning' && t('cleaning')}
                          {provider.type === 'Maintenance' && t('maintenance')}
                          {provider.type === 'Logistics' && t('logistics')}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">{formatPrice(provider.financialDues)}</td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-1 text-xs">
                            <span className={`w-2 h-2 rounded-full ${provider.avgSpeed < 2 ? 'bg-green-500' : provider.avgSpeed < 4 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                            {provider.avgSpeed} {t('hours')}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600">
                         <div>{provider.city}</div>
                         <div className="text-slate-400">{provider.district}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 flex items-center gap-2" dir="ltr">
                        <Phone className="w-3 h-3 text-brand-mauve" />
                        {provider.contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
