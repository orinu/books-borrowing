import React from 'react';

const Logo: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="logoTitle"
    role="img"
  >
    <title id="logoTitle">Open Book Logo</title>
    
    {/* Left Page */}
    <path
      d="M8 10 C8 10 12 10 20 10 C28 10 32 10 32 10 L32 30 C32 30 28 30 20 30 C12 30 8 30 8 30 Z"
      fill="#f5f5f5"
      stroke="#333"
      strokeWidth="2"
    />
    
    {/* Book Spine */}
    <path
      d="M20 10 L20 30"
      stroke="#333"
      strokeWidth="2"
    />
    
    {/* Page Lines - Left */}
    <path
      d="M12 15 L18 15 M12 20 L18 20 M12 25 L18 25"
      stroke="#666"
      strokeWidth="1"
    />
    
    {/* Page Lines - Right */}
    <path
      d="M22 15 L28 15 M22 20 L28 20 M22 25 L28 25"
      stroke="#666"
      strokeWidth="1"
    />
    
    {/* Book Shadow */}
    <path
      d="M8 30 C8 30 12 32 20 32 C28 32 32 30 32 30"
      fill="none"
      stroke="#333"
      strokeWidth="2"
    />
  </svg>
);

export default Logo;