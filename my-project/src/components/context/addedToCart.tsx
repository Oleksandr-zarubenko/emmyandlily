"use client"
import { createContext, useContext, useState } from 'react';

const AddedToCartContext = createContext<any>(null);

export const useAddedToCart = () => useContext(AddedToCartContext);

export const AddedToCartProvider = ({ children }: { children: React.ReactNode }) => {
    const [addedToCart, setAddedToCart] = useState<{ [productId: string]: boolean }>({});

    return (
        <AddedToCartContext.Provider value={{ addedToCart, setAddedToCart }}>
            {children}
        </AddedToCartContext.Provider>
    );
};
