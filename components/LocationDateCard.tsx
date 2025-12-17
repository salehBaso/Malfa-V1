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
    const [isCityOpen, setIsCityOpen] = useState(false);

    // Date Range State
    const [checkIn, setCheckIn] = useState<Date | null>(new Date());
    const [checkOut, setCheckOut] = useState<Date | null>(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());

    // Formatters
    const dayFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric' });
    const monthFormatter = new Intl.DateTimeFormat('ar-SA', { month: 'long', year: 'numeric', calendar: 'gregory' });
    const fullDateFormatter = new Intl.DateTimeFormat('ar-SA', { day: 'numeric', month: 'short', weekday: 'short' });
    const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' });

    const handleCitySelect = (city: typeof CITIES[0]) => {
        setSelectedCity(city);
        setIsCityOpen(false);
        if (onSearch && checkIn && checkOut) onSearch(city.id, checkIn);
    };

    const handleDayClick = (date: Date) => {
        // Prevent selecting past dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return;

        if (!checkIn || (checkIn && checkOut)) {
            // Start new selection
            setCheckIn(date);
            setCheckOut(null);
        } else if (checkIn && !checkOut) {
            // Complete selection
            if (date < checkIn) {
                setCheckIn(date);
            } else if (date.getTime() === checkIn.getTime()) {
                // Same date clicked, do nothing or explicitly allow single day? 
                // Usually hotels require 1 night.
                return;
            } else {
                setCheckOut(date);
                setIsCalendarOpen(false); // Close on selection complete
                if (onSearch) onSearch(selectedCity.id, checkIn);
            }
        }
    };

    const isDateInRange = (date: Date) => {
        if (!checkIn || !checkOut || !date) return false;
        return date > checkIn && date < checkOut;
    };

    const isDateRangeStart = (date: Date) => {
        return checkIn && date.getTime() === checkIn.getTime();
    };

    const isDateRangeEnd = (date: Date) => {
        return checkOut && date.getTime() === checkOut.getTime();
    };

    const isHoverInPotentialRange = (date: Date) => {
        if (!checkIn || checkOut || !hoverDate) return false;
        if (date > checkIn && date <= hoverDate) return true;
        return false;
    };

    const changeMonth = (delta: number) => {
        const newDate = new Date(viewDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setViewDate(newDate);
    };

    const getDaysInMonth = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
        for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
        return days;
    };

    return (
        <div className="relative w-96 bg-[#1e293b] text-white rounded-3xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-md z-30 font-sans select-none">

            {/* Location Section */}
            <div className="relative mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-400 text-sm font-medium">الوجهة</h3>
                    <div className="p-2 bg-pink-500/20 rounded-full">
                        <MapPin className="w-5 h-5 text-pink-500" />
                    </div>
                </div>

                <div
                    className="cursor-pointer group flex items-center justify-between"
                    onClick={() => { setIsCityOpen(!isCityOpen); setIsCalendarOpen(false); }}
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors">{selectedCity.ar}</h2>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isCityOpen ? 'rotate-180' : ''}`} />
                        </div>
                        <p className="text-slate-400 text-xs mt-1">{selectedCity.regionAr}</p>
                    </div>
                </div>

                {/* City Dropdown */}
                {isCityOpen && (
                    <div className="absolute top-full right-0 mt-2 w-full max-h-60 overflow-y-auto bg-white text-slate-800 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 custom-scrollbar">
                        {CITIES.map(city => (
                            <div
                                key={city.id}
                                onClick={(e) => { e.stopPropagation(); handleCitySelect(city); }}
                                className={`px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center border-b border-slate-100 last:border-0 ${selectedCity.id === city.id ? 'bg-blue-50 text-blue-600' : ''}`}
                            >
                                <span className="font-bold text-sm">{city.ar}</span>
                                {selectedCity.id === city.id && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full h-px bg-slate-700/50 mb-6"></div>

            {/* Date Selection Display */}
            <div className="grid grid-cols-2 gap-4 mb-2">
                <div
                    className={`cursor-pointer p-3 rounded-xl transition-all ${isCalendarOpen && !checkOut ? 'bg-blue-500/20 ring-1 ring-blue-500' : 'hover:bg-slate-800'}`}
                    onClick={() => setIsCalendarOpen(true)}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <CalendarIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-slate-400">الوصول</span>
                    </div>
                    <p className="font-bold text-sm">{checkIn ? fullDateFormatter.format(checkIn) : '-'}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{checkIn ? hijriFormatter.format(checkIn) : ''}</p>
                </div>

                <div
                    className={`cursor-pointer p-3 rounded-xl transition-all ${isCalendarOpen && checkIn && !checkOut ? 'bg-blue-500/20 ring-1 ring-blue-500' : 'hover:bg-slate-800'}`}
                    onClick={() => setIsCalendarOpen(true)}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <CalendarIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-slate-400">المغادرة</span>
                    </div>
                    <p className="font-bold text-sm">{checkOut ? fullDateFormatter.format(checkOut) : '-'}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{checkOut ? hijriFormatter.format(checkOut) : ''}</p>
                </div>
            </div>

            {/* Calendar Popup */}
            {isCalendarOpen && (
                <div className="absolute top-[110%] right-0 w-80 bg-white text-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
                    <div className="p-4 bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors rotate-180"><ChevronDown className="w-4 h-4" /></button>
                            <span className="font-bold text-sm">{monthFormatter.format(viewDate)}</span>
                            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ChevronDown className="w-4 h-4" /></button>
                        </div>

                        <div className="grid grid-cols-7 mb-2 text-center text-xs text-slate-400 font-medium">
                            <div>أحد</div><div>إثنين</div><div>ثلاثاء</div><div>أربعاء</div><div>خميس</div><div>جمعة</div><div>سبت</div>
                        </div>

                        <div className="grid grid-cols-7 gap-y-1" onMouseLeave={() => setHoverDate(null)}>
                            {getDaysInMonth().map((date, i) => {
                                if (!date) return <div key={i} />;

                                const isSelectedStart = isDateRangeStart(date);
                                const isSelectedEnd = isDateRangeEnd(date);
                                const isRange = isDateInRange(date);
                                const isHoverRange = isHoverInPotentialRange(date);
                                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                                return (
                                    <div
                                        key={i}
                                        onMouseEnter={() => setHoverDate(date)}
                                        onClick={() => handleDayClick(date)}
                                        className={`
                                            relative h-9 flex items-center justify-center text-sm font-medium cursor-pointer transition-all
                                            ${isPast ? 'text-slate-300 cursor-not-allowed' : ''}
                                            ${isSelectedStart ? 'bg-blue-600 text-white rounded-r-full z-10' : ''}
                                            ${isSelectedEnd ? 'bg-blue-600 text-white rounded-l-full z-10' : ''}
                                            ${isRange ? 'bg-blue-50 text-blue-700' : ''}
                                            ${!isRange && !isSelectedStart && !isSelectedEnd && isHoverRange ? 'bg-blue-50' : ''}
                                            ${!isPast && !isSelectedStart && !isSelectedEnd && !isRange && !isHoverRange ? 'hover:bg-slate-100 rounded-full' : ''}
                                        `}
                                    >
                                        {dayFormatter.format(date)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationDateCard;
