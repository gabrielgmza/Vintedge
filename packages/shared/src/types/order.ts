/**
 * Order and Payment domain types
 * @module @vintedge/shared/types/order
 */

import type { SupportedCountry } from './user';
import type { WineCustomization, PricingBreakdown } from './customization';

// ============================================
// ORDER STATUS
// ============================================

export type OrderStatus =
  | 'pending_payment'
  | 'payment_failed'
  | 'paid'
  | 'processing'
  | 'in_production'
  | 'quality_check'
  | 'ready_to_ship'
  | 'shipped'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type PaymentMethod =
  | 'card'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'
  | 'bank_transfer';

// ============================================
// ORDER ITEMS
// ============================================

export interface OrderItem {
  id: string;
  orderId: string;
  customizationId: string;
  customization: WineCustomization;
  quantity: number;
  unitPrice: number; // cents
  totalPrice: number; // cents
  pricingBreakdown: PricingBreakdown;
  productionStatus: ProductionStatus;
  createdAt: Date;
}

export type ProductionStatus =
  | 'pending'
  | 'label_printing'
  | 'bottling'
  | 'corking'
  | 'labeling'
  | 'packaging'
  | 'quality_check'
  | 'ready';

// ============================================
// SHIPPING
// ============================================

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: SupportedCountry;
  phoneNumber: string;
  deliveryInstructions?: string;
}

export type ShippingMethod = 'standard' | 'express' | 'overnight';

export interface ShippingInfo {
  address: ShippingAddress;
  method: ShippingMethod;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  shippingCost: number; // cents
  isGift: boolean;
  giftMessage?: string;
  giftRecipientEmail?: string;
}

// ============================================
// PAYMENT
// ============================================

export interface PaymentInfo {
  stripePaymentIntentId: string;
  stripeCustomerId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number; // cents
  currency: 'usd';
  cardLast4?: string;
  cardBrand?: string;
  receiptUrl?: string;
  failureReason?: string;
  refundedAmount?: number;
  paidAt?: Date;
}

// ============================================
// ORDER
// ============================================

export interface Order {
  id: string;
  orderNumber: string; // human-readable, e.g., VTG-2024-001234
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  subtotal: number; // cents
  shippingCost: number; // cents
  taxAmount: number; // cents
  discountAmount: number; // cents
  totalAmount: number; // cents
  promoCode?: string;
  notes?: string;
  internalNotes?: string; // admin only
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
}

// ============================================
// ORDER CREATION
// ============================================

export interface CreateOrderInput {
  items: {
    customizationId: string;
    quantity: number;
  }[];
  shippingAddressId?: string;
  shippingAddress?: ShippingAddress;
  shippingMethod: ShippingMethod;
  isGift?: boolean;
  giftMessage?: string;
  giftRecipientEmail?: string;
  promoCode?: string;
  notes?: string;
}

// ============================================
// ORDER EVENTS (AUDIT LOG)
// ============================================

export type OrderEventType =
  | 'created'
  | 'payment_initiated'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'status_changed'
  | 'production_started'
  | 'production_completed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refund_initiated'
  | 'refund_completed'
  | 'note_added';

export interface OrderEvent {
  id: string;
  orderId: string;
  type: OrderEventType;
  previousStatus?: OrderStatus;
  newStatus?: OrderStatus;
  metadata: Record<string, unknown>;
  performedBy: string; // userId or 'system'
  performedByRole: 'customer' | 'admin' | 'system';
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// ============================================
// CART
// ============================================

export interface CartItem {
  id: string;
  customizationId: string;
  customization: WineCustomization;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  updatedAt: Date;
}

// ============================================
// INVOICING
// ============================================

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  userId: string;
  billingAddress: ShippingAddress;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
  currency: 'usd';
  status: 'draft' | 'issued' | 'paid' | 'void';
  pdfUrl?: string;
  issuedAt: Date;
  dueAt: Date;
  paidAt?: Date;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
