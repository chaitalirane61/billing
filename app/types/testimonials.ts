// Based on testimonials.js

export interface Testimonial {
  customer_name: string;
  business_name?: string;
  // review: string;
  rating: number;
  // video_url?: string;
  image_url?: string;
  address?: string; // Add this
  contact_no?: string; // Add this
}
