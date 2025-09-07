import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadCart = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
      setCartCount(cartData.items.reduce((total, item) => total + item.quantity, 0));
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load cart from localStorage when user is not logged in
  useEffect(() => {
    if (!user) {
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        const parsedCart = JSON.parse(localCart);
        setCart(parsedCart);
        setCartCount(parsedCart.items.reduce((total, item) => total + item.quantity, 0));
      }
    }
  }, [user]);

  // Load user's cart when logged in
  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user, loadCart]);

  const addToCart = async (itemId, quantity = 1) => {
    try {
      if (user) {
        // Add to server cart
        const updatedCart = await cartService.addToCart(itemId, quantity);
        setCart(updatedCart);
        setCartCount(updatedCart.items.reduce((total, item) => total + item.quantity, 0));
      } else {
        // Add to local cart
        const localCart = JSON.parse(localStorage.getItem('localCart') || '{"items": [], "totalAmount": 0}');
        
        // Check if item already exists
        const existingItemIndex = localCart.items.findIndex(item => item.itemId === itemId);
        
        if (existingItemIndex > -1) {
          localCart.items[existingItemIndex].quantity += quantity;
        } else {
          // Get item details (simplified - in real app, you'd fetch from API)
          localCart.items.push({
            itemId,
            quantity,
            price: 0 // Will be updated when user logs in
          });
        }
        
        localStorage.setItem('localCart', JSON.stringify(localCart));
        setCart(localCart);
        setCartCount(localCart.items.reduce((total, item) => total + item.quantity, 0));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (user) {
        const updatedCart = await cartService.removeFromCart(itemId);
        setCart(updatedCart);
        setCartCount(updatedCart.items.reduce((total, item) => total + item.quantity, 0));
      } else {
        const localCart = JSON.parse(localStorage.getItem('localCart') || '{"items": [], "totalAmount": 0}');
        localCart.items = localCart.items.filter(item => item.itemId !== itemId);
        localStorage.setItem('localCart', JSON.stringify(localCart));
        setCart(localCart);
        setCartCount(localCart.items.reduce((total, item) => total + item.quantity, 0));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (user) {
        const updatedCart = await cartService.updateQuantity(itemId, quantity);
        setCart(updatedCart);
        setCartCount(updatedCart.items.reduce((total, item) => total + item.quantity, 0));
      } else {
        const localCart = JSON.parse(localStorage.getItem('localCart') || '{"items": [], "totalAmount": 0}');
        const itemIndex = localCart.items.findIndex(item => item.itemId === itemId);
        if (itemIndex > -1) {
          localCart.items[itemIndex].quantity = quantity;
        }
        localStorage.setItem('localCart', JSON.stringify(localCart));
        setCart(localCart);
        setCartCount(localCart.items.reduce((total, item) => total + item.quantity, 0));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        await cartService.clearCart();
        setCart({ items: [], totalAmount: 0 });
        setCartCount(0);
      } else {
        localStorage.removeItem('localCart');
        setCart({ items: [], totalAmount: 0 });
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const value = {
    cart,
    cartCount,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
