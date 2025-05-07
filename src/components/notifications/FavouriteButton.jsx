import React, { useState } from "react";

export default function FavouriteButton({ isfav = false }) {
  const [favourited, setFavourited] = useState(isfav);

  const toggleFavourite = () => {
    setFavourited((prev) => !prev);
  };
  return (
    <button onClick={toggleFavourite} aria-pressed={favourited}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        {favourited ? (
          <path
            d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
            fill="#FFB400"
          />
        ) : (
          <path
            d="M6.85 14.825L10 12.925L13.15 14.85L12.325 11.25L15.1 8.85L11.45 8.525L10 5.125L8.55 8.5L4.9 8.825L7.675 11.25L6.85 14.825ZM3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
            fill="#2E263D"
            fill-opacity="0.698039"
          />
        )}
      </svg>
    </button>
  );
}
