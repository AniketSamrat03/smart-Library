import React from 'react';

function FunctionBtn({
  children,
  type = 'button',
  bgColor = 'bg-red-800',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-3 py-1 rounded-lg ${bgColor} ${textColor} ${className} pointer`}
      {...props}
    >
      {children}
    </button>
  );
}

export default FunctionBtn;
