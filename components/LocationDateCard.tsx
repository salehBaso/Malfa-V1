import React, { useState } from 'react';
import { MapPin, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

export const CITIES = [
    { id: 'riyadh', ar: 'الرياض', en: 'Riyadh', regionAr: 'منطقة الرياض', regionEn: 'Riyadh Region' },
    { id: 'jeddah', ar: 'جدة', en: 'Jeddah', regionAr: 'منطقة مكة المكرمة', regionEn: 'Makkah Region' },
    { id: 'makkah', ar: 'مكة المكرمة', en: 'Makkah', regionAr: 'منطقة مكة المكرمة', regionEn: 'Makkah Region' },
    { id: 'madinah', ar: 'المدينة المنورة', en: 'Madinah', regionAr: 'منطقة المدينة المنورة', regionEn: 'Madinah Region' },
    { id: 'dammam', ar: 'الدمام', en: 'Dammam', regionAr: 'المنطقة الشرقية', regionEn: 'Eastern Province' },
    { id: 'dhahran', ar: 'الظهران', en: 'Dhahran', regionAr: 'المنطقة الشرقية', regionEn: 'Eastern Province' },
    { id: 'khobar', ar: 'الخبر', en: 'Al Khobar', regionAr: 'المنطقة الشرقية', regionEn: 'Eastern Province' },
    { id: 'abha', ar: 'أبها', en: 'Abha', regionAr: 'منطقة عسير', regionEn: 'Asir Region' },
    { id: 'tabuk', ar: 'تبوك', en: 'Tabuk', regionAr: 'منطقة تبوك', regionEn: 'Tabuk Region' },
    { id: 'hail', ar: 'حائل', en: 'Hail', regionAr: 'منطقة حائل', regionEn: 'Hail Region' },
    { id: 'jizan', ar: 'جازان', en: 'Jizan', regionAr: 'منطقة جازان', regionEn: 'Jizan Region' },
    { id: 'najran', ar: 'نجران', en: 'Najran', regionAr: 'منطقة نجران', regionEn: 'Najran Region' },
    { id: 'baha', ar: 'الباحة', en: 'Al Baha', regionAr: 'منطقة الباحة', regionEn: 'Al Baha Region' },
    { id: 'arar', ar: 'عرعر', en: 'Arar', regionAr: 'الحدود الشمالية', regionEn: 'Northern Borders' },
    { id: 'sakaka', ar: 'سكاكا', en: 'Sakaka', regionAr: 'منطقة الجوف', regionEn: 'Al Jouf Region' },
    { id: 'qassim', ar: 'بريدة', en: 'Buraydah', regionAr: 'منطقة القصيم', regionEn: 'Al Qassim Region' },
    { id: 'unaizah', ar: 'عنيزة', en: 'Unaizah', regionAr: 'منطقة القصيم', regionEn: 'Al Qassim Region' },
    { id: 'taif', ar: 'الطائف', en: 'Taif', regionAr: 'منطقة مكة المكرمة', regionEn: 'Makkah Region' },
    { id: 'yanbu', ar: 'ينبع', en: 'Yanbu', regionAr: 'منطقة المدينة المنورة', regionEn: 'Madinah Region' },
    { id: 'jubail', ar: 'الجبيل', en: 'Al Jubail', regionAr: 'المنطقة الشرقية', regionEn: 'Eastern Province' },
];

interface LocationDateCardProps {
    onSearch?: (city: string, date: Date) => void;
}

const LocationDateCard: React.FC<LocationDateCardProps> = ({ onSearch }) => {
    const [selectedCity, setSelectedCity] = useState(CITIES[0]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCityOpen, setIsCityOpen] = useState(false);

    // Formatting Options
    const gregorianFormatter = new Intl.DateTimeFormat('ar-SA', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        calendar: 'gregory'
    });

    const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handleCitySelect = (city: typeof CITIES[0]) => {
        setSelectedCity(city);
        setIsCityOpen(false);
        if (onSearch) onSearch(city.id, selectedDate);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const newDate = new Date(e.target.value);
            setSelectedDate(newDate);
            if (onSearch) onSearch(selectedCity.id, newDate);
        }
    };

    return (
        <div className="relative w-80 bg-[#1e293b] text-white rounded-3xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-md overflow-visible z-30 font-sans">

            {/* Location Section */}
            <div className="relative mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-400 text-sm font-medium">الموقع الحالي</h3>
                    <div className="p-2 bg-pink-500/20 rounded-full">
                        <MapPin className="w-5 h-5 text-pink-500" />
                    </div>
                </div>

                <div
                    className="cursor-pointer group"
                    onClick={() => setIsCityOpen(!isCityOpen)}
                >
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold text-white group-hover:text-brand-primary transition-colors">{selectedCity.ar}</h2>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isCityOpen ? 'rotate-180' : ''}`} />
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{selectedCity.regionAr}</p>
                    <p className="text-slate-500 text-xs">المملكة العربية السعودية</p>
                </div>

                {/* City Dropdown */}
                {isCityOpen && (
                    <div className="absolute top-full right-0 mt-2 w-full bg-white text-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                        {CITIES.map(city => (
                            <div
                                key={city.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCitySelect(city);
                                }}
                                className={`px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center ${selectedCity.id === city.id ? 'bg-blue-50 text-blue-600' : ''}`}
                            >
                                <span className="font-bold">{city.ar}</span>
                                {selectedCity.id === city.id && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-700/50 mb-6"></div>

            {/* Date Section */}
            <div className="relative group">
                <label className="absolute inset-0 cursor-pointer w-full h-full z-10 opacity-0">
                    <input
                        type="date"
                        className="w-full h-full cursor-pointer"
                        onChange={handleDateChange}
                    />
                </label>

                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-slate-400 text-sm font-medium">التقويم</h3>
                    <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                        <CalendarIcon className="w-5 h-5 text-blue-500" />
                    </div>
                </div>

                {/* Gregorian */}
                <div className="mb-4 pl-4 border-l-2 border-blue-500/50">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-slate-400">ميلادي</span>
                    </div>
                    <p className="text-lg font-bold ml-3">{gregorianFormatter.format(selectedDate)}</p>
                </div>

                {/* Hijri */}
                <div className="pl-4 border-l-2 border-emerald-500/50">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-xs text-slate-400">هجري</span>
                    </div>
                    <p className="text-lg font-bold ml-3">{hijriFormatter.format(selectedDate)}</p>
                </div>

                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-slate-500 bg-black/50 px-2 py-1 rounded pointer-events-none">
                    انقر للتغيير
                </div>
            </div>

        </div>
    );
};

export default LocationDateCard;
