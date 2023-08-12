import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainTemplate from '../components/templates/main.template.tsx';
import HomeView from './Home.view.tsx';
import CalculatorView from './Calculator.view.tsx';
import HistoryView from './History.view.tsx';
import NotFoundView from './NotFound.view.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainTemplate />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'calculator',
        element: <CalculatorView />,
      },
      {
        path: 'history',
        element: <HistoryView />,
      },
      {
        path: '*',
        element: <NotFoundView />,
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
