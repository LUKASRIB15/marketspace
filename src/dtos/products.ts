export type ProductDTO = {
  id: string
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  user_id: string
  is_active: boolean
  product_images: ProductImage[]
  payment_methods: PaymentMethod[]
}

type ProductImage = {
  path: string
  id: string
}

type PaymentMethod = {
  key: "boleto" | "pix" | "deposit" | "cash" | "card"
  name: string
}