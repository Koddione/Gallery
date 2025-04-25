import { Category } from '@/pages/Category/Category';
import { Favourites } from '@/pages/Favourites/Favourites';
import { Images } from '@/pages/Images/Images';
import { NotFound } from '@/pages/NotFound/NotFound';

export const ROUTES = {
  CATEGORIES: '/',
  IMAGES: '/images',
  FAVOURITES: '/favourites',
  NOTFOUND: '/*',
};

export const ROUTE_LIST: {
  component: React.ComponentType<React.PropsWithChildren<object>>;
  path: string;
}[] = [
  { path: ROUTES.CATEGORIES, component: Category },
  { path: ROUTES.IMAGES, component: Images },
  { path: ROUTES.FAVOURITES, component: Favourites },
  { path: ROUTES.NOTFOUND, component: NotFound },
];
