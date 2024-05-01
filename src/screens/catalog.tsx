import { HStack, Heading, Text, VStack, useTheme, Input, Box, Divider, FlatList, useToast } from "native-base";
import { Profile } from "../components/Profile";
import { Button } from "../components/Button";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";
import { Dimensions, TouchableOpacity } from "react-native";
import { Card } from "../components/Card";
import { FilterAdverts } from "../components/FilterAdverts";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { useAuthContext } from "../hooks/useAuthContext";
import { api } from "../lib/api";
import { useProductsContext } from "../hooks/useProductsContext";
import { AppError } from "../utils/AppError";
import { Loading } from "../components/Loading";

export function Catalog(){
  const {user} = useAuthContext()
  const {
    productsOfUser, 
    listOfOthersProducts,
    getProductsOfUser, 
    searchProducts, 
    selectedFilters,
    fetchOthersProductsWhenRenderingFirstTime
  } = useProductsContext()
  const {colors} = useTheme()
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [query, setQuery] = useState('')
  const [openFilterAdverts, setOpenFilterAdverts] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const firstName = user.name.split(' ')[0]
  const screenWidth = Dimensions.get('window').width
  const productsActives = productsOfUser.filter(product=>{
    return product.is_active
  })

  async function handleSearchProducts(){
    try{
      setIsLoading(true)
      await searchProducts(selectedFilters, query)
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível realizar buscas dos produtos"

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

  useFocusEffect(useCallback(()=>{
    try{
      getProductsOfUser()
      fetchOthersProductsWhenRenderingFirstTime()
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível buscar informações sobre os produtos. Tente novamente mais tarde!"
    
      toast.closeAll()

      toast.show({
        title,
        placement: "top",
        bg: "red.500"
      })
    }
  },[]))

  return (
    <VStack
      flex={1}
      mt={16}
      mx={6}  
    >
      <HStack
        mb={8}
        justifyContent={"space-between"}
      >
        <HStack
          alignItems={"center"}
          space={2}
        >
          <Profile 
            w={45} 
            h={45}
            sourceImage={`${api.defaults.baseURL}/images/${user.avatar}`}
          />
          <VStack>
            <Text
              fontSize={'md'}
              color={'gray.700'}
            >
              Boas vindas,
            </Text>
            <Heading
              fontSize={'md'}
            >
              {firstName}!
            </Heading>
          </VStack>
        </HStack>
        <Button
          bgVariant="dark"
          rounded={6}
          onPress={()=>navigation.navigate("formAdvert")}
        >
          <Button.Icon>
            <Plus color={colors.gray[200]} size={18}/>
          </Button.Icon>
          <Button.Text>
            Criar anúncio
          </Button.Text>
        </Button>
      </HStack>
      <VStack
        mb={8}
      >
        <Text
          mb={3}
        >
          Seus produtos anunciados para venda
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
        >
          <HStack
            style={{backgroundColor: 'rgba(100, 122, 199, 0.1)'}}
            rounded={6}
            alignItems={"center"}
            justifyContent={"space-between"}
            py={3}
            pl={4}
            pr={5}
          >
            <HStack
              alignItems={"center"}
              space={4}
            >
              <Tag color={colors.blue[700]}/>
              <VStack>
                <Heading
                  color={"gray.800"}
                  fontSize={'lg'}
                >
                  {productsActives.length}
                </Heading>
                <Text
                  fontSize={'xs'}
                >anúncios ativos</Text>
              </VStack>
            </HStack>
            <HStack
              alignItems={"center"}
              space={2}
            >
              <Text
                fontFamily={'heading'}
                fontSize={'xs'}
                color={'blue.700'}
              >Meus anúncios</Text>
              <ArrowRight color={colors.blue[700]} size={16}/>
            </HStack>
          </HStack>
        </TouchableOpacity>
      </VStack>
      <VStack
        mb={4}
      >
        <Text>Compre produtos variados</Text>
        <Box
          mt={3}
        >
          <Input 
            w={"100%"}
            fontSize={'md'}
            fontFamily={'body'}
            rounded={6}
            bg={'gray.100'}
            borderWidth={0}
            py={3}
            pl={4}
            placeholder="Buscar anúncio"
            placeholderTextColor={'gray.500'}
            _focus={{
              bg: 'gray.100',
              borderWidth: 1,
              borderColor: 'gray.700'
            }}
            style={{
              paddingRight: 112
            }}
            value={query}
            onChangeText={setQuery}
          />
          <HStack
            position={"absolute"}
            right={4}
            bottom={3.5}
            space={4}
          >
            <TouchableOpacity
              onPress={handleSearchProducts}
            >
              <MagnifyingGlass />
            </TouchableOpacity>
            <Divider orientation="vertical"/>
            <TouchableOpacity
              onPress={() => setOpenFilterAdverts(true)}
            >
              <Sliders />
            </TouchableOpacity>
          </HStack> 
        </Box>
      </VStack>
      {
        isLoading ?
          <Loading />
          :
          <FlatList 
        data={listOfOthersProducts}
        keyExtractor={(item)=>item.id}
        numColumns={2}
        columnWrapperStyle={{columnGap: screenWidth-(154*2)-(24*2)}}
        showsVerticalScrollIndicator={false}
        renderItem={(({item})=>(
          <Card
            idOfProduct={item.id}
            nameOfProduct={item.name}
            price={item.price}
            isNew={item.is_new}
            isActive
            key={item.id}
            src={`${api.defaults.baseURL}/images/${item.user.avatar}`}
            srcOfProduct={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
          />
        ))}
        contentContainerStyle={{
          paddingBottom: 50,
          rowGap: 32
        }}
      />
      }
      <FilterAdverts
        isOpen={openFilterAdverts}
        onClose={() => setOpenFilterAdverts(false)}
      />  
    </VStack>
  )
}