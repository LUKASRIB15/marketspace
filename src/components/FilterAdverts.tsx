import { Actionsheet, FlatList, HStack ,Heading, IActionsheetProps ,Text, VStack, useTheme } from "native-base";
import { X } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Tag } from "./Tag";
import { Switch } from "react-native-switch";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";


export function FilterAdverts({onClose,...rest}: IActionsheetProps){
  const {colors} = useTheme()
  const [acceptTrade, setAcceptTrade] = useState(false)

  const [hasTicket, setHasTicket] = useState(false)
  const [hasPix, setHasPix] = useState(false)
  const [hasMoney, setHasMoney] = useState(false)
  const [hasBankDeposit, setHasBankDeposit] = useState(false)
  const [hasCreditCard, setHasCreditCard] = useState(false)

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
                onValueChange={()=>setHasTicket(!hasTicket)}
              />
              <Checkbox 
                isChecked={hasPix}
                label="Pix"
                onValueChange={()=>setHasPix(!hasPix)}
              />
              <Checkbox 
                isChecked={hasMoney}
                label="Dinheiro"
                onValueChange={()=>setHasMoney(!hasMoney)}
              />
              <Checkbox 
                isChecked={hasCreditCard}
                label="Cartão de crédito"
                onValueChange={()=>setHasCreditCard(!hasCreditCard)}
              />
              <Checkbox 
                isChecked={hasBankDeposit}
                label="Depósito bancário"
                onValueChange={()=>setHasBankDeposit(!hasBankDeposit)}
              />
            </VStack>
            
            
            
          </VStack>
          <HStack
            space={3}
          >
            <Button 
              bgVariant="light"
              flex={1}
            >
              <Button.Text textVariant="dark">Resetar filtros</Button.Text>
            </Button>
            <Button 
              bgVariant="dark"
              flex={1}
            >
              <Button.Text>Aplicar filtros</Button.Text>
            </Button>
          </HStack>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  )
}