import { lazy, Suspense } from 'react';
import {
  Outlet,
  RouteObject,
  useRoutes,
  BrowserRouter,
  useLocation,
  Navigate
} from 'react-router-dom';
import { useAuthState } from '../contexts/UserContext';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Header from '../shared/Header';

const Loading = () => (
  <p className='p-4 w-full h-full text-center'>Loading...</p>
);

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));

function Layout() {
  return (
    <div className='bg-slate-800 min-h-screen'>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuthState();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <RequireAuth>
              <IndexScreen />
            </RequireAuth>
          )
        },
        {
          path: '/signin',
          element: <SignIn />
        },
        {
          path: '/signup',
          element: <SignUp />
        },
        {
          path: '*',
          element: <Page404Screen />
        }
      ]
    }
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
