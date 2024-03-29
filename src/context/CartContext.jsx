import React, { createContext, useState, useEffect } from "react";

// create context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  // total price state
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount * currentItem.price;
    }, 0);
    setTotal(total)
  }, [cart])

  // update item amount 
  useEffect(() => {
    if (cart) {
        const amount = cart.reduce((accumulator, currentItem) =>{
            return accumulator + currentItem.amount;
        }, 0);
        setItemAmount(amount);
    }   
  }, [cart])

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // check if already in cart
    const cartItem = cart.find((item) => item.id === id);
    // if item already existed in cart
    if (cartItem) {
      increaseAmount(id);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove item from cart
  const removeFromCart = (id) => {
    const newCart = [...cart].filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    const newCart = [];
    setCart(newCart);
  };

  const increaseAmount = (id) => {
    const newCart = [...cart].map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem.amount > 1) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
