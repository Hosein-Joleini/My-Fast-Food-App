import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppLayout from './ui/AppLayout.tsx';
import Home from './ui/Home.tsx';
import Menu from './features/menu/Menu.tsx';
import Error from './ui/Error.tsx';
import Order, { loader as orderLoader } from './features/order/Order.tsx';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder.tsx';

import { loader as menuLoader } from './features/menu/MenuContainer.tsx';
import { action as updatePriorityAction } from './features/order/UpdateOrder.tsx';

import store from './store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: updatePriorityAction,
        errorElement: <Error />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
