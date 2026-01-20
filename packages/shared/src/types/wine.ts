/**
 * Wine domain types
 * @module @vintedge/shared/types/wine
 */

export type WineType = 'red' | 'white' | 'rose' | 'sparkling' | 'dessert';

export type WineRegion =
  | 'rioja'
  | 'ribera-del-duero'
  | 'priorat'
  | 'rias-baixas'
  | 'bordeaux'
  | 'burgundy'
  | 'champagne'
  | 'tuscany'
  | 'napa-valley'
  | 'mendoza'
  | 'other';

export type WineClassification =
  | 'joven'
  | 'crianza'
  | 'reserva'
  | 'gran-reserva'
  | 'premium';

export type GrapeVariety =
  | 'tempranillo'
  | 'garnacha'
  | 'cabernet-sauvignon'
  | 'merlot'
  | 'pinot-noir'
  | 'chardonnay'
  | 'sauvignon-blanc'
  | 'albarino'
  | 'malbec'
  | 'other';

export interface WineCharacteristics {
  body: 1 | 2 | 3 | 4 | 5; // 1=light, 5=full
  sweetness: 1 | 2 | 3 | 4 | 5;
  acidity: 1 | 2 | 3 | 4 | 5;
  tannins: 1 | 2 | 3 | 4 | 5;
  alcohol: number; // percentage
}

export interface WineTastingNotes {
  aroma: string[];
  palate: string[];
  finish: string;
  pairingsSuggestions: string[];
}

export interface WineRatings {
  parker?: number;
  suckling?: number;
  penin?: number;
  internal: number;
}

export interface BaseWine {
  id: string;
  sku: string;
  name: string;
  type: WineType;
  region: WineRegion;
  classification: WineClassification;
  grapeVarieties: GrapeVariety[];
  vintage: number | null; // null for non-vintage
  characteristics: WineCharacteristics;
  tastingNotes: WineTastingNotes;
  ratings: WineRatings;
  basePrice: number; // USD cents
  imageUrls: string[];
  isAvailable: boolean;
  stockQuantity: number;
  customizationOptions: WineCustomizationOptions;
  createdAt: Date;
  updatedAt: Date;
}

export interface WineCustomizationOptions {
  allowLabelDesign: boolean;
  allowBottleSelection: boolean;
  allowCorkSelection: boolean;
  allowCapsuleSelection: boolean;
  allowPackaging: boolean;
  restrictedCountries: string[]; // ISO codes where this wine cannot be shipped
}

export interface WineSearchFilters {
  type?: WineType[];
  region?: WineRegion[];
  classification?: WineClassification[];
  grapeVariety?: GrapeVariety[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  vintage?: number[];
  inStock?: boolean;
}

export interface WineCatalogItem extends BaseWine {
  matchScore?: number; // 0-100, calculated based on user preferences
  isRecommended?: boolean;
  discountPercentage?: number;
}
