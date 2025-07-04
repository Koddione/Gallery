interface FavouritesLogoProps {
  filled: boolean;
}

export const FavouritesLogo = ({ filled }: FavouritesLogoProps) => {
  return (
    <svg
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.25 19L8.125 15L1 19V3C1 2.46957 1.21448 1.96086 1.59625 1.58579C1.97802 1.21071 2.49581 1 3.03571 1H13.2143C13.7542 1 14.272 1.21071 14.6538 1.58579C15.0355 1.96086 15.25 2.46957 15.25 3V19Z"
        stroke="currentColor"
        fill={filled ? 'currentColor' : 'none'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
