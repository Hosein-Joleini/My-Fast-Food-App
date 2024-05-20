import UpdateQuantity from './UpdateQuantity';

import { formatCurrency } from '../../utils/helper';

export default function CartItem({
  name,
  unitPrice,
  quantity,
  id,
}: {
  name: string;
  unitPrice: number;
  quantity: number;
  id: number;
}) {
  return (
    <li className='flex items-center justify-between py-2'>
      <div className='space-y-1'>
        <h3 className='text-base font-semibold'>
          {quantity} &times; {name}
        </h3>
        <p className='text-base font-normal'>{formatCurrency(unitPrice)}</p>
      </div>
      <UpdateQuantity quantity={quantity} id={id} />
    </li>
  );
}
