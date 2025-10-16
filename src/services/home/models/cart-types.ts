// src/services/home/models/product.ts

export type ISODateString = string;

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number; // 0–5
  comment: string;
  date: ISODateString;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: ISODateString;
  updatedAt: ISODateString;
  barcode: string;
  qrCode: string; // URL or data URI
}

export type AvailabilityStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;            // e.g., "beauty"
  price: number;               // e.g., 9.99
  discountPercentage: number;  // e.g., 10.48
  rating: number;              // 0–5
  stock: number;               // e.g., 99
  tags: string[];              // ["beauty","mascara"]
  brand: string;               // "Essence"
  sku: string;                 // "BEA-ESS-ESS-001"
  weight: number;              // grams
  dimensions: ProductDimensions;
  warrantyInformation: string; // "1 week warranty"
  shippingInformation: string; // "Ships in 3-5 business days"
  availabilityStatus: AvailabilityStatus;
  reviews: ProductReview[];
  returnPolicy: string;        // "No return policy"
  minimumOrderQuantity: number;// 48
  meta: ProductMeta;
  images: string[];            // URLs
  thumbnail: string;           // URL
}

export interface RequestParams {
  limit?: number; // default 5
  skip?: number;  // default 0
}

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
