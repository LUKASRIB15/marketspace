import { StatusBar } from "react-native";
import { Box, HStack, Heading, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { Carousel } from "../components/Carousel";
import { Profile } from "../components/Profile";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, Tag } from "phosphor-react-native";
import { Button } from "../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { api } from "../lib/api";
import { formatPrice } from "../utils/formatPrice";
import { PaymentMethod } from "../components/PaymentMethod";
import { AppError } from "../utils/AppError";
import { useState } from "react";

type RouteParams = {
  id: string
} | undefined

export function PreviewNewAdvert(){
  const [isLoading, setIsLoading] = useState(false)

  const {productPreview, createProduct, editProduct} = useProductsContext()
  const {user} = useAuthContext()

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()

  const params = route.params as RouteParams

  const productExists = Boolean(params)

  const {colors} = useTheme()
  const toast = useToast()

  const productImagesWithId = productPreview.product_images.map((product, index)=>{
    return {
      path: product,
      id: index.toString()
    }
  })

  async function handleEditProduct(){
    try{
      setIsLoading(true)

      await editProduct(params!.id)

      navigation.navigate("tabRoutes")
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível editar o seu produto. Tente novamente mais tarde!"
    
      toast.closeAll()

      toast.show({
        title,
        placement: "top",
        bg: "red.500"
      })
    }finally{
      setIsLoading(false)
    }
  }

  async function handleCreateNewProduct(){
    try{
      setIsLoading(true)
      await createProduct()

      navigation.navigate('tabRoutes')
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível publicar o seu anúncio. Tente novamente mais tarde!"
    
      toast.closeAll()
      
      toast.show({
        title,
        placement: "top",
        bg: "red.500"
      })
    }finally{
      setIsLoading(false)
    }
  }


  return (
    <VStack
      flex={1}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={colors.blue[500]} translucent/>
      <VStack
        bg={"blue.500"}
        pt={16}
        pb={4}
        alignItems={"center"}
      >
        <Text
          fontFamily={"heading"}
          color={"gray.100"}
          fontSize={'md'}
        >
          Pré visualização do anúncio
        </Text>
        <Text
          color={"gray.100"}
        >
          É assim que seu produto vai aparecer!
        </Text>
      </VStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      >
        
        <Carousel 
          isActive 
          preview={true}
          imagesOfProduct={productImagesWithId}
        />
        
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
              sourceImage={`${api.defaults.baseURL}/images/${user.avatar}`}
            />
            <Text>{user.name}</Text>
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
                {productPreview.is_new ? "Novo" : "Usado" }
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
                {productPreview.title}
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
                <Text>{formatPrice(productPreview.price)}</Text>
              </Text>
            </HStack>
            <Text
              color={"gray.800"}
              mt={2}
            >
              {productPreview.description}
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
              <Text>{productPreview.accept_trade ? "Sim" : "Não"}</Text>
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
              {productPreview.payment_methods.map(method=>{
                return (
                  <PaymentMethod  
                    key={method.key} 
                    method={method.key} 
                    name={method.name}
                  />
                )
              })}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
      <HStack
          bg={"gray.100"}
          alignItems={"center"}
          px={6}
          py={5}
          space={3}

        >
          <Button 
            bgVariant="light" 
            flex={1}
            onPress={()=>navigation.goBack()}
          >
            <Button.Icon>
              <ArrowLeft color={colors.gray[900]} size={16}/>
            </Button.Icon>
            <Button.Text textVariant="dark">Voltar e editar</Button.Text>
          </Button>
          <Button 
            flex={1}
            onPress={productExists ? handleEditProduct : handleCreateNewProduct}
            isLoading={isLoading}
          >
            <Button.Icon>
              <Tag color={colors.gray[100]} size={16}/>
            </Button.Icon>
            <Button.Text>Publicar</Button.Text>
          </Button>
        </HStack>
    </VStack>
  )
}