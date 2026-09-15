import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'outline' | 'subtle';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full whitespace-nowrap transition-colors';
  
  const variants = {
    gold: 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30',
    outline: 'border border-gray-600 text-gray-400',
    subtle: 'bg-white/5 text-gray-400'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
export { Badge };
