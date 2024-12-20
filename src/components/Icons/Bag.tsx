const Bag = ({currentColor}: {currentColor: string}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 7C7 3.1875 10.125 0 14 0C17.8125 0 21 3.1875 21 7V10H25C26.625 10 28 11.375 28 13V26C28 29.3125 25.3125 32 22 32H6C2.625 32 0 29.3125 0 26V13C0 11.375 1.3125 10 3 10H7V7ZM10 10H18V7C18 4.8125 16.1875 3 14 3C11.75 3 10 4.8125 10 7V10ZM8.5 16C9.3125 16 10 15.375 10 14.5C10 13.6875 9.3125 13 8.5 13C7.625 13 7 13.6875 7 14.5C7 15.375 7.625 16 8.5 16ZM19.5 13C18.625 13 18 13.6875 18 14.5C18 15.375 18.625 16 19.5 16C20.3125 16 21 15.375 21 14.5C21 13.6875 20.3125 13 19.5 13Z"
        fill={currentColor}
      />
    </svg>
  );
};

export default Bag;
