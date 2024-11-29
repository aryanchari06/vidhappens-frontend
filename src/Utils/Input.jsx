import React from "react";

function Input({ type = "text", className = "", label, id, placeholder, ...props }, ref) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        className={`w-full ${className}`}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);
