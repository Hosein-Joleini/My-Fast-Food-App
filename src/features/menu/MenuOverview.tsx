import { Fragment } from 'react/jsx-runtime';
import { GroupedMenuType, type MenuItemType } from '../../../types/global';

import MenuItem from './MenuItem';

export default function MenuOverview({ menu }: { menu: GroupedMenuType }) {
  return (
    <section>
      {Object.entries(menu).map(([title, items]: [string, MenuItemType[]]) => (
        <Fragment key={title}>
          <h2
            id={title}
            className='text-xl font-semibold text-gray-600 my-12 mb-4 pl-4 uppercase tracking-wide'
          >
            {title}
          </h2>
          <ul className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-4 p-2'>
            {items.map((item: MenuItemType) => (
              <MenuItem key={item.id} {...item} />
            ))}
          </ul>
        </Fragment>
      ))}
    </section>
  );
}
