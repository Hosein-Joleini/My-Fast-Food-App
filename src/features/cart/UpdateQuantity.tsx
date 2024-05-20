import { useAppDispatch } from '../../store';
import { decreaseItemByQuantity, increaseItemByQuantity } from './cartSlice';

export default function UpdateQuantity({
  quantity,
  id,
}: {
  quantity: number;
  id: number;
}) {
  const dispatch = useAppDispatch();

  const btnClasses: string =
    'bg-transparent inline-block ring-1 ring-gray-400 rounded-full px-2 text-gray-700 text-2xl font-light transition-colors duration-300 outline-none hover:bg-gray-600 hover:text-gray-50';

  return (
    <div className='flex items-center gap-2'>
      <button
        className={btnClasses}
        onClick={() => dispatch(decreaseItemByQuantity(id))}
      >
        -
      </button>
      <span className='text-xl font-semibold'>{quantity}</span>
      <button
        className={btnClasses}
        onClick={() => dispatch(increaseItemByQuantity(id))}
      >
        +
      </button>
    </div>
  );
}
