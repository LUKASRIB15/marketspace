import { Actionsheet, FlatList, HStack ,Heading, IActionsheetProps ,Text, VStack, useTheme } from "native-base";
import { X } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Tag } from "./Tag";
import { Switch } from "react-native-switch";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { useProductsContext } from "../hooks/useProductsContext";
import { ProductFilter } from "../contexts/ProductsContext";

type PaymentMethod = {
  key: "boleto" | "pix" | "deposit" | "cash" | "card"
  name: string
}

export function FilterAdverts({onClose,...rest}: IActionsheetProps){
  const {colors} = useTheme()
  
  const {applyFiltersInProducts} = useProductsContext()

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [condition, setCondition] = useState<string[]>([])
  const [hasTicket, setHasTicket] = useState(false)
  const [hasPix, setHasPix] = useState(false)
  const [hasMoney, setHasMoney] = useState(false)
  const [hasBankDeposit, setHasBankDeposit] = useState(false)
  const [hasCreditCard, setHasCreditCard] = useState(false)

  function handleResetFilters(){
    setCondition([])
    setPaymentMethods([])
    setAcceptTrade(false)
    setHasTicket(false)
    setHasBankDeposit(false)
    setHasPix(false)
    setHasCreditCard(false)
    setHasMoney(false)
  }

  // Seguindo padrão do servidor node.js
  function handleApplyFilters(){
    const conditionOfProduct = condition.length !== 0 && condition.length !== 2 ? condition[0] === "Novo" ? "true" : "false" : undefined
    const acceptTradeOfProduct = acceptTrade ? "true" : "false"
    
    const paymentMethodsKeys = paymentMethods.map(method=>method.key)

    const newConfigFilters:ProductFilter = {
      is_new: conditionOfProduct,
      accept_trade: acceptTradeOfProduct,
      payment_methods: paymentMethodsKeys.length !== 0 ? paymentMethodsKeys : undefined,
    }

    applyFiltersInProducts(newConfigFilters)

    //compreender o erro
    onClose()
  }

  return (
    <Actionsheet
      onClose={onClose} 
      {...rest}
    >
      <Actionsheet.Content>
        <VStack
          p={6}
          width={"100%"}
        >
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={6}
          >
            <Heading
              fontSize={"lg"}
            >
                Filtrar anúncios
            </Heading>
            <TouchableOpacity
              onPress={onClose}
            >
              <X color={colors.gray[500]} size={24}/>
            </TouchableOpacity>
          </HStack>
          <VStack
            mb={6}
            space={3}
          >
            <Text
              fontFamily={'heading'}
              color={"gray.800"}
            >
              Condição
            </Text>
            <FlatList 
              data={["Novo", "Usado"]}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <Tag 
                  key={item} 
                  condition={item}
                  value={condition}
                  onChangeValue={()=>setCondition(prevState=>{
                    if(prevState.includes(item)){
                      const newConditions = prevState.filter(condition=>{
                        return condition != item
                      })
                      return newConditions 
                    }else{
                      return [...prevState, item]
                    }
                  })}
                />
              )}
              horizontal
              contentContainerStyle={{gap: 8}}
            />
          </VStack>
          <VStack
            mb={6}
            space={3}
          >
            <Text
              fontFamily={'heading'}
              color={"gray.800"}
            >
              Aceita troca?
            </Text>
            
            <Switch 
              value={acceptTrade}
              onValueChange={setAcceptTrade}
              activeText=""
              inActiveText=""
              backgroundActive={colors.blue[500]}
              backgroundInactive={colors.gray[300]}
              circleBorderActiveColor={colors.blue[500]}
              circleBorderInactiveColor={colors.gray[300]}
            />
            
          </VStack>
          <VStack
            mb={6}
            space={3}
          >
            <Text
              fontFamily={'heading'}
              color={"gray.800"}
            >
              Meios de pagamento aceitos
            </Text>
            <VStack
              space={2}
            >
            
              <Checkbox 
                isChecked={hasTicket}
                label="Boleto"
                onValueChange={()=>{
                  setHasTicket(!hasTicket)
                  // Até aqui o estado não mudou, então irei usar o estado no contexto anterior
                  setPaymentMethods(prevState=>{
                    if(!hasTicket === true){
                      return [...prevState, {key: "boleto", name: "Boleto"}]
                    }
                    const paymentMethods = prevState.filter(method=>method.key!=="boleto")

                    return paymentMethods
                  })
                }}
              />
              <Checkbox 
                isChecked={hasPix}
                label="Pix"
                onValueChange={()=>{
                  setHasPix(!hasPix)
                  // Até aqui o estado não mudou, então irei usar o estado no contexto anterior
                  setPaymentMethods(prevState=>{
                    if(!hasPix === true){
                      return [...prevState, {key: "pix", name: "Pix"}]
                    }
                    const paymentMethods = prevState.filter(method=>method.key!=="pix")

                    return paymentMethods
                  })
                }}
              />
              <Checkbox 
                isChecked={hasMoney}
                label="Dinheiro"
                onValueChange={()=>{
                  setHasMoney(!hasMoney)
                  // Até aqui o estado não mudou, então irei usar o estado no contexto anterior
                  setPaymentMethods(prevState=>{
                    if(!hasMoney === true){
                      return [...prevState, {key: "cash", name: "Dinheiro"}]
                    }
                    const paymentMethods = prevState.filter(method=>method.key!=="cash")

                    return paymentMethods
                  })
                }}
              />
              <Checkbox 
                isChecked={hasCreditCard}
                label="Cartão de crédito"
                onValueChange={()=>{
                  setHasCreditCard(!hasCreditCard)
                  // Até aqui o estado não mudou, então irei usar o estado no contexto anterior
                  setPaymentMethods(prevState=>{
                    if(!hasCreditCard === true){
                      return [...prevState, {key: "card", name: "Cartão de Crédito"}]
                    }
                    const paymentMethods = prevState.filter(method=>method.key!=="card")

                    return paymentMethods
                  })
                }}
              />
              <Checkbox 
                isChecked={hasBankDeposit}
                label="Depósito bancário"
                onValueChange={()=>{
                  setHasBankDeposit(!hasBankDeposit)
                  // Até aqui o estado não mudou, então irei usar o estado no contexto anterior
                  setPaymentMethods(prevState=>{
                    if(!hasBankDeposit === true){
                      return [...prevState, {key: "deposit", name: "Depósito bancário"}]
                    }
                    const paymentMethods = prevState.filter(method=>method.key!=="deposit")

                    return paymentMethods
                  })
                }}
              />
            </VStack>
            
            
            
          </VStack>
          <HStack
            space={3}
          >
            <Button 
              bgVariant="light"
              flex={1}
              onPress={handleResetFilters}
            >
              <Button.Text textVariant="dark">Resetar filtros</Button.Text>
            </Button>
            <Button 
              bgVariant="dark"
              flex={1}
              onPress={handleApplyFilters}
            >
              <Button.Text>Aplicar filtros</Button.Text>
            </Button>
          </HStack>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  )
}