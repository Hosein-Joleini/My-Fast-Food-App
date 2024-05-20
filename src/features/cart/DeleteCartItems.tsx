import { useAppDispatch } from '../../store';
import { clearCart } from './cartSlice';

export default function DeleteCartItems() {
  const dispatch = useAppDispatch();

  return (
    <button
      className='custom-btn bg-transparent text-gray-700 ring ring-gray-400 hover:text-gray-50 hover:bg-gray-400'
      onClick={() => dispatch(clearCart())}
    >
      Clear cart
    </button>
  );
}
