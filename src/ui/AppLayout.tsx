import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header.tsx';
import Loader from './Loader.tsx';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className='h-screen grid grid-rows-[auto_1fr]'>
      <Header />
      {isLoading && <Loader />}
      <div className='overflow-y-scroll scroll-smooth scroll-p-0 relative'>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
