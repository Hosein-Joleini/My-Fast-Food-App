import { useState } from 'react';
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { formatCurrency, isValidPhone } from '../../utils/helper';
import store, { useAppDispatch, useAppSelector } from '../../store';
import {
  clearCart,
  getCartItems,
  getTotalPriceCartItems,
} from '../cart/cartSlice';
import { type OrderType } from '../../../types/global';
import { createOrder } from '../../services/apiRestaurant';
import { fetchAddress } from '../user/userSlice';

type ErrorsType = {
  phone: string | null;
};

export default function CreateOrder() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [isPriority, setIsPriority] = useState<boolean>(false);
  const errors = useActionData() as ErrorsType;

  const totalCartPrice = useAppSelector(getTotalPriceCartItems);
  const totalPrice = isPriority
    ? totalCartPrice + 0.2 * totalCartPrice
    : totalCartPrice;

  const cartItems = useAppSelector(getCartItems);

  const {
    status: positionStatus,
    address,
    position,
    error,
  } = useAppSelector((state) => state.user);

  const submitting = navigation.state === 'submitting';

  return (
    <main className='mx-auto max-w-3xl py-8 px-6 sm:px-6'>
      <h2 className='text-xl lg:text-2xl font-semibold mb-10'>
        Ready to order? Let's go!
      </h2>
      <Form method='post'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-8 text-gray-600 text-base font-normal'>
          <label htmlFor='name' className='sm:basis-40'>
            Full Name
          </label>
          <input
            type='text'
            id='name'
            name='customer'
            required
            className='rounded-full border border-gray-300 p-2 sm:text-base outline-none text-gray-700 focus:ring focus:ring-gray-500 ring-offset-2 transition-all duration-500 grow text-sm'
          />
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-8 text-gray-600 text-base font-normal'>
          <label htmlFor='phone' className='sm:basis-40'>
            Phone number
          </label>
          <div className='grow'>
            <input
              type='text'
              id='phone'
              name='phone'
              required
              className='w-full rounded-full border border-gray-300 p-2 sm:text-base outline-none text-gray-700 focus:ring focus:ring-gray-500 ring-offset-2 transition-all duration-500 text-sm'
            />
            {errors && errors?.phone && (
              <p className='bg-red-100 text-red-500 rounded-md p-2 text-xs'>
                {errors?.phone}
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-8 text-gray-600 text-base font-normal relative'>
          <label htmlFor='address' className='sm:basis-40'>
            Address
          </label>
          <input
            type='text'
            id='address'
            name='address'
            defaultValue={address}
            required
            className='grow rounded-full border border-gray-300 p-2 sm:text-base outline-none text-gray-700 focus:ring focus:ring-gray-500 ring-offset-2 transition-all duration-500 text-sm'
          />
          {positionStatus === 'error' && (
            <p className='bg-red-100 text-red-500 rounded-md p-2 text-xs'>
              {error}
            </p>
          )}
          {!position.latitude &&
            !position.longitude &&
            positionStatus !== 'error' && (
              <button
                type='button'
                disabled={positionStatus === 'loading'}
                className='absolute right-[3px] bottom-[3px] sm:right-[5px] sm:bottom-[5px] custom-btn rounded-full text-xs flex items-center'
                onClick={() => dispatch(fetchAddress())}
              >
                Get position
              </button>
            )}
        </div>

        <div className='text-base sm:text-lg font-medium text-gray-600 flex items-center gap-8 mb-12'>
          <input
            type='checkbox'
            id='priority'
            name='priority'
            onChange={(event) => setIsPriority(event.target.checked)}
            className='h-6 w-6 accent-gray-400 focus:outline-none focus:ring focus:ring-gray-400 focus:ring-offset-2'
          />
          <label htmlFor='priority'>
            Do you want give your order priority?
          </label>
        </div>

        {cartItems.length === 0 ? (
          <Link to='/menu' className='custom-btn rounded-full text-base'>
            Back to menu
          </Link>
        ) : (
          <button
            type='submit'
            disabled={submitting || positionStatus === 'loading'}
            className='custom-btn rounded-full text-base'
          >
            {submitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </button>
        )}

        <input type='hidden' name='cart' value={JSON.stringify(cartItems)} />
        <input type='hidden' name='position' value={JSON.stringify(position)} />
      </Form>
    </main>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === 'on' ? true : false,
    position: JSON.parse(data.position as string),
  } as OrderType;

  const errors = {} as ErrorsType;

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please give us a correct phone number, maybe need to contact with you';
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder[0].id}`);
}
