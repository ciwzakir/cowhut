import {
  ICattleBreeds,
  ICowCategory,
  ILocationOfCow,
  ISalesLabel,
} from './cow.interface.';

export const cowLocations: ILocationOfCow[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const CowBreeds: ICattleBreeds[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const CowCategories: ICowCategory[] = ['Dairy', 'Beef', 'DualPurpose'];
export const CowSalesLabels: ISalesLabel[] = ['for sale', 'sold out'];

// Pagination Search and Filters

export const cowSearchableFields = ['id', 'name', 'age', 'price'];

export const cowsFilterableFields = ['searchTerm', 'location'];
