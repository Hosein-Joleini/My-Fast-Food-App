import { useAppSelector } from '../../store';

import { HiOutlineShoppingCart } from 'react-icons/hi2';

import { getTotalPriceCartItems, getTotalQuantityCartItems } from './cartSlice';

import { formatCurrency } from '../../utils/helper';

type CartOverviewProps = {
  onClick?: () => void;
};

export default function CartOverview({ onClick }: CartOverviewProps) {
  const totalQuantity = useAppSelector(getTotalQuantityCartItems);
  const totalPrice = useAppSelector(getTotalPriceCartItems);

  return (
    <button
      onClick={() => onClick?.()}
      className='flex w-full items-center justify-between bg-slate-600 sm:px-6 px-4 py-1.5 fixed bottom-0 left-0 right-[6px] text-gray-50 z-40'
    >
      <p className='text-lg uppercase flex items-center gap-2'>
        <span>
          <HiOutlineShoppingCart className='size-6 text-gray-50' />
        </span>
        <span>Cart ({totalQuantity})</span>
      </p>
      <p className='text-lg bg-gray-500 px-2 py-1 rounded-full font-semibold'>
        {formatCurrency(totalPrice)}
      </p>
    </button>
  );
}
