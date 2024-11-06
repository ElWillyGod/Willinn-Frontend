import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string; // Prop adicional para clases CSS
}

const Input = ({ id, label, type = "text", value, onChange, placeholder, className }: InputProps) => (
  <div className="mb-4">
    <label htmlFor={id} className={`block text-sm font-medium ${className}`}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 ${className}`}
      required
    />
  </div>
);

export default Input;