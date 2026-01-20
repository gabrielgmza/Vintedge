/**
 * API Response types
 * @module @vintedge/shared/types/api
 */

// ============================================
// STANDARD API RESPONSES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  requestId: string;
}

export interface ApiError {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    details?: Record<string, unknown>;
    field?: string; // for validation errors
  };
  timestamp: string;
  requestId: string;
}

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'PAYMENT_ERROR'
  | 'STRIPE_ERROR'
  | 'INTERNAL_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'BAD_REQUEST'
  | 'COUNTRY_RESTRICTED'
  | 'AGE_VERIFICATION_REQUIRED'
  | 'STOCK_UNAVAILABLE';

// ============================================
// PAGINATION
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ============================================
// FILTERING
// ============================================

export interface FilterParams {
  search?: string;
  filters?: Record<string, string | string[] | number | boolean>;
  dateFrom?: string;
  dateTo?: string;
}

// ============================================
// HEALTH CHECK
// ============================================

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  timestamp: string;
  services: {
    database: ServiceHealth;
    firestore: ServiceHealth;
    redis: ServiceHealth;
    stripe: ServiceHealth;
  };
}

export interface ServiceHealth {
  status: 'up' | 'down' | 'degraded';
  latency?: number; // ms
  message?: string;
}

// ============================================
// WEBHOOK TYPES
// ============================================

export interface WebhookEvent<T = unknown> {
  id: string;
  type: string;
  data: T;
  createdAt: string;
  livemode: boolean;
}

export interface StripeWebhookPayload {
  id: string;
  object: string;
  type: string;
  data: {
    object: Record<string, unknown>;
    previous_attributes?: Record<string, unknown>;
  };
  created: number;
  livemode: boolean;
}

// ============================================
// FILE UPLOAD
// ============================================

export interface UploadResponse {
  fileId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

export interface UploadConfig {
  maxSizeBytes: number;
  allowedMimeTypes: string[];
  bucket: string;
}
