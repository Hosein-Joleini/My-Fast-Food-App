import { type ReactNode } from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

export default function Error() {
  const error = useRouteError() as Error & { data: string };
  const navigate = useNavigate();

  let content: ReactNode;

  if (isRouteErrorResponse(error)) {
    content = (
      <p className='bg-red-100 p-2 text-lg text-red-700'>
        {error.data || error.message}
      </p>
    );
  }

  content = (
    <p className='bg-red-100 p-2 text-lg text-red-700'>
      {error?.data || error.message}
    </p>
  );

  return (
    <div className='h-dvh flex items-center justify-center'>
      <div className='text-center space-y-2'>
        <h1 className='text-xl font-medium'>Something went wrong</h1>
        {content}
        <button onClick={() => navigate(-1)} className='text-lg text-sky-400'>
          &larr; Go back
        </button>
      </div>
    </div>
  );
}
