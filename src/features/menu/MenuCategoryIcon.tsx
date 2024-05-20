import { NavLink, useLocation } from 'react-router-dom';

import { MenuCategoryIconTypeProps } from '../../../types/global';

export default function MenuCategoryIcon({
  iconSrc,
  altIcon,
  iconTitle,
}: MenuCategoryIconTypeProps) {
  const location = useLocation();

  return (
    <li>
      <NavLink
        to={`#${iconTitle.toLowerCase()}`}
        className={`px-2 pt-4 flex flex-col items-center gap-2 ${
          location.hash === `#${iconTitle.toLowerCase()}`
            ? 'after:content[] after:w-full after:block after:h-1 after:bg-gray-500'
            : ''
        } transition-all duration-300`}
      >
        <img src={iconSrc} alt={altIcon} className='w-8 h-8 sm:w-10 sm:h-10' />
        <span className='sm:text-base text-base font-normal text-gray-800'>
          {iconTitle}
        </span>
      </NavLink>
    </li>
  );
}

//
