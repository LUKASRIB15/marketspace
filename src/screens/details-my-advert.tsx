import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Heading, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, PencilSimpleLine, Power, QrCode, TrashSimple, WhatsappLogo } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { Carousel } from "../components/Carousel";
import { Profile } from "../components/Profile";
import { Button } from "../components/Button";
import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { api } from "../lib/api";
import { formatPrice } from "../utils/formatPrice";
import { PaymentMethod } from "../components/PaymentMethod";
import { AppError } from "../utils/AppError";

type RouteParams = {
  id: string
}

export function DetailsMyAdvert(){
  const [isLoadingUpdateProductView, setIsLoadingUpdateProductView] = useState(false)
  const [isLoadingRemoveProduct, setIsLoadingRemoveProduct] = useState(false)
  
  const {productsOfUser, updateProductView, removeProductOfUser} = useProductsContext()
  const {user} = useAuthContext()
  
  const {colors} = useTheme()
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const router = useRoute()
  
  const {id} = router.params as RouteParams
  
  const product = productsOfUser.filter(product=>{
    return product.id === id
  })[0]
  
  const [isAdvertActive, setIsAdvertActive] = useState(product.is_active)

  async function handleToggleProductView(){
    try{
      setIsLoadingUpdateProductView(true)
      await updateProductView(product.id, product.is_active)
      setIsAdvertActive(!isAdvertActive)
    }catch(error){
      const isAppError = error instanceof AppError
      const updateAction = product.is_active ? "Desativar" : "Ativar"
      const title = isAppError ? error.message : `Não foi possível ${updateAction}. Tente novamente mais tarde`

      toast.closeAll()

      toast.show({
        title,
        placement: "top",
        bg: "red.500"
      })
      
    }finally{
      setIsLoadingUpdateProductView(false)
    }
  }
  
  async function handleRemoveProduct(){
    try{
      setIsLoadingRemoveProduct(true)
      await removeProductOfUser(product.id)
      navigation.goBack()
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : `Não foi possível remover esse produto. Tente novamente mais tarde`

      toast.closeAll()

      toast.show({
        title,
        placement: "top",
        bg: "red.500"
      })
    }finally{
      setIsLoadingRemoveProduct(false)
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <VStack
        mt={16}
      >
        <HStack
          justifyContent={"space-between"}
          mx={6}
          mb={3}
        >
          <TouchableOpacity
            onPress={()=>navigation.goBack()}
          >
            <ArrowLeft color={colors.gray[900]}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>navigation.navigate("formAdvert", {id: product.id})}
          >
            <PencilSimpleLine color={colors.gray[900]}/>
          </TouchableOpacity>
        </HStack>
        
        <Carousel isActive={isAdvertActive} imagesOfProduct={product.product_images}/>

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
                {product.is_new ? "novo" : "usado"}
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
                {product.name}
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
                <Text>{formatPrice(product.price)}</Text>
              </Text>
            </HStack>
            <Text
              color={"gray.800"}
              mt={2}
            >
              {product.description} 
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
              <Text>{product.accept_trade ? "Sim": "Não"}</Text>
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
                product.payment_methods.map(method=>{
                  return (
                    <PaymentMethod 
                      key={method.key} 
                      method={method.key} 
                      name={method.name}
                    />
                  )
                })
              }
            </VStack>
          </VStack>
        </VStack>
        <VStack
          mt={6}
          px={6}
          space={2}
          mb={12}
        >
          <Button 
            bgVariant={isAdvertActive ? "dark" : "primary"} 
            onPress={handleToggleProductView}
            isLoading={isLoadingUpdateProductView}
          >
            <Button.Icon>
              <Power color={colors.gray[100]}/>
            </Button.Icon>
            <Button.Text>
              {
                isAdvertActive ? "Desativar anúncio" : "Reativar anúncio"
              }
            </Button.Text>
          </Button>
          <Button 
            bgVariant="light"
            isLoading={isLoadingRemoveProduct}
            onPress={handleRemoveProduct}
          >
            <Button.Icon>
              <TrashSimple color={colors.gray[900]}/>
            </Button.Icon>
            <Button.Text textVariant="dark">Excluir anúncio</Button.Text>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>

  )

}