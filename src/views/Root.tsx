import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import MainTemplate from '@/components/templates/Main.template.tsx';
const AppTemplate = lazy(() => import('@/components/templates/App.template.tsx'));
const HomeView = lazy(() => import('@/views/Home.view.tsx'));
const CalculatorView = lazy(() => import('@/views/Calculator.view.tsx'));
const HistoryView = lazy(() => import('@/views/History.view.tsx'));
const NotFoundView = lazy(() => import('@/views/NotFound.view.tsx'));
const AuthenticationView = lazy(() => import('@/views/Authentication.view.tsx'));
import { AlertProvider } from '@/hooks/useAlert';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AlertProvider>
        <MainTemplate />
      </AlertProvider>
    ),
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
