import { type MenuItemType } from '../../../types/global';
import { useAppDispatch, useAppSelector } from '../../store';
import { formatCurrency } from '../../utils/helper';
import UpdateQuantity from '../cart/UpdateQuantity';
import { addItemToCart } from '../cart/cartSlice';

export default function MenuItem({
  soldOut,
  imageUrl,
  name,
  ingredients,
  unitPrice,
  id,
}: MenuItemType) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.cart.find((item) => item.id === id)
  );

  const btnClasses =
    'bg-transparent inline-block ring-1 ring-gray-400 rounded-full px-2 text-gray-700 text-2xl font-light transition-colors duration-300 outline-none hover:bg-gray-600 hover:text-gray-50';

  return (
    <li
      className={`border-2 border-gray-200 rounded-sm overflow-hidden flex flex-col gap-4 ${
        soldOut ? 'cursor-not-allowed' : ''
      }`}
    >
      <img
        src={imageUrl!}
        alt={name!}
        className={`w-full ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='p-2 flex-1 flex flex-col'>
        <h3 className='font-bold text-xl md:text-lg mb-3'>{name}</h3>
        <p className='text-sm text-gray-600 mb-4'>
          {ingredients && ingredients?.join(' + ')}
        </p>
        <div className='flex justify-between items-center mt-auto pb-3'>
          <p className='text-lg font-semibold'>{formatCurrency(unitPrice!)}</p>
          {!soldOut &&
            (cartItem ? (
              <UpdateQuantity id={id} quantity={cartItem.quantity} />
            ) : (
              <button
                className={btnClasses}
                onClick={() =>
                  dispatch(addItemToCart({ id, name, unitPrice, quantity: 1 }))
                }
              >
                +
              </button>
            ))}
          {soldOut && (
            <p className='text-gray-700 text-sm ring-1 ring-gray-400 rounded-full px-2 py-1'>
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
