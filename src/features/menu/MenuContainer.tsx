import { useLoaderData, useLocation } from 'react-router-dom';
import { type GroupedMenuType } from '../../../types/global';
import { getMenu } from '../../services/apiRestaurant.ts';

import MenuCategory from './MenuCategory.tsx';
import MenuOverview from './MenuOverview.tsx';
import { useEffect } from 'react';

export default function MenuContainer() {
  const menu = useLoaderData() as GroupedMenuType;

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [location]);

  return (
    <section className='w-full px-1 xl:px-0 relative'>
      <h2 className='max-w-max uppercase text-sm md:text-base p-2 translate-y-[1px] font-semibold bg-gray-50 shadow shadow-black/25'>
        Fastfood menu
      </h2>
      <div className='shadow shadow-black/25 rounded-sm bg-gray-50 flex flex-col relative'>
        <MenuCategory />
        <MenuOverview menu={menu} />
      </div>
    </section>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader(): Promise<GroupedMenuType> {
  const menu = await getMenu();

  return menu;
}
