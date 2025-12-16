

export enum PropertyType {
  APARTMENT = 'Apartment',
  VILLA = 'Villa',
  STUDIO = 'Studio',
  LOFT = 'Loft',
  FLOOR = 'Floor'
}

export type Currency = 'SAR' | 'USD';

export interface Property {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  imageUrl: string;
  type: PropertyType;
  amenities: string[];
  description: string;
  distance: number; // km from city center
  hasAC: boolean;
  hasSmartLock: boolean;
  hasParking: boolean;
}

export interface OperationalTask {
  id: string;
  propertyId: string;
  propertyName: string;
  type: 'Cleaning' | 'Restocking' | 'Turnover' | 'Maintenance';
  status: 'Pending' | 'In Progress' | 'Completed';
  date: string;
  assignee: string;
}

export interface ChartData {
  name: string;
  value: number;
  uv?: number; // Secondary metric
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'dashboard' | 'properties' | 'operations' | 'assistant' | 'settings' | 'owner-units' | 'admin-panel' | 'subscriptions';

export type Language = 'en' | 'ar';
export type UserRole = 'tenant' | 'owner' | 'admin';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  userRole: UserRole;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  openAuthModal: () => void;
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (sarPrice: number) => string;
  selectedTypeFilter: PropertyType | null;
  setSelectedTypeFilter: (type: PropertyType | null) => void;
}
