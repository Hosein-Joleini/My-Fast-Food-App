import { type MenuCategoryIconTypeProps } from '../../../types/global';

import MenuCategoryIcon from './MenuCategoryIcon.tsx';

const MenuCategoryInformation: MenuCategoryIconTypeProps[] = [
  {
    iconSrc: '/french-fries.png',
    altIcon: 'Appetizer icon',
    iconTitle: 'Appetizer',
  },
  {
    iconSrc: '/sandwich.png',
    altIcon: 'Sandwich icon',
    iconTitle: 'Sandwich',
  },
  {
    iconSrc: '/hamburger.png',
    altIcon: 'Burger icon',
    iconTitle: 'Burger',
  },
  {
    iconSrc: '/spaghetti.png',
    altIcon: 'Pasta icon',
    iconTitle: 'Pasta',
  },
  {
    iconSrc: '/pizza.png',
    altIcon: 'Pizza icon',
    iconTitle: 'Pizza',
  },
  {
    iconSrc: '/soda.png',
    altIcon: 'Drink icon',
    iconTitle: 'Drink',
  },
];

export default function MenuCategory() {
  return (
    <nav className='sticky top-0 z-30 bg-gray-50 will-change-transform transform-gpu shadow shadow-stone-200'>
      <ul className='px-2 flex flex-nowrap gap-4 justify-between items-center overflow-x-scroll w-dvwminus sm:w-full'>
        {MenuCategoryInformation.map((info) => (
          <MenuCategoryIcon
            key={info.iconTitle}
            iconSrc={info.iconSrc}
            altIcon={info.altIcon}
            iconTitle={info.iconTitle}
          />
        ))}
      </ul>
    </nav>
  );
}
