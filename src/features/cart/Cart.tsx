import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';

import DeleteCartItems from './DeleteCartItems';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

import {
  getCartItems,
  getTotalPriceCartItems,
  getTotalQuantityCartItems,
} from './cartSlice';
import { formatCurrency } from '../../utils/helper';

export default function Cart() {
  const cartItems = useAppSelector(getCartItems);
  const totalPrice = useAppSelector(getTotalPriceCartItems);
  const totalQuantity = useAppSelector(getTotalQuantityCartItems);

  return (
    <aside className='bg-gray-50 sticky top-5'>
      <div className='shadow shadow-black/25 rounded-sm h-dvh lg:h-auto'>
        <header className='flex items-center justify-between py-2 px-3 border-b-2 border-gray-300'>
          <h2 className='uppercase font-semibold'>Cart ({totalQuantity})</h2>
        </header>
        {totalQuantity === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <ul className='overflow-y-auto divide-y divide-gray-200 px-3 py-2 h-60 flex flex-col border-b border-gray-300'>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  name={item.name!}
                  unitPrice={item.unitPrice!}
                  quantity={item.quantity}
                  id={item.id}
                />
              ))}
            </ul>
            <div className='flex items-center justify-between px-3 py-2 mt-4 mb-8'>
              <h3 className='font-semibold text-base'>Total Price</h3>
              <p className='font-semibold text-base'>
                {formatCurrency(totalPrice)}
              </p>
            </div>
            <div className='flex items-start justify-evenly p-2 pb-4'>
              <Link to='/order/new' className='custom-btn ring ring-gray-400'>
                Order food
              </Link>
              <DeleteCartItems />
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
