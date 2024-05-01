import { ReactNode, createContext, useState } from "react";
import { ProductDTO } from "../dtos/products";
import { api } from "../lib/api";
import { OtherProductDTO, ProductDetailsDTO } from "../dtos/othersProducts";


export type ProductPreview = {
  title: string
  description: string
  price: number
  accept_trade: boolean
  is_new: boolean
  is_active: boolean
  product_images: string[]
  payment_methods: Array<{
    key: "boleto" | "pix" | "cash" | "card" | "deposit"
    name: string
  }>
}

export type ProductFilter = {
  accept_trade: string | undefined
  is_new: string | undefined
  payment_methods: string[] | undefined
}

type ProductsContextProps = {
  productsOfUser: ProductDTO[]
  productPreview: ProductPreview
  listOfOthersProducts: OtherProductDTO[]
  productOfOtherUser: ProductDetailsDTO
  selectedFilters: ProductFilter
  getProductsOfUser: ()=>Promise<void>
  updateProductView: (productId: string, is_active: boolean)=>Promise<void>
  removeProductOfUser: (productId: string)=>Promise<void>
  addProductPreview: (product: ProductPreview)=>void
  createProduct: ()=>Promise<void>
  editProduct: (productId: string)=>Promise<void>
  searchProducts: (filters:ProductFilter, query:string)=>Promise<void>
  fetchOthersProductsWhenRenderingFirstTime: ()=>Promise<void>
  dataAboutProduct: (productId:string)=>Promise<void>
  applyFiltersInProducts: (filters:ProductFilter)=>void
}

export const ProductsContext = createContext({} as ProductsContextProps)

export function ProductsContextProvider({children}:{children:ReactNode}){
  const [productsOfUser, setProductsOfUser] = useState<ProductDTO[]>([])
  const [listOfOthersProducts, setListOfOthersProducts] = useState<OtherProductDTO[]>([])
  const [productPreview, setProductPreview] = useState<ProductPreview>({} as ProductPreview)
  const [productOfOtherUser, setProductOfOtherUser] = useState<ProductDetailsDTO>({} as ProductDetailsDTO)
  const [selectedFilters, setSelectedFilters] = useState<ProductFilter>({} as ProductFilter)
  async function getProductsOfUser(){
    try{
      const products = await api.get('/users/products')

      setProductsOfUser(products.data)
    }catch(error){
      throw error
    }
  }

  async function updateProductView(productId: string, is_active: boolean){
    try{
      await api.patch(`/products/${productId}`, {
        is_active: !is_active
      })
    }catch(error){
      throw error
    }
  }

  async function removeProductOfUser(productId:string){
    try{
      await api.delete(`/products/${productId}`)
    }catch(error){
      throw error
    }
  }

  async function createProduct(){
    try{
      const paymentMethodsKeys = productPreview.payment_methods.map(method=>{
        return method.key
      })

      const newProduct = await api.post('/products', {
        name: productPreview.title,
        description: productPreview.description,
        is_new: productPreview.is_new,
        price: productPreview.price,
        accept_trade: productPreview.accept_trade,
        payment_methods: paymentMethodsKeys 
      })

      if(newProduct && newProduct.data){
        const selectedPhotos = productPreview.product_images.map(product=>{
          const fileExtension = product.split('.').pop()
          return {
            name: `${newProduct.data.name}.${fileExtension}`.toLocaleLowerCase(),
            uri: product,
            type: `image/${fileExtension}`
          } as any
        })

        selectedPhotos.forEach(async(photo)=>{
          const newProductForm = new FormData()
          newProductForm.append('product_id', newProduct.data.id)
          newProductForm.append('images', photo)

          await api.post('/products/images', newProductForm, {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          })
        })
      }
    }catch(error){
      throw error
    }
  }

  async function editProduct(productId:string){
    try{
      const paymentMethodsKeys = productPreview.payment_methods.map(method=>{
        return method.key
      })

      const editedProduct = await api.put(`/products/${productId}`, {
        name: productPreview.title,
        description: productPreview.description,
        is_new: productPreview.is_new,
        price: productPreview.price,
        accept_trade: productPreview.accept_trade,
        payment_methods: paymentMethodsKeys 
      })

      if(editedProduct && editedProduct.status === 204){
        const newSelectedPhotos = productPreview.product_images.filter(image=>{
          return image.includes(`${api.defaults.baseURL}`) === false
        })

        const selectedPhotos = newSelectedPhotos.map(image=>{
          const fileExtension = image.split('.').pop()
          return {
            name: `${productPreview.title}.${fileExtension}`.toLocaleLowerCase(),
            uri: image,
            type: `image/${fileExtension}`
          } as any
        })

        selectedPhotos.forEach(async(photo)=>{
          const newProductForm = new FormData()
          newProductForm.append('product_id', productId)
          newProductForm.append('images', photo)

          await api.post('/products/images', newProductForm, {
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          })
        })
      }
    }catch(error){
      throw error
    }
  }

  async function searchProducts({accept_trade, is_new, payment_methods}:ProductFilter, query:string){
    try{
      const products = await api.get('/products', {
        params:{
          is_new,
          accept_trade,
          payment_methods,
          query
        }
      })
      setListOfOthersProducts(products.data)
    }catch(error){
      throw error
    }
  }

  async function fetchOthersProductsWhenRenderingFirstTime(){
    try{
      const products = await api.get('/products')
      setListOfOthersProducts(products.data)
    }catch(error){
      throw error
    }
  }

  async function dataAboutProduct(productId:string){
    try{
      const product = await api.get(`/products/${productId}`)
      setProductOfOtherUser(product.data)

    }catch(error){
      throw error
    }
  }

  function addProductPreview(product: ProductPreview){
    setProductPreview(product)
  }

  function applyFiltersInProducts({accept_trade, is_new, payment_methods}:ProductFilter){
    setSelectedFilters({accept_trade, is_new, payment_methods})
  }

  return (
    <ProductsContext.Provider 
      value={{
        productsOfUser,
        productPreview,
        listOfOthersProducts,
        productOfOtherUser, 
        selectedFilters,
        getProductsOfUser,
        updateProductView,
        removeProductOfUser,
        addProductPreview,
        createProduct,
        editProduct,
        searchProducts,
        fetchOthersProductsWhenRenderingFirstTime,
        dataAboutProduct,
        applyFiltersInProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}