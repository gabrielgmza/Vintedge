/**
 * Customization domain types
 * @module @vintedge/shared/types/customization
 */

// ============================================
// BOTTLE CUSTOMIZATION
// ============================================

export type BottleShape = 'bordeaux' | 'burgundy' | 'alsace' | 'champagne' | 'port';

export type BottleColor = 'green' | 'amber' | 'clear' | 'blue' | 'black';

export type BottleCapacity = 375 | 750 | 1000 | 1500; // ml

export interface BottleCustomization {
  shape: BottleShape;
  color: BottleColor;
  capacity: BottleCapacity;
  priceModifier: number; // cents to add/subtract
}

// ============================================
// CORK/CLOSURE CUSTOMIZATION
// ============================================

export type CorkType = 'natural-premium' | 'natural-standard' | 'technical-diam' | 'screwcap' | 'glass-stopper';

export interface CorkCustomization {
  type: CorkType;
  engraving?: string; // max 20 chars
  priceModifier: number;
}

// ============================================
// CAPSULE CUSTOMIZATION
// ============================================

export type CapsuleType = 'tin-printed' | 'wax-seal' | 'custom-foil' | 'none';

export interface CapsuleCustomization {
  type: CapsuleType;
  color?: string; // hex color
  logoUrl?: string;
  priceModifier: number;
}

// ============================================
// LABEL DESIGN
// ============================================

export type LabelMaterial = 'paper-matte' | 'paper-glossy' | 'textured' | 'metallic' | 'transparent';

export type LabelShape = 'rectangle' | 'oval' | 'custom';

export interface LabelElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'ornament';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  opacity: number;
  properties: TextElementProps | ImageElementProps | ShapeElementProps;
}

export interface TextElementProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  color: string;
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;
}

export interface ImageElementProps {
  src: string;
  originalWidth: number;
  originalHeight: number;
  filters?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    sepia?: boolean;
    grayscale?: boolean;
  };
}

export interface ShapeElementProps {
  shapeType: 'rectangle' | 'circle' | 'line' | 'polygon';
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface LabelDesign {
  id: string;
  templateId: string | null;
  material: LabelMaterial;
  shape: LabelShape;
  width: number; // mm
  height: number; // mm
  backgroundColor: string;
  elements: LabelElement[];
  frontPreviewUrl: string | null;
  backPreviewUrl: string | null;
  priceModifier: number;
}

// ============================================
// PACKAGING
// ============================================

export type PackagingType =
  | 'cardboard-standard'
  | 'wood-walnut'
  | 'leather-italian'
  | 'museum-box'
  | 'collector-6'
  | 'collector-12';

export interface PackagingCustomization {
  type: PackagingType;
  engraving?: string;
  includeCertificate: boolean;
  includeStoryCard: boolean;
  giftWrapping: boolean;
  giftMessage?: string;
  priceModifier: number;
}

// ============================================
// FULL CUSTOMIZATION
// ============================================

export interface WineCustomization {
  id: string;
  userId: string;
  baseWineId: string;
  status: CustomizationStatus;
  bottle: BottleCustomization;
  cork: CorkCustomization;
  capsule: CapsuleCustomization;
  label: LabelDesign;
  packaging: PackagingCustomization;
  quantity: number;
  unitPrice: number; // calculated total per unit in cents
  totalPrice: number; // unitPrice * quantity
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  savedAt?: Date; // if saved as draft
}

export type CustomizationStatus = 'draft' | 'saved' | 'in-cart' | 'ordered' | 'in-production' | 'completed';

// ============================================
// PRICING CALCULATION
// ============================================

export interface PricingBreakdown {
  baseWinePrice: number;
  bottleModifier: number;
  corkModifier: number;
  capsuleModifier: number;
  labelModifier: number;
  packagingModifier: number;
  subtotal: number;
  quantity: number;
  volumeDiscount: number;
  promoDiscount: number;
  total: number;
}

export interface CalculatePriceInput {
  baseWineId: string;
  bottle: BottleCustomization;
  cork: CorkCustomization;
  capsule: CapsuleCustomization;
  label: Partial<LabelDesign>;
  packaging: PackagingCustomization;
  quantity: number;
  promoCode?: string;
}

// ============================================
// TEMPLATES
// ============================================

export type TemplateCategory =
  | 'wedding'
  | 'anniversary'
  | 'birthday'
  | 'corporate'
  | 'holiday'
  | 'classic'
  | 'modern'
  | 'artistic';

export interface LabelTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnailUrl: string;
  previewUrl: string;
  design: Omit<LabelDesign, 'id' | 'frontPreviewUrl' | 'backPreviewUrl'>;
  isPremium: boolean;
  usageCount: number;
  createdAt: Date;
}
