import { ROUTE_LIST, ROUTES } from '@constants/routes';
import { Layout } from '@pages/Layout/Layout';
import { Route, Routes } from 'react-router-dom';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path={ROUTES.CATEGORIES} element={<Layout />}>
        {ROUTE_LIST.map(({ path, component: Component }) => (
          <Route
            key={path}
            index={path === ROUTES.CATEGORIES}
            path={path === ROUTES.CATEGORIES ? undefined : path}
            element={<Component />}
          />
        ))}
      </Route>
    </Routes>
  );
};
