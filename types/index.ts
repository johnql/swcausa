export type ServiceState = "MA" | "NH" | "RI" | "VT";
export type Gender = "Male" | "Female" | "Other";
export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  primaryPhone: string;
  email: string;
  gender: Gender;
  state: ServiceState;
  joinedAt: Date;
  convenerAssigned?: string | null;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  insuranceProvider?: string | null;
  insurancePolicyNumber?: string | null;
};

export type WellnessClass = {
  id: string;
  name: string;
  slug: string;
  origin: string;
  description: string;
  benefits: string[];
  imageUrl?: string | null;
  sessions?: ClassSession[];
};

export type ClassSession = {
  id: string;
  classId: string;
  dayOfWeek: string;
  time: string;
  location: string;
  state: ServiceState;
};

export type Product = {
  id: string;
  productName: string;
  skuId: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  inStock: boolean;
};

export type Order = {
  id: string;
  orderDate: Date;
  memberId: string;
  productId: string;
  quantity: number;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string | null;
};
