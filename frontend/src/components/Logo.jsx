import React from 'react';

/**
  Codex Logo Component
 @param {string} size - sm, md, lg, xl
 @param {boolean} iconOnly
  @param {string} className 
 */
const Logo = ({ size = 'md', iconOnly = false, className = "" }) => {
  // Mapping sizes to Tailwind classes
  const sizes = {
    sm: { container: 'gap-2', icon: 'h-8 w-8', text: 'text-lg', svg: 16 },
    md: { container: 'gap-3', icon: 'h-10 w-10', text: 'text-2xl', svg: 20 },
    lg: { container: 'gap-4', icon: 'h-14 w-14', text: 'text-4xl', svg: 28 },
    xl: { container: 'gap-5', icon: 'h-20 w-20', text: 'text-6xl', svg: 40 },
  };

  const current = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center font-sans ${current.container} ${className}`}>
      {/* Icon Box */}
      <div className={`${current.icon} flex items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30`}>
        <svg
          width={current.svg}
          height={current.svg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* stylized code bracket */}
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>

    </div>
  );
};

export default Logo;