import React from 'react';

const Product = ({ props }) => {
  return (
    <div className="product-info">
      <h3>{props.name}</h3>
      <p>Price: ${props.price.toFixed(2)}</p>
      <p>Description: {props.description}</p>
    </div>
  );
};
