
import React, { useState, useEffect } from 'react';
import { PROPERTIES } from '../constants';
import { Property, PropertyType } from '../types';
import { MapPin, Users, BedDouble, Check, Star, Lock, Wind, KeyRound, ShowerHead, Car, Navigation, Timer, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../App';

import LocationDateCard from './LocationDateCard';

interface PropertyListingProps {
  onReqLogin: () => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({ onReqLogin }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const { t, dir, isLoggedIn, formatPrice, language, selectedTypeFilter, setSelectedTypeFilter } = useLanguage();

  // Booking State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Filter Properties based on context
  const filteredProperties = selectedTypeFilter
    ? PROPERTIES.filter(p => p.type === selectedTypeFilter)
    : PROPERTIES;

  useEffect(() => {
    let timer: any;
    if (showBooking && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showBooking, timeLeft]);

  // Reset timer and form when opening modal
  useEffect(() => {
    if (showBooking) {
      setTimeLeft(600);
      setCheckIn(new Date().toISOString().split('T')[0]);

      // Set default checkout to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
      setNights(1);
    }
  }, [showBooking]);

  const handleBookClick = (property: Property) => {
    if (!isLoggedIn) {
      onReqLogin();
      return;
    }
    setSelectedProperty(property);
    setShowBooking(true);
  };

  // Logic to update Check-out based on Nights
  const handleNightsChange = (val: number) => {
    const newNights = Math.max(1, val);
    setNights(newNights);

    if (checkIn) {
      const date = new Date(checkIn);
      date.setDate(date.getDate() + newNights);
      setCheckOut(date.toISOString().split('T')[0]);
    }
  };

  // Logic to update Nights based on Dates
  const handleDateChange = (type: 'in' | 'out', val: string) => {
    if (type === 'in') {
      setCheckIn(val);
      // If new check-in is after check-out, push check-out
      if (checkOut && new Date(val) >= new Date(checkOut)) {
        const date = new Date(val);
        date.setDate(date.getDate() + nights);
        setCheckOut(date.toISOString().split('T')[0]);
      } else if (checkOut) {
        // Update nights count
        const diffTime = Math.abs(new Date(checkOut).getTime() - new Date(val).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
      }
    } else {
      setCheckOut(val);
      if (checkIn && val) {
        const start = new Date(checkIn);
        const end = new Date(val);
        if (end > start) {
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setNights(diffDays);
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getFilterLabel = (type: PropertyType) => {
    if (type === PropertyType.VILLA) return t('unitVilla');
    if (type === PropertyType.APARTMENT) return t('unitApartment');
    if (type === PropertyType.STUDIO) return t('unitStudio');
    if (type === PropertyType.FLOOR) return t('unitFloor');
    return type;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section - Saudi Vision 2030 Theme */}
      <div className="relative w-full h-[500px] md:h-96 rounded-2xl overflow-hidden shadow-xl group">
        {/* Background Image: Riyadh Kingdom Centre / Modern Saudi City */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1597087964893-6c747974eb32?q=80&w=2070&auto=format&fit=crop')" }}
        />

        {/* Gradient Overlay with Brand Colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-primary/60 to-transparent"></div>

        {/* Vision 2030 Geometric Pattern Overlay (Subtle Sadu-inspired) */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <div className="flex items-center gap-2 mb-6 animate-in slide-in-from-top duration-700">
            <span className="bg-brand-mauve/20 border border-brand-mauve text-brand-beige px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Vision 2030
            </span>
            <span className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Malfa & Maskn
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center leading-tight max-w-4xl animate-in slide-in-from-bottom duration-700 delay-100">
            {t('heroTitle')}
          </h1>

          <div className="animate-in zoom-in duration-500 delay-200">
            <LocationDateCard
              onSearch={(city, date) => console.log('Searching', city, date)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-beige/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">{t('ourProperties')}</h2>
          <p className="text-slate-500 text-sm">{t('syndicatedText')}</p>
        </div>

        {/* Active Filter Badge */}
        {selectedTypeFilter && (
          <div className="mt-2 md:mt-0 flex items-center animate-in fade-in slide-in-from-right">
            <div className="flex items-center gap-2 bg-brand-primary text-white px-3 py-1.5 rounded-full text-sm shadow-sm">
              <span>{getFilterLabel(selectedTypeFilter)}</span>
              <button
                onClick={() => setSelectedTypeFilter(null)}
                className="hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-sm border border-brand-beige/30 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              <div className="relative h-48 flex-shrink-0">
                <img
                  src={property.imageUrl}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-brand-dark flex items-center shadow-sm`}>
                  <Star className={`w-3 h-3 text-brand-mauve ${dir === 'rtl' ? 'ml-1' : 'mr-1'} fill-brand-mauve`} />
                  {property.rating}
                </div>
                <div className={`absolute bottom-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} bg-brand-dark/80 backdrop-blur px-2 py-1 rounded text-white text-xs`}>
                  {property.type}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-brand-dark mb-1">{property.name}</h3>
                <div className="flex items-center text-slate-500 text-xs mb-3">
                  <MapPin className={`w-3 h-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'} text-brand-mauve`} />
                  {property.location}
                </div>

                {/* Distance Info */}
                <div className="flex items-center text-xs text-brand-primary mb-3 bg-brand-bg/50 p-2 rounded-lg">
                  <Navigation className={`w-3 h-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'} text-brand-primary`} />
                  <span>{property.distance} {t('km')} {t('fromCenter')}</span>
                </div>

                {/* Specs & Amenities Row */}
                <div className="grid grid-cols-4 gap-2 text-xs text-slate-600 mb-4 border-t border-b border-brand-beige/20 py-3">
                  <div className="flex flex-col items-center gap-1 text-center" title={t('ac')}>
                    <div className={`p-1.5 rounded-full ${property.hasAC ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      <Wind className="w-4 h-4" />
                    </div>
                    <span className="text-[10px]">{t('ac')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center" title={t('smartLock')}>
                    <div className={`p-1.5 rounded-full ${property.hasSmartLock ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <span className="text-[10px]">{t('smartLock')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center" title={t('bathrooms')}>
                    <div className="p-1.5 rounded-full bg-cyan-50 text-cyan-600">
                      <ShowerHead className="w-4 h-4" />
                    </div>
                    <span className="text-[10px]">{property.bathrooms} {t('bathrooms')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center" title={t('parking')}>
                    <div className={`p-1.5 rounded-full ${property.hasParking ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                      <Car className="w-4 h-4" />
                    </div>
                    <span className="text-[10px]">{t('parking')}</span>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                  <div className="flex items-center">
                    <BedDouble className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'} text-slate-400`} />
                    {property.rooms} {t('rooms')}
                  </div>
                  <div className="flex items-center">
                    <Users className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'} text-slate-400`} />
                    {t('guests')} {property.maxGuests}
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-brand-beige/20 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-brand-primary">{formatPrice(property.pricePerNight)}</span>
                    <span className="text-xs text-slate-400">{t('night')}</span>
                  </div>
                  <button
                    onClick={() => handleBookClick(property)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${isLoggedIn
                      ? 'bg-brand-primary text-white hover:bg-brand-dark'
                      : 'bg-brand-beige/20 text-brand-primary hover:bg-brand-beige/40'}`}
                  >
                    {!isLoggedIn && <Lock className="w-3 h-3" />}
                    {isLoggedIn ? t('bookNow') : t('loginToBook')}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-brand-beige/30">
            <p className="text-slate-500 font-medium">No units found matching this category.</p>
            <button
              onClick={() => setSelectedTypeFilter(null)}
              className="mt-4 text-brand-primary text-sm hover:underline"
            >
              Show All Units
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Countdown Header */}
            <div className="bg-brand-dark text-white p-2 text-center text-sm font-medium flex items-center justify-center gap-2">
              <Timer className="w-4 h-4 text-brand-mauve animate-pulse" />
              {t('completeBookingIn')} <span className="text-brand-mauve font-bold font-mono">{formatTime(timeLeft)}</span>
            </div>

            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-brand-bg">
              <h3 className="font-bold text-lg text-brand-dark">{t('bookingTitle')}: {selectedProperty.name}</h3>
              <button onClick={() => setShowBooking(false)} className="text-slate-400 hover:text-brand-dark">
                {t('close')}
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('fullName')}</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>

              {/* Date & Nights Selection */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('checkIn')}</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => handleDateChange('in', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('nightsCount')}</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={nights}
                    onChange={(e) => handleNightsChange(parseInt(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm text-center font-bold text-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t('checkOut')}</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => handleDateChange('out', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('contactNum')}</label>
                <input type="tel" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-brand-primary outline-none" style={{ direction: 'ltr' }} placeholder="+966 5X XXX XXXX" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t('paymentMethod')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Apple Pay', 'Mada', 'Visa', 'STC Pay'].map((method) => (
                    <div key={method} className="border border-slate-200 rounded-lg p-3 flex items-center justify-center cursor-pointer hover:border-brand-primary hover:bg-brand-primary/5 transition-all">
                      <span className="text-sm font-medium text-slate-700">{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-sm text-blue-800">
                <Check className="w-5 h-5 flex-shrink-0" />
                <p>{t('nafathNote')}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">{t('price')} x {nights} {t('night').replace('/', '')}</span>
                <span className="font-bold text-brand-dark">{formatPrice(selectedProperty.pricePerNight * nights)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-brand-primary border-t border-slate-200 pt-2">
                <span>{t('totalPrice')}</span>
                <span>{formatPrice(selectedProperty.pricePerNight * nights)}</span>
              </div>

              <button
                onClick={() => {
                  alert(t('bookingSent'));
                  setShowBooking(false);
                }}
                className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors w-full shadow-lg mt-2"
              >
                {t('confirmPay')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
