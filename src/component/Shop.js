import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';
import BasketList from './BasketList';
import Cart from './Cart';
import GoodList from './GoodList';
import Loader from './Loader';

const Shop = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }

    const newItem = {
      ...item,
      quantity: 1,
    };
    setOrder([...order, newItem]);
  };

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const removeFromBasket = (itemID) => {
    const newOrder = order.filter((i) => i.id !== itemID);
    setOrder(newOrder);
  };

  const incrementQuantity = (itemID) => {
    const newOrder = order.map((i) => {
      if (i.id === itemID) {
        const newQuantity = i.quantity + 1;
        return {
          ...i,
          quantity: newQuantity,
        };
      } else {
        return i;
      }
    });
    setOrder(newOrder);
  };

  const decrementQuantity = (itemID) => {
    const newOrder = order.map((i) => {
      if (i.id === itemID) {
        const newQuantity = i.quantity - 1;
        return {
          ...i,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return i;
      }
    });
    setOrder(newOrder);
  };

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? <Loader /> : <GoodList goods={goods} addToBasket={addToBasket} />}
      {isBasketShow && (
        <BasketList
          order={order}
          removeFromBasket={removeFromBasket}
          handleBasketShow={handleBasketShow}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      )}
    </div>
  );
};

export default Shop;
