import { ROUTES } from '@constants/routes';
import { Category } from '@pages/Category/Category';
import { Favourites } from '@pages/Favourites/Favourites';
import { Images } from '@pages/Images/Images';
import { Layout } from '@pages/Layout/Layout';
import { NotFound } from '@pages/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path={ROUTES.CATEGORIES} element={<Layout />}>
        <Route index element={<Category />} />
        <Route path={ROUTES.IMAGES} element={<Images />} />
        <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
        <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
