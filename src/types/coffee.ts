export interface ProductItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  buttonLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  imageDescription: string;
  notes: string[];
  roastLevel: 'Medium' | 'Medium-Dark' | 'Dark Espresso' | 'Golden Reserve';
  origin: string;
  caffeine: string;
}

export interface CustomizationOptions {
  milk: 'Whole Milk' | 'Oat Milk (+ $0.75)' | 'Almond Milk (+ $0.75)' | 'Macadamia Milk (+ $1.00)' | 'None';
  temperature: 'Steaming Hot (68°C)' | 'Iced Crema (Over Crystal Ice)';
  sweetness: 'Unsweetened (0%)' | 'Subtle Golden Crema (25%)' | 'Caramel Silk (50%)';
  extraShot: boolean;
}

export interface CartItem {
  cartId: string;
  product: ProductItem;
  quantity: number;
  customization: CustomizationOptions;
  unitPrice: number;
}
