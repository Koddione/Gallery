type BottomArrowProps = {
  className?: string;
};

export const BottomArrow = ({ className }: BottomArrowProps) => {
  return (
    <svg
      className={className}
      width="20"
      height="11"
      viewBox="0 0 21 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.96844L2.06036 0L10.5 8.06312L18.9396 0L21 1.96844L10.5 12L0 1.96844Z"
        fill="currentColor"
      />
    </svg>
  );
};
