import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
  const [searchOrder, setSearchOrder] = useState<string>('');

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    navigate(`/order/${searchOrder}`);
    setSearchOrder('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search order #'
        className='text-gray-700 outline-none px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border-1 border-slate-300 sm:text-md text-sm w-36 sm:w-64 sm:focus:w-72 transition-all duration-500 focus:ring-4 focus:ring-gray-500'
        value={searchOrder}
        onChange={(event) => setSearchOrder(event.target.value)}
      />
    </form>
  );
}
