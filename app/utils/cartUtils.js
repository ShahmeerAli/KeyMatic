
export const getCartFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
      } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
      }
    }
    return [];
  };
  
 
  export const saveCartToStorage = (cartItems) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  };
  

  export const addToCart = (product) => {
    const cart = getCartFromStorage();
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
     
      existingItem.quantity += 1;
    } else {
    
      cart.push({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    saveCartToStorage(cart);
    return cart;
  };
  

  export const removeFromCart = (productId) => {
    const cart = getCartFromStorage();
    const updatedCart = cart.filter(item => item._id !== productId);
    saveCartToStorage(updatedCart);
    return updatedCart;
  };
  
  
  export const updateCartQuantity = (productId, quantity) => {
    const cart = getCartFromStorage();
    const item = cart.find(item => item._id === productId);
    
    if (item) {
      if (quantity <= 0) {
        
        return removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveCartToStorage(cart);
      }
    }
    
    return cart;
  };
  
  
  export const clearCart = () => {
    saveCartToStorage([]);
    return [];
  };
  
 
  export const getCartTotal = () => {
    const cart = getCartFromStorage();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  

  export const getCartItemCount = () => {
    const cart = getCartFromStorage();
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

export default getCartFromStorage  