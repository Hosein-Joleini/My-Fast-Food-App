import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <h1 className='text-center text-2xl sm:text-4xl mb-12 text-gray-700 font-medium font-sans'>
        The best pizza.
        <br />
        <span className='text-gray-500'>
          Step into a world of infinite wonder
        </span>
      </h1>
      <p className='mb-6 text-xl text-center'>
        Welcome to our fast food, order your chosen food
      </p>
      <Link
        className='bg-gray-600 text-xl sm:text-2xl text-white px-6 py-3 rounded-full hover:bg-gray-500 transition-colors duration-300'
        to='/menu'
      >
        Start Ordering
      </Link>
    </div>
  );
}
