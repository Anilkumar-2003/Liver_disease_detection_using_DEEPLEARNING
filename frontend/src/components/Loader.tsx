// Loader.tsx
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      {[...Array(15)].map((_, i) => (
        <span key={i} style={{ '--i': i + 1 } as React.CSSProperties} className="element"></span>
      ))}
    </div>
  );
};

export default Loader;