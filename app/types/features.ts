// Based on features.js
export type FeatureCategory = "main" | "special" | "benefit" | "workflow";

export interface Feature {
  title: string;
  description: string;
  icon?: string; // Optional
  category: FeatureCategory;
  order?: number; // Optional
}
