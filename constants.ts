
import { Property, PropertyType, OperationalTask, ChartData } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Royal Palms Villa',
    location: 'Riyadh, Al Malqa',
    pricePerNight: 1200,
    rooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    rating: 4.8,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    type: PropertyType.VILLA,
    amenities: ['Pool', 'Majlis', 'BBQ Area'],
    description: 'Luxurious 4-bedroom villa suitable for large families. Features a private pool and traditional Majlis.',
    distance: 12.5,
    hasAC: true,
    hasSmartLock: true,
    hasParking: true
  },
  {
    id: '2',
    name: 'Skyline View Apartment',
    location: 'Jeddah, Corniche',
    pricePerNight: 650,
    rooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.5,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    type: PropertyType.APARTMENT,
    amenities: ['Sea View', 'Gym Access', 'Smart TV', 'Daily Cleaning'],
    description: 'Modern apartment with stunning Red Sea views. Perfect for business travelers or small families.',
    distance: 3.2,
    hasAC: true,
    hasSmartLock: true,
    hasParking: true
  },
  {
    id: '3',
    name: 'Downtown Studio',
    location: 'Riyadh, Olaya',
    pricePerNight: 350,
    rooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.2,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    type: PropertyType.STUDIO,
    amenities: ['High Speed Wi-Fi', 'Work Desk', 'Coffee Machine'],
    description: 'Cozy studio in the heart of the business district. Walking distance to major corporate HQs.',
    distance: 0.8,
    hasAC: true,
    hasSmartLock: true,
    hasParking: false
  },
  {
    id: '4',
    name: 'The Loft Retreat',
    location: 'Abha, Al Soudah',
    pricePerNight: 800,
    rooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.9,
    imageUrl: 'https://picsum.photos/800/600?random=4',
    type: PropertyType.LOFT,
    amenities: ['Fireplace', 'Mountain View', 'Hiking Trails'],
    description: 'Scenic mountain retreat with cool weather year-round. Features a cozy fireplace and panoramic views.',
    distance: 25,
    hasAC: false, // Cool weather
    hasSmartLock: true,
    hasParking: true
  },
];

export const TASKS: OperationalTask[] = [
  {
    id: 't1',
    propertyId: '1',
    propertyName: 'Royal Palms Villa',
    type: 'Cleaning',
    status: 'Pending',
    date: '2023-10-25',
    assignee: 'Team A',
  },
  {
    id: 't2',
    propertyId: '2',
    propertyName: 'Skyline View Apartment',
    type: 'Turnover',
    status: 'In Progress',
    date: '2023-10-25',
    assignee: 'Team B',
  },
  {
    id: 't3',
    propertyId: '1',
    propertyName: 'Royal Palms Villa',
    type: 'Restocking',
    status: 'Completed',
    date: '2023-10-24',
    assignee: 'Logistics',
  },
  {
    id: 't4',
    propertyId: '3',
    propertyName: 'Downtown Studio',
    type: 'Maintenance',
    status: 'Pending',
    date: '2023-10-26',
    assignee: 'Tech Support',
  },
];

export const REVENUE_DATA: ChartData[] = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
  { name: 'Jul', value: 72000 },
];

export const OCCUPANCY_DATA: ChartData[] = [
  { name: 'Week 1', value: 65, uv: 10 },
  { name: 'Week 2', value: 59, uv: 12 },
  { name: 'Week 3', value: 80, uv: 8 },
  { name: 'Week 4', value: 81, uv: 5 },
];

export const SEASONAL_HEATMAP_DATA = [
  { name: 'Winter', value: 85 },
  { name: 'Spring', value: 60 },
  { name: 'Summer', value: 40 }, // Lower in Riyadh/Jeddah usually, higher in Abha
  { name: 'Autumn', value: 75 },
];
