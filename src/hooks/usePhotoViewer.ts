import { useState } from 'react';
import { UnsplashPhoto } from '../types/unsplashPhoto';

export const usePhotoViewer = (photos: UnsplashPhoto[]) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const openPhoto = (index: number) => {
		setSelectedIndex(index);
		setIsOpen(true);
	};

	const closePhoto = () => setIsOpen(false);

	const showPrev = () => {
		setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
	};

	const showNext = () => {
		setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
	};

	return {
		isOpen,
		selectedIndex,
		selectedPhoto: photos[selectedIndex],
		openPhoto,
		closePhoto,
		showPrev,
		showNext,
	};
};
