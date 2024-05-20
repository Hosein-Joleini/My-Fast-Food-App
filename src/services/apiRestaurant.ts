import { type GroupedMenuType, type OrderType } from '../../types/global';
import supabase from './supabase';

export async function getMenu() {
  const { data, error } = await supabase.from('menu').select('*');

  if (error) {
    throw new Error('Menu can not be loaded.');
  }

  const menu: GroupedMenuType = data.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = [];
    }

    acc[item.title].push(item);

    return acc;
  }, {});

  return menu;
}

export async function getOrderById(id: string | undefined) {
  const { data: order, error } = await supabase
    .from('order')
    .select('*')
    .eq('id', id);

  if (error || order.length === 0) {
    throw new Error(`Couldn't find order #${id}`);
  }

  return order;
}

export async function createOrder(order: OrderType) {
  const totalOrderPrice: number = order.cart.reduce((acc, item) => {
    if (order.priority) {
      return (
        acc +
        item.unitPrice! * item.quantity * 0.2 +
        item.unitPrice! * item.quantity
      );
    } else {
      return acc + item.quantity * item.unitPrice!;
    }
  }, 0);

  const { data, error } = await supabase
    .from('order')
    .insert({ ...order, totalOrderPrice })
    .select();

  if (error) {
    throw new Error('Order is not created.');
  }

  return data;
}

export async function updateOrderById(id: string | undefined) {
  const { error } = await supabase
    .from('order')
    .update({ priority: true })
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(`Couldn't update the order`);
  }

  return null;
}
