import { HStack, Heading, Text, VStack, useTheme, Select, Box, FlatList } from "native-base";
import { CaretDown, CaretUp, Plus } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";

export function Adverts(){
  const {colors} = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [typeOfFilteredAdverts, setTypeOfFilteredAdverts] = useState("all")

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
        <Text>9 anúncios</Text>
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
        data={[1,2,3,4,5]}
        keyExtractor={(item)=>item.toString()}
        numColumns={2}
        columnWrapperStyle={{columnGap:32}}
        showsVerticalScrollIndicator={false}
        renderItem={(({item})=>(
          <Card
            isNew={item%2===0}
            isActive={item%3===1}
            isMyAdvert
            key={item} 
            src={"https://github.com/LUKASRIB15.png"}
          />
        ))}
        contentContainerStyle={{
          paddingBottom: 150,
          rowGap: 32
        }}
      />
    </VStack>
  )
}