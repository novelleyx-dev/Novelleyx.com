import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  goldBorder?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  hover = true,
  goldBorder = false,
  padding = 'md',
}: CardProps) {
  const baseClasses = 'bg-[#0A0A0A] rounded-lg transition-all duration-300';
  
  const hoverClasses = hover ? 'hover:border-[#D4AF37]/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]' : '';
  const borderClasses = goldBorder ? 'border border-[#D4AF37]/40' : 'border border-[#D4AF37]/20';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`${baseClasses} ${borderClasses} ${hoverClasses} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}
export { Card };
