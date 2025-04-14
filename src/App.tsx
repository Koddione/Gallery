import { Route, Routes } from 'react-router-dom';
import { Category } from './pages/Category/Category';
import { Favourites } from './pages/Favourites/Favourites';
import { Images } from './pages/Images/Images';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Category />} />
			<Route path="/images" element={<Images />} />
			<Route path="/favourites" element={<Favourites />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
