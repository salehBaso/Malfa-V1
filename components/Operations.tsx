import React from 'react';
import { TASKS } from '../constants';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../App';

const Operations: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">{t('opsCenter')}</h2>
          <p className="text-slate-500 text-sm">{t('opsDesc')}</p>
        </div>
        <button className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark">
          {t('newTask')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-brand-beige/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600" dir={dir}>
            <thead className="bg-brand-bg border-b border-brand-beige/20">
              <tr>
                <th className={`px-6 py-4 font-semibold text-brand-dark ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('taskType')}</th>
                <th className={`px-6 py-4 font-semibold text-brand-dark ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('property')}</th>
                <th className={`px-6 py-4 font-semibold text-brand-dark ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('status')}</th>
                <th className={`px-6 py-4 font-semibold text-brand-dark ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('assignee')}</th>
                <th className={`px-6 py-4 font-semibold text-brand-dark ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('date')}</th>
                <th className={`px-6 py-4 font-semibold text-brand-dark ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TASKS.map((task) => (
                <tr key={task.id} className="hover:bg-brand-bg/50 transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    {task.type === 'Cleaning' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                    {task.type === 'Maintenance' && <div className="w-2 h-2 rounded-full bg-red-400" />}
                    {task.type === 'Restocking' && <div className="w-2 h-2 rounded-full bg-green-400" />}
                    {task.type === 'Turnover' && <div className="w-2 h-2 rounded-full bg-purple-400" />}
                    {task.type}
                  </td>
                  <td className="px-6 py-4 text-slate-900">{task.propertyName}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        task.status === 'In Progress' ? 'bg-brand-beige text-brand-dark' : 
                        'bg-slate-100 text-slate-800'}`}>
                      {task.status === 'Completed' ? <CheckCircle2 className={`w-3 h-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} /> : 
                       task.status === 'In Progress' ? <Clock className={`w-3 h-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} /> : 
                       <Circle className={`w-3 h-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{task.assignee}</td>
                  <td className="px-6 py-4">{task.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-brand-primary hover:text-brand-dark font-medium text-xs">{t('manage')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-brand-beige/30">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><AlertCircle className="w-5 h-5"/></div>
             <h3 className="font-bold text-slate-800">{t('turnoverProtocol')}</h3>
           </div>
           <p className="text-sm text-slate-500">
             {t('turnoverDesc')}
           </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-brand-beige/30">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-brand-mauve/20 rounded-lg text-brand-mauve"><CheckCircle2 className="w-5 h-5"/></div>
             <h3 className="font-bold text-slate-800">{t('qualityInspection')}</h3>
           </div>
           <p className="text-sm text-slate-500">
             {t('qualityDesc')}
           </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-beige/30">
           <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Clock className="w-5 h-5"/></div>
             <h3 className="font-bold text-slate-800">{t('smartLockSync')}</h3>
           </div>
           <p className="text-sm text-slate-500">
             {t('smartLockDesc')}
           </p>
        </div>
      </div>
    </div>
  );
};

export default Operations;