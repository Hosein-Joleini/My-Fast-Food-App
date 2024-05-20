import { formatCurrency } from '../../utils/helper';

type OrderItemProps = {
  quantity: number | null;
  name: string | null;
  unitPrice: number | null;
  ingredients: string[] | undefined | null;
};

export default function OrderItem({
  quantity,
  name,
  unitPrice,
  ingredients,
}: OrderItemProps) {
  return (
    <li className='py-2 flex items-center justify-between'>
      <p className='flex flex-col gap-1'>
        <span className='font-semibold'>
          {quantity} &times; {name}
        </span>
        {ingredients === null ? null : !ingredients ||
          ingredients.length === 0 ? (
          <span className='text-xs sm:text-sm text-gray-600 font-normal'>
            Loading...
          </span>
        ) : (
          <span className='text-xs sm:text-sm text-gray-600 font-normal'>
            {ingredients?.join('+ ')}
          </span>
        )}
      </p>
      <p className='font-semibold'>{formatCurrency(unitPrice!)}</p>
    </li>
  );
}
