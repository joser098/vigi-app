const Location = ({currentColor}: {currentColor: string}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.75 31.375C1.625 18.25 0 16.875 0 12C0 5.375 5.3125 0 12 0C18.625 0 24 5.375 24 12C24 16.875 22.3125 18.25 13.1875 31.375C12.625 32.25 11.3125 32.25 10.75 31.375ZM12 17C14.75 17 17 14.8125 17 12C17 9.25 14.75 7 12 7C9.1875 7 7 9.25 7 12C7 14.8125 9.1875 17 12 17Z"
        fill={currentColor}
      />
    </svg>
  );
};

export default Location;
