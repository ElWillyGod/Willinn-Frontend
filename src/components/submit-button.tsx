import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
}

const Button = ({ children } : ButtonProps) => (
    <button
        type="submit"
        className="w-full py-2 px-4 bg-pink-500 text-white font-semibold rounded-md shadow-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
    >
        {children}
    </button>
);

export default Button;