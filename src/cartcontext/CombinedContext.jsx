import React, { createContext, useContext, useState, useEffect } from "react";

const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0); // New state for wishlist count

    const addToCart = (product) => {
        setCartItems(prevCartItems => [...prevCartItems, { ...product, images: product.images }]);
    };

    const removeFromCart = (productId) => {
        setCartItems(prevCartItems => prevCartItems.filter((item) => item.id !== productId));
    };

    const addToWishlist = (product) => {
        setWishlistItems(prevWishlistItems => [...prevWishlistItems, { ...product, images: product.images }]);
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prevWishlistItems => prevWishlistItems.filter((item) => item.id !== productId));
    };

    useEffect(() => {
        // Update wishlist count whenever wishlistItems changes
        setWishlistCount(wishlistItems.length);
    }, [wishlistItems]);

    const updateQuantity = (productId, newQuantity) => { 
        setCartItems((prevCartItem) => prevCartItem.map((item) => {
            if (item.id === productId) { 
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const combinedContextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        updateQuantity,
        wishlistCount // Include wishlist count in the context value
    };

    return (
        <CombinedContext.Provider value={combinedContextValue}>
            {children}
        </CombinedContext.Provider>
    );
};

export const useCombinedContext = () => useContext(CombinedContext);
