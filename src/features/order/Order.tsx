import { useFetcher, useLoaderData, type Params } from 'react-router-dom';
import { formatCurrency } from '../../utils/helper';
import UpdateOrder from './UpdateOrder';
import { getOrderById } from '../../services/apiRestaurant';
import {
  MenuItemType,
  type CartStateType,
  type LoadedOrderType,
} from '../../../types/global';
import OrderItem from './OrderItem';
import { useEffect } from 'react';

export default function Order() {
  const fetcher = useFetcher();
  const [order] = useLoaderData() as LoadedOrderType[];
  const cartInOrder = order && (order.cart as CartStateType[]);

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  const menu: MenuItemType[] =
    fetcher.state === 'idle' &&
    fetcher.data &&
    Object.values(fetcher.data).flat();

  const { totalOrderPrice } = order;
  const totalFoodPrice =
    totalOrderPrice && order.priority ? totalOrderPrice / 1.2 : totalOrderPrice;
  const priorityPrice =
    totalFoodPrice && order.priority ? totalFoodPrice * 0.2 : 0;

  return (
    <main className='mx-auto max-w-3xl py-8 px-6 sm:px-6'>
      <div className='flex items-center justify-between flex-wrap mb-8'>
        <h2 className='text-xl lg:text-2xl font-semibold'>
          Order #{order.id} status
        </h2>
        <div className='text-gray-50 uppercase text-sm flex items-center gap-2 font-medium'>
          {order.priority && (
            <span className='bg-red-500 py-1 px-2 rounded-full'>Priority</span>
          )}
          <span className='bg-green-500 py-1 px-2 rounded-full'>
            Preparing order
          </span>
        </div>
      </div>
      <div className='bg-stone-200 p-5 flex items-center justify-between flex-wrap gap-2 mb-8'>
        <p className='text-base font-medium'>
          Your order was registered at the time that you ordered, so it will be
          delivered for you as soon as it is prepared.
        </p>
      </div>
      <ul className='divide-y divide-stone-200 border-b border-t mb-8'>
        {cartInOrder?.map((item) => (
          <OrderItem
            key={item.id}
            {...item}
            ingredients={
              menu && menu.find((food) => food.id === item.id)?.ingredients
            }
          />
        ))}
      </ul>
      <div className='bg-stone-200 p-5 mb-8 space-y-2'>
        <p>Price food: {formatCurrency(totalFoodPrice!)}</p>
        {order.priority && (
          <p>Price priority: {formatCurrency(priorityPrice)}</p>
        )}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(totalOrderPrice!)}
        </p>
      </div>
      <div className='flex justify-end'>
        {!order.priority && <UpdateOrder />}
      </div>
    </main>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({
  params,
}: {
  params: Params;
}): Promise<LoadedOrderType[]> {
  const order = await getOrderById(params.orderId);

  return order;
}
