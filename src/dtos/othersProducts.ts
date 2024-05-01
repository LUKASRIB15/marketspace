export type OtherProductDTO = {
  id: string
  name: string
  price: number
  is_new: boolean
  accept_trade: boolean
  product_images: ProductImage[]
  payment_methods: PaymentMethod[]
  user: {
    avatar: string
    name: string
  } 
}

export type ProductDetailsDTO = {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  is_active: boolean
  product_images: ProductImage[]
  payment_methods: PaymentMethod[]
  user: {
    avatar: string
    name: string
  }
}

type ProductImage = {
  path: string
  id: string
}

type PaymentMethod = {
  key: "boleto" | "pix" | "deposit" | "cash" | "card"
  name: string
}