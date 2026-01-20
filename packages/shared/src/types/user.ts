/**
 * User domain types
 * @module @vintedge/shared/types/user
 */

export type UserRole = 'customer' | 'admin' | 'support' | 'production';

export type AuthProvider = 'email' | 'google' | 'facebook' | 'apple';

export type SupportedLanguage = 'en' | 'es' | 'pt' | 'hi' | 'ja';

export type SupportedCountry =
  | 'CA'
  | 'US'
  | 'MX'
  | 'CO'
  | 'BR'
  | 'CL'
  | 'AR'
  | 'GB'
  | 'NL'
  | 'IN'
  | 'JP';

export interface UserPreferences {
  language: SupportedLanguage;
  country: SupportedCountry;
  currency: 'USD';
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  emailVerified: boolean;
  displayName: string | null;
  photoUrl: string | null;
  phoneNumber: string | null;
  role: UserRole;
  authProvider: AuthProvider;
  preferences: UserPreferences;
  ageVerified: boolean;
  ageVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
  isActive: boolean;
}

export interface CreateUserInput {
  firebaseUid: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  authProvider: AuthProvider;
  preferences: Partial<UserPreferences>;
}

export interface UpdateUserInput {
  displayName?: string;
  photoUrl?: string;
  phoneNumber?: string;
  preferences?: Partial<UserPreferences>;
}

export interface UserAddress {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: SupportedCountry;
  phoneNumber: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
