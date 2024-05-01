import { HStack, Heading, Text, VStack, useTheme, Select, Box, FlatList } from "native-base";
import { CaretDown, CaretUp, Plus } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Card } from "../components/Card";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { useProductsContext } from "../hooks/useProductsContext";
import { api } from "../lib/api";
import { useAuthContext } from "../hooks/useAuthContext";

export function Adverts(){
  const {colors} = useTheme()
  const {productsOfUser, getProductsOfUser} = useProductsContext()
  const {user} = useAuthContext()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [typeOfFilteredAdverts, setTypeOfFilteredAdverts] = useState("all")

  const products = productsOfUser.filter((product)=>{
    if(typeOfFilteredAdverts === "actives"){
      return product.is_active
    }else if(typeOfFilteredAdverts === "inactives"){
      return product.is_active === false
    }

    return product
  })

  const screenWidth = Dimensions.get("window").width

  useFocusEffect(useCallback(()=>{
    getProductsOfUser()
  },[]))

  return (
    <VStack
      mt={16}
      px={6}
    >
      <HStack
        mb={8}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          fontFamily={"heading"}
          fontSize={"lg"}
          color={"gray.900"}
        >
          Meus anúncios
        </Heading>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=>navigation.navigate("formAdvert")}
          style={{
            position:"absolute",
            right: 0
          }}
        >
          <Plus color={colors.gray[900]}/>
        </TouchableOpacity>
      </HStack>
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={5}
      >
        <Text>{products.length} anúncios</Text>
        <Box>
          <Select
            minWidth={"110"}
            fontSize={"base"}
            selectedValue={typeOfFilteredAdverts}
            onValueChange={(value)=>setTypeOfFilteredAdverts(value)}
            dropdownCloseIcon={
              <CaretDown
                color={colors.gray[900]}
              />
            }
            dropdownOpenIcon={
              <CaretUp
                color={colors.gray[900]}
              />
            }
          >
            <Select.Item label="Todos" value="all"/>
            <Select.Item label="Ativos" value="actives"/>
            <Select.Item label="Inativos" value="inactives"/>
          </Select>
        </Box>
      </HStack>
      <FlatList 
        data={products}
        keyExtractor={(item)=>item.toString()}
        numColumns={2}
        columnWrapperStyle={{columnGap: screenWidth-(154*2)-(24*2)}}
        showsVerticalScrollIndicator={false}
        renderItem={(({item})=>{
          return(
            <Card
              isNew={item.is_new}
              isActive={item.is_active}
              nameOfProduct={item.name}
              price={item.price}
              isMyAdvert
              key={item.id} 
              idOfProduct={item.id}
              src={`${api.defaults.baseURL}/images/${user.avatar}`}
              srcOfProduct={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
            />
          )
        })}
        contentContainerStyle={{
          paddingBottom: 150,
          rowGap: 32
        }}
      />
    </VStack>
  )
}