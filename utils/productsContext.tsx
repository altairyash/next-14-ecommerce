"use client"
import { ReactNode, createContext, useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const ProductsContext = createContext<any>({});

export function ProductsContextProvider({children}:{children:ReactNode}) {
  const [productsAdded, setProductsAdded] = useLocalStorageState<any>('cart',{defaultValue:{}});
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => {
  console.log("productsAdded in context",productsAdded)
  },[productsAdded])
  return (
    <ProductsContext.Provider value={{productsAdded, setProductsAdded, cartCount, setCartCount}}>
      {children}
    </ProductsContext.Provider>
  );
}
