'use client';

import React from 'react';

interface InputOption {
  label: string;
  value: string | number;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label?: string;
  name: string;
  type?: string;
  error?: string;
  options?: InputOption[];
  rows?: number;
}

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  error,
  value,
  onChange,
  options,
  rows = 4,
  className = '',
  ...props
}: InputProps) {
  const baseInputClasses = `w-full bg-[#0A0A0A] border rounded-md px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 transition-all ${
    error ? 'border-red-500 focus:border-red-500' : 'border-[#D4AF37]/20 focus:border-[#D4AF37]/60'
  } ${className}`;

  return (
    <div className="w-full flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300 mb-1.5 block">
          {label}
          {required && <span className="text-[#D4AF37] ml-1">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          rows={rows}
          className={baseInputClasses}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
          className={`${baseInputClasses} appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]`}
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23D4AF37%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`
          }}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          className={baseInputClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <span className="text-red-400 text-sm mt-1">{error}</span>
      )}
    </div>
  );
}
export { Input };
