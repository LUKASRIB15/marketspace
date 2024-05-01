import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Heading, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, WhatsappLogo } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { Carousel } from "../components/Carousel";
import { Profile } from "../components/Profile";
import { Button } from "../components/Button";
import { useProductsContext } from "../hooks/useProductsContext";
import { api } from "../lib/api";
import { formatPrice } from "../utils/formatPrice";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { AppError } from "../utils/AppError";
import { PaymentMethod } from "../components/PaymentMethod";

type RouteParams = {
  id: string
}

export function DetailsAdvert(){
  const {colors} = useTheme()
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const {productOfOtherUser} = useProductsContext()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <VStack
        mt={16}
      >
        <TouchableOpacity
          style={{marginLeft: 24, marginBottom: 12}}
          onPress={()=>navigation.goBack()}
        >
          <ArrowLeft color={colors.gray[900]}/>
        </TouchableOpacity>
        
        <Carousel isActive imagesOfProduct={productOfOtherUser.product_images}/>

        <VStack
          px={6}
          py={4}
        >
          <HStack
            alignItems={"center"}
            space={2}
          >
            <Profile 
              w={7}
              h={7}
              sourceImage={`${api.defaults.baseURL}/images/${productOfOtherUser.user.avatar}`}
            />
            <Text>{productOfOtherUser.user.name}</Text>
          </HStack>
          <VStack
            mt={6}
          >
            <Box
              bg={"gray.300"}
              py={0.5}
              px={3}
              rounded={999}
              width={75}
              alignItems={"center"}
            >
              <Text
                fontFamily={'heading'}
                color={"gray.800"}
                textTransform={"uppercase"}
                fontSize={'xs'}
              >
                {productOfOtherUser.is_new ? "Novo" : "Usado"}
              </Text>
            </Box>
            <HStack
              justifyContent={"space-between"}
              mt={2}
              alignItems={"center"}
            >
              <Heading
                fontSize={'lg'}
                color={"gray.900"}
              >
                {productOfOtherUser.name}
              </Heading>
              <Text
                fontSize={'lg'}
                color={'blue.500'}
                fontFamily={"heading"}
              >
                <Text
                  fontSize={'base'}
                >
                  R$ 
                </Text>
                <Text>{formatPrice(productOfOtherUser.price)}</Text>
              </Text>
            </HStack>
            <Text
              color={"gray.800"}
              mt={2}
            >
              {productOfOtherUser.description}
            </Text>
            <HStack
              space={2}
              mt={6}
            >
              <Text
                color={"gray.800"}
                fontFamily={"heading"}
              >
                Aceita troca?
              </Text>
              <Text>{productOfOtherUser.accept_trade ? "Sim" : "Não"}</Text>
            </HStack>
            <VStack
              mt={6}
            >
              <Text
                fontFamily={"heading"}
                color={"gray.800"}
              >
                Meios de pagamento:
              </Text>
              {
                productOfOtherUser.payment_methods.map(method=>{
                  return <PaymentMethod key={method.key} method={method.key} name={method.name}/>
                })
              }
            </VStack>
          </VStack>
        </VStack>
        <HStack
          bg={"gray.100"}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={6}
          py={5}
        >
          <Text
            fontSize={'xl'}
            color={'blue.500'}
            fontFamily={"heading"}
          >
            <Text
              fontSize={'base'}
            >
              R$ 
            </Text>
            <Text>{formatPrice(productOfOtherUser.price)}</Text>
          </Text>
          <Button>
            <Button.Icon>
              <WhatsappLogo weight="fill" color={colors.gray[200]}/>
            </Button.Icon>
            <Button.Text>Entrar em contato</Button.Text>
          </Button>
        </HStack>
      </VStack>
    </ScrollView>

  )
}