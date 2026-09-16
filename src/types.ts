export type ServiceCategory = 'kiloan' | 'satuan' | 'shoes_bags' | 'express';

export interface LaundryService {
  id: string;
  name: string;
  category: ServiceCategory;
  pricePerUnit: number;
  unitLabel: string;
  turnaroundHours: number;
  description: string;
  badge?: string;
  popular?: boolean;
  features: string[];
}

export interface LaundryPartner {
  id: string;
  name: string;
  area: string;
  rating: number;
  completedOrders: number;
  distanceKm: number;
  verified: boolean;
  specialty: string;
  avatarUrl?: string;
}

export type OrderStepStatus = 'driver_assigned' | 'weighed_picked' | 'washing' | 'drying_ironing' | 'delivering' | 'completed';

export interface TrackingStep {
  step: OrderStepStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface SimulatedOrder {
  orderId: string;
  customerName: string;
  serviceName: string;
  weightKg: number;
  scent: string;
  partnerName: string;
  driverName: string;
  driverPhone: string;
  pickupAddress: string;
  totalPrice: number;
  estimatedDelivery: string;
  steps: TrackingStep[];
}

export interface PRDSection {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  content: string;
  bulletPoints?: string[];
  tables?: {
    headers: string[];
    rows: string[][];
  };
}
