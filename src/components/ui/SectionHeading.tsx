import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  const alignmentClass = centered ? 'text-center' : 'text-left';
  
  return (
    <div className={`flex flex-col ${alignmentClass} ${className}`}>
      {eyebrow && (
        <span className="text-[#D4AF37] text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-gray-400 max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
export { SectionHeading };
