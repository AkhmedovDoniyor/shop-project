import React from 'react';

const BasketItem = (props) => {
  const { id, name, price, quantity, removeFromBasket, incrementQuantity, decrementQuantity } = props;
  return (
    <li className='collection-item'>
      {name} x{quantity} = {price * quantity} <b>$</b>
      <span className='secondary-content'>
        <i className='material-icons basket-delete' onClick={() => removeFromBasket(id)}>delete</i>
        <i className='material-icons basket-plus' onClick={() => incrementQuantity(id)}>add</i>
        <i className='material-icons basket-minus' onClick={() => decrementQuantity(id)}>remove</i>
      </span>
    </li>
  );
};

export default BasketItem;