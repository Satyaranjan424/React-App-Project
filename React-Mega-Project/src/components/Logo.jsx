import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <svg
        viewBox="0 0 200 60"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Background Shape */}
        <rect
          x="0"
          y="0"
          width="200"
          height="60"
          rx="12"
          fill="#374151"   // gray-700 for contrast
        />

        {/* Text SRD */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="28"
          fontWeight="600"
          fill="#ffffff"
          letterSpacing="4"
          fontFamily="Arial, sans-serif"
        >
          SRD
        </text>
      </svg>
    </div>
  );
}

export default Logo;