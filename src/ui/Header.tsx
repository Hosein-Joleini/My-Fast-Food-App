import { Link } from 'react-router-dom';

import SearchOrder from '../features/order/SearchOrder.tsx';

export default function Header() {
  return (
    <header className='p-3 sm:px-6 sm:py-3 flex justify-between items-center bg-gray-600'>
      <Link
        to='/'
        className='uppercase text-white text-base sm:text-2xl tracking-wide font-normal'
      >
        React Fast Food
      </Link>
      <SearchOrder />
    </header>
  );
}
