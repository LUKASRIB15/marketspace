export function priceToNumber(price:string){
  return Number(price.replace(',', ''))
}