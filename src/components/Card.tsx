import { Box, HStack, Heading, Image, Text, VStack } from "native-base";

import AvatarPng from "../assets/avatar.png"
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { formatPrice } from "../utils/formatPrice";
import { useProductsContext } from "../hooks/useProductsContext";

type CardProps = {
  idOfProduct: string
  src?: string | null
  srcOfProduct: string 
  price: number
  nameOfProduct: string
  isNew: boolean
  isActive: boolean
  isMyAdvert?: boolean
}

export function Card({
  src=null, 
  isNew,
  idOfProduct, 
  isActive, 
  srcOfProduct, 
  nameOfProduct, 
  price, 
  isMyAdvert=false
  }:CardProps){
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const srcIsDifferentOfNull = Boolean(src)

  const {dataAboutProduct} = useProductsContext()

  async function handleAccessDetailsAboutProduct(){
    if(isMyAdvert){
      navigation.navigate("detailsMyAdvert", {id: idOfProduct})
    }else{
      await dataAboutProduct(idOfProduct)
      navigation.navigate("detailsAdvert", {id: idOfProduct})
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleAccessDetailsAboutProduct}
    >
      <VStack
        width={154}
      >
        <Box>
          <Image 
            source={{uri: srcOfProduct}}
            resizeMode="cover"
            alt="Imagem de um sapatenis"
            width={154}
            height={100}
            rounded={6}
          />
          <HStack
            justifyContent={"space-between"}
            position={"absolute"}
            right={1}
            left={1}
            top={1}
          >
            
            <Image 
              source={srcIsDifferentOfNull ? {uri: src} : AvatarPng}
              alt="Imagem de perfil do usuário"
              width={6}
              height={6}
              rounded={999}
              borderColor={'gray.100'}
              borderWidth={1}
            />
            <Box
              bg={isNew ? "blue.700" : "gray.800"}
              py={0.5}
              px={3}
              rounded={999}
            >
              <Text
                fontFamily={'heading'}
                color={"white"}
                textTransform={"uppercase"}
                fontSize={'xs'}
              >
                {isNew ? "Novo" : "Usado"}
              </Text>
            </Box>
          </HStack>
          {
            !isActive && (
              <Box
                style={{
                  backgroundColor: 'rgba(26,24,27, 0.5)'
                }}
                position={"absolute"}
                top={0}
                left={0}
                right={0}
                rounded={6}
                h={100}
              >
                <Text
                  color={'gray.100'}
                  fontSize={'xs'}
                  textTransform={"uppercase"}
                  fontFamily={'heading'}
                  position={"absolute"}
                  left={1.5}
                  bottom={2}
                >Anúncio desativado</Text>
              </Box>
            )
          }
        </Box>
        <Text
          color={isActive ? "gray.900" : "gray.500"}
        >{nameOfProduct}</Text>
        <Heading
          color={isActive ? "gray.900" : "gray.500"}
          
          lineHeight={"xs"}
        >
          <Text
            fontSize={'xs'}
          >R$ </Text>
          <Text
            fontSize={'md'}
            lineHeight={'md'}
          >{formatPrice(price)}</Text>
        </Heading>
      </VStack>
    </TouchableOpacity>
  )
}