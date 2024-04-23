import React from 'react';

const ProductDetails = ({ props }) => {
  return (
    <div className="product-details">
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <p>Price: ${props.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetails;
