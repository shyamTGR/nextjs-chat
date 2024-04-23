import React from 'react';

const Purchase = ({ props }) => {
  return (
    <div className="purchase">
      <h4>Purchase {props.name}</h4>
      <p>Price: ${props.price}</p>
      <p>Quantity: {props.quantity}</p>
      <button className="btn btn-primary">Confirm Purchase</button>
    </div>
  );
};

export default Purchase;
