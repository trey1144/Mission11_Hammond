// set context for the cart
import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

// creates the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// the cart provider is the parent for the children functions down below
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // sets what is in the cart and allows it to change with the setCart function
  const [cart, setCart] = useState<CartItem[]>([]);

  // for adding to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      const updatedCart = prevCart.map((c) =>
        c.bookID === item.bookID ? { ...c, price: c.price + item.price } : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  // make a function to remove from the cart
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  // clearing the cart
  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
