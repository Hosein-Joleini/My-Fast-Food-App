import { HiOutlineShoppingBag } from 'react-icons/hi2';

export default function EmptyCart() {
  return (
    <div className='flex flex-col items-center h-80 justify-center'>
      <HiOutlineShoppingBag className='text-gray-300 size-40 stroke-1' />
      <p className='text-xl font-gray-300 font-light'>Your cart is empty.</p>
    </div>
  );
}
