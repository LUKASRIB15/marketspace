import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";

export function useProductsContext(){
  const productsAttributes = useContext(ProductsContext)

  return productsAttributes
}