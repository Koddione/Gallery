import { Category } from '@pages/Category/Category';
import { Favourites } from '@pages/Favourites/Favourites';
import { Images } from '@pages/Images/Images';
import { Layout } from '@pages/Layout/Layout';
import { NotFound } from '@pages/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Category />} />
        <Route path="/images" element={<Images />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
