import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppTemplate from '@/components/templates/App.template.tsx';
import HomeView from '@/views/Home.view.tsx';
import CalculatorView from '@/views/Calculator.view.tsx';
import HistoryView from '@/views/History.view.tsx';
import NotFoundView from '@/views/NotFound.view.tsx';
import MainTemplate from '@/components/templates/Main.template.tsx';
import AuthenticationView from '@/views/Authentication.view.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainTemplate />,
    children: [
      {
        path: '/',
        element: <AuthenticationView />,
      },
      {
        path: 'app',
        element: <AppTemplate />,
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
            path: 'calculator/:id',
            element: <CalculatorView />,
          },
          {
            path: 'calculator/:uid/:id',
            element: <CalculatorView />,
          },
          {
            path: 'history',
            element: <HistoryView />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundView />,
      },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
