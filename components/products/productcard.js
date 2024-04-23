import React from 'react';

const ProductCard = ({ children }) => {
  return (
    <div className="product-card shadow-lg p-4 rounded-lg">
      {children}
    </div>
  );
};

export default ProductCard;
