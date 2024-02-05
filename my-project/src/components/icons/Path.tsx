export const Path = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      className={className}
    >
      <clipPath id="path">
        <path
          d="M20 1H284C294.493 1 303 9.50659 303 20V143C303 153.493 294.493 162 284 162H259C233.595 162 213 182.595 213 208V233C213 243.493 204.493 252 194 252H20C9.50659 252 1 243.493 1 233V20C1 9.50659 9.50659 1 20 1Z"
          stroke="#FF8667"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </clipPath>
    </svg>
  );
};
