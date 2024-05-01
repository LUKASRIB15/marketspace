import { HStack, Text } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";


const Icon = {
  "boleto" :  <Barcode size={20}/>,
  "pix": <QrCode size={20}/>,
  "deposit": <Bank size={20}/>,
  "cash": <Money size={20}/>,
  "card": <CreditCard size={20}/>
} 

type PaymentMethod = {
  method: keyof typeof Icon
  name: string
}

export function PaymentMethod({method, name}: PaymentMethod){


  return (
    <HStack
      space={2}
      alignItems={"center"}
    >
        {Icon[method]}
        <Text>{name}</Text>
    </HStack>
  )
}