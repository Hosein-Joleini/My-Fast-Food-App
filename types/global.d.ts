import { Database } from './supabase';

export type MenuCategoryIconTypeProps = {
  iconSrc: string;
  altIcon: string;
  iconTitle: string;
};

export type MenuItemType = Database['public']['Tables']['menu']['Row'];

export type GroupedMenuType = { [category: string]: MenuItemType[] };

export type CartStateType = {
  id: number;
  name: string | null;
  unitPrice: number | null;
  quantity: number;
};

export type UserStateType = {
  address: string;
  position: {
    latitude: number;
    longitude: number;
  };
  status: 'idle' | 'loading' | 'error';
  error: string;
};

export type OrderType = {
  name: string;
  phone: string;
  address: string;
  position: {
    latitude: number;
    longitude: number;
  };
  priority: boolean;
  cart: CartStateType[];
};

export type LoadedOrderType = Database['public']['Tables']['order']['Row'];

export type CartOrderType =
  Database['public']['Tables']['order']['Row']['cart'];
