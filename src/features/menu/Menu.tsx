import { useAppSelector } from '../../store.ts';
import Modal from '../../ui/Modal.tsx';
import Cart from '../cart/Cart.tsx';
import CartOverview from '../cart/CartOverview.tsx';
import { getTotalQuantityCartItems } from '../cart/cartSlice.ts';
import Hero from './Hero.tsx';
import MenuContainer from './MenuContainer.tsx';

export default function Menu() {
  const totalQuantity = useAppSelector(getTotalQuantityCartItems);

  return (
    <>
      <Hero />
      <main className='mx-auto mt-12 max-w-7xl grid grid-rows-[1fr-auto] lg:grid-cols-[2fr_1fr] lg:gap-8 xl:gap-12 sm:px-8 xl:px-0 mb-16'>
        <MenuContainer />
        <div className='lg:hidden'>
          <Modal>
            <Modal.Open openNameWindow='cart'>
              {totalQuantity && <CartOverview />}
            </Modal.Open>
            <Modal.Window windowName='cart'>
              <Cart />
            </Modal.Window>
          </Modal>
        </div>
        <div className='hidden lg:block'>
          <Cart />
        </div>
      </main>
    </>
  );
}
