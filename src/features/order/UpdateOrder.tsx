import { type Params, useFetcher } from 'react-router-dom';
import { updateOrderById } from '../../services/apiRestaurant';

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='put'>
      <button
        className='custom-btn rounded-full'
        disabled={fetcher.state === 'submitting' || fetcher.state === 'loading'}
      >
        Make priority
      </button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: { params: Params }) {
  await updateOrderById(params.orderId);

  return null;
}
