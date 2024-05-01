import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, Heading, Image, ScrollView, Text, VStack, useTheme, Radio, useToast, FormControl } from "native-base";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { ArrowLeft, Plus, X } from "phosphor-react-native";
import { useState } from "react";
import { Input } from "../components/Input";
import * as ImagePicker from "expo-image-picker"
import { Switch } from "react-native-switch";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { AppError } from "../utils/AppError";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useProductsContext } from "../hooks/useProductsContext";
import { priceToNumber } from "../utils/priceToNumber";
import { ProductPreview } from "../contexts/ProductsContext";
import { ProductDTO } from "../dtos/products";
import { api } from "../lib/api";
import { formatPrice } from "../utils/formatPrice";

type RouteParams = {
  id: string 
} | undefined

type AdvertFormData = {
  accept_trade: boolean
  condition: "new" | "used" 
  description: string
  price: string
  title: string
}

type paymentMethods = {
  key: "boleto" | "pix" | "cash" | "card" | "deposit"
  name: string
}

const advertFormDataSchema = yup.object({
  accept_trade: yup.boolean().required(),
  condition: yup.string().oneOf(["new", "used"]).required("Escolha uma condição ao produto"),
  description: yup.string().required("Seu anúncio precisa de uma descrição").min(20, "Vamos lá! Adicione no mínimo 20 caracteres para a descrição do seu produto"),
  price: yup.string().required("Adicione um preço ao seu produto").min(4, "Deve ter no mínimo 4 caracteres contando com a vírgula ',' "),
  title: yup.string().required("Adicione um nome para o seu anúncio")
})

export function FormAdvert(){
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()

  
  const {addProductPreview, productsOfUser} = useProductsContext()
  
  const params = route.params as RouteParams
  const productExists = Boolean(params)

  const product:ProductDTO = productExists ? productsOfUser.filter(product=>product.id === params!.id)[0] : {} as ProductDTO
  const imagesOfProduct = productExists ? product.product_images.map(image=>`${api.defaults.baseURL}/images/${image.path}`) : []
  const productCondition = productExists ? product.is_new ? "new" : "used" : undefined
  const paymentMethodsOfProduct = productExists ? product.payment_methods : []

  const [imagesOfAdverts, setImagesOfAdverts] = useState<string[]>(imagesOfProduct)
  const [removedImagesOfAdverts, setRemovedImagesOfAdverts] = useState<string[]>([])
  const [paymentMethods, setPaymentMethods] = useState<paymentMethods[]>(paymentMethodsOfProduct)
  const [isLoading, setIsLoading] = useState(false)

  const paymentMethodsKeys = paymentMethods.map(method=>method.key)


  // Melhorar em breve usando react-hook-form
  const [hasTicket, setHasTicket] = useState(paymentMethodsKeys.includes("boleto"))
  const [hasPix, setHasPix] = useState(paymentMethodsKeys.includes("pix"))
  const [hasMoney, setHasMoney] = useState(paymentMethodsKeys.includes("cash"))
  const [hasBankDeposit, setHasBankDeposit] = useState(paymentMethodsKeys.includes("deposit"))
  const [hasCreditCard, setHasCreditCard] = useState(paymentMethodsKeys.includes("card"))

  const {handleSubmit, control, formState:{errors}} = useForm<AdvertFormData>({
    resolver: yupResolver(advertFormDataSchema),
    defaultValues: {
      title: productExists ? product.name : '',
      description: productExists ? product.description : '',
      condition: productCondition,
      price: productExists ? formatPrice(product.price) : '',
      accept_trade: productExists ? product.accept_trade : false, 
    }
  })

  const {colors} = useTheme()
  const toast = useToast()


  function handleRemoveAdvertImageOfAdvert(imageDeleted:string){
    const imagesOfAdvertWithoutRemovedOne = imagesOfAdverts.filter((image)=>{
      return image !== imageDeleted
    })
    const imageExistsInServer = product.product_images.filter(image=>{
      return `${api.defaults.baseURL}/images/${image.path}` === imageDeleted
    })[0]

    if(imageExistsInServer){
      setRemovedImagesOfAdverts(prevState=>[...prevState, imageExistsInServer.id])
    }
    setImagesOfAdverts(imagesOfAdvertWithoutRemovedOne)
  }

  async function handleCreatePreviewOfNewAdvert({title, price, accept_trade, condition, description}:AdvertFormData){
    try{
      setIsLoading(true)
      if(imagesOfAdverts.length === 0){
        throw new AppError("É preciso cadastrar no mínimo uma imagem para o seu anúncio!")
      }

      if(paymentMethods.length === 0){
        throw new AppError("É preciso cadastrar no mínimo uma forma de pagamento válido!")
      }

      if(removedImagesOfAdverts.length !== 0){
        await api.delete("/products/images", {
          data: {
            productImagesIds: removedImagesOfAdverts
          }
        })
      }

      const is_new = condition === "new" ? true : false
      const priceInNumber = priceToNumber(price)

      const productPreview:ProductPreview = {
        title,
        accept_trade,
        description,
        is_new,
        price: priceInNumber,
        is_active: true,
        payment_methods: paymentMethods,
        product_images: imagesOfAdverts
      }

      addProductPreview(productPreview)
      navigation.navigate('previewNewAdvert', productExists ? {id: params!.id} : undefined)
      
    }catch(error){
      if(error instanceof AppError){
        toast.closeAll()

        toast.show({
          title: error.message,
          placement: "top",
          bg: "red.500"
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAdvertPhotoSelect(){
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4]
    })

    if(photoSelected.assets && photoSelected.assets[0].uri){
      setImagesOfAdverts((prevState)=>{
        return [photoSelected.assets[0].uri, ...prevState]
      })
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <VStack
        mt={16}
        px={6}
      >
        <HStack
          mb={6}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading
            fontFamily={"heading"}
            fontSize={"lg"}
            color={"gray.900"}
          >
            {productExists ? "Editar anúncio" : "Criar anúncio"}
          </Heading>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>navigation.goBack()}
            style={{
              position:"absolute",
              left: 0
            }}
          >
            <ArrowLeft color={colors.gray[900]}/>
          </TouchableOpacity>
        </HStack>
        <VStack>
          <Heading
            color={"gray.800"}
            fontFamily={"heading"}
            fontSize={"md"}
          >
            Imagens
          </Heading>
          <Text
            lineHeight={"sm"}
          >
            Escolha imagens para mostrar o quanto seu produto é incrível!
          </Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1 }}
          >
            <HStack
              mt={4}
              space={2}
            > 
              {imagesOfAdverts.map(image=>{
                return (
                  <Box
                    key={image}
                  >
                    <Image
                      source={{uri: image}} 
                      w={100}
                      h={100}
                      rounded={6}
                      alt=""
                    />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={()=>handleRemoveAdvertImageOfAdvert(image)}
                      style={{
                        backgroundColor: colors.gray[800],
                        position: "absolute",
                        padding: 2,
                        top: 4,
                        right: 4,
                        borderRadius: 999,
                      }}
                    >
                      <X size={12} color={colors.gray[100]}/>
                    </TouchableOpacity>
                  </Box>
                )
              })}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleAdvertPhotoSelect}
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: colors.gray[300],
                  borderRadius:6,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Plus color={colors.gray[500]}/>
              </TouchableOpacity>
            </HStack>
          </ScrollView>
        </VStack>
        <VStack
          mt={8}
          space={4}
        >
          <Heading
            color={"gray.800"}
            fontFamily={"heading"}
            fontSize={"md"}
          >
            Sobre o produto
          </Heading>
          <Controller 
            control={control}
            name="title"
            render={({field})=>(
              <Input 
                placeholder="Título de anúncio"
                value={field.value}
                onChangeText={field.onChange}
                errorMessage={errors.title?.message}
              />
            )}
          />
            
          <Controller 
            control={control}
            name="description"
            render={({field})=>(
              <Input 
                placeholder="Descrição do produto"
                multiline
                textAlignVertical="top"
                h={160}
                errorMessage={errors.description?.message}
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
            
          <Controller 
            control={control}
            name="condition"
            render={({field})=>(
              <FormControl isInvalid={Boolean(errors.condition?.message)}>
                <Radio.Group
                  name="condition"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <HStack
                    space={5}
                    justifyContent={"space-between"}
                  >
                    <Radio 
                      value="new"
                      bg={"gray.200"}
                      _checked={{
                        borderColor: "blue.500",
                        _icon:{
                          color: "blue.500"
                        }
                      }}
                    >
                      Produto novo
                    </Radio>
                    <Radio 
                      value="used"
                      bg={"gray.200"}
                      _checked={{
                        borderColor: "blue.500",
                        _icon:{
                          color: "blue.500"
                        }
                      }}
                    >
                      Produto usado
                    </Radio>
                  </HStack>
                </Radio.Group>
                <FormControl.ErrorMessage>{errors.condition?.message}</FormControl.ErrorMessage>
              </FormControl>
            )}
          />
          
        </VStack>
        <VStack
          mt={8}
        >
          <Heading
            color={"gray.800"}
            fontFamily={"heading"}
            fontSize={"md"}
          >
            Venda
          </Heading>
            <Box
              mt={3}
            >
              
              <Controller 
                control={control}
                name="price"
                render={({field})=>(
                  <FormControl isInvalid={Boolean(errors.price?.message)}>
                    <Input 
                      w={"100%"}
                      fontSize={'md'}
                      fontFamily={'body'}
                      rounded={6}
                      bg={'gray.100'}
                      borderWidth={0}
                      py={3}
                      pl={4}
                      isInvalid={Boolean(errors.price?.message)}
                      placeholder="Valor do produto"
                      placeholderTextColor={'gray.500'}
                      keyboardType="numeric"
                      _invalid={{
                        borderWidth: 1,
                        borderColor: "red.500"
                      }}
                      _focus={{
                        bg: 'gray.100',
                        borderWidth: 1,
                        borderColor: 'gray.700'
                      }}
                      style={{
                        paddingLeft: 44
                      }}
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                    <FormControl.ErrorMessage>{errors.price?.message}</FormControl.ErrorMessage>
                  </FormControl>
                )}
              />
                    
              <Text
                fontSize={'md'}
                color={"gray.900"}
                position={"absolute"}
                left={4}
                lineHeight={'2xl'}
                top={2}
              >
                R$
              </Text>
            </Box>

        </VStack>
        <VStack
            mt={4}
            space={3}
          >
            <Text
              fontFamily={'heading'}
              color={"gray.800"}
            >
              Aceita troca?
            </Text>
            
            <Controller 
              control={control}
              name="accept_trade"
              render={({field})=>(
                <Switch 
                  value={field.value}
                  onValueChange={field.onChange}
                  activeText=""
                  inActiveText=""
                  backgroundActive={colors.blue[500]}
                  backgroundInactive={colors.gray[300]}
                  circleBorderActiveColor={colors.blue[500]}
                  circleBorderInactiveColor={colors.gray[300]}
                />
              )}
            />
            
        </VStack>
        <VStack
            mt={4}
            space={3}
            mb={6}
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
      </VStack>
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
            <Button.Text textVariant="dark">Cancelar</Button.Text>
          </Button>
          <Button 
            bgVariant="dark" 
            flex={1}
            onPress={handleSubmit(handleCreatePreviewOfNewAdvert)}
            isLoading={isLoading}
          >
            <Button.Text>Avançar</Button.Text>
          </Button>
        </HStack>
    </ScrollView>
  )
}