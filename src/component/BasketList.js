import React from 'react';
import BasketItem from './BasketItem';

const BasketList = (props) => {
  const { order, handleBasketShow, removeFromBasket, incrementQuantity, decrementQuantity } = props;
  const totalPrice = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="bsk">
      <ul className="collection basket-list">
        <li className="collection-item active">Basket</li>
        {order.length ? (
          order.map((item) => {
            return (
              <BasketItem
                key={item.id}
                {...item}
                removeFromBasket={removeFromBasket}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            );
          })
        ) : (
          <li className="collection-item">Basket is empty</li>
        )}
        <li className="collection-item active">
          Total Price: {totalPrice} <b>$</b>
        </li>
        <i className="material-icons basket-close" onClick={handleBasketShow}>
          close
        </i>
      </ul>
    </div>
  );
};

export default BasketList;
