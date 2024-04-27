import { HStack, Heading, Text, VStack, useTheme, Input, Box, Divider, FlatList } from "native-base";
import { Profile } from "../components/Profile";
import { Button } from "../components/Button";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { Card } from "../components/Card";
import { FilterAdverts } from "../components/FilterAdverts";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";

export function Catalog(){
  const {colors} = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [openFilterAdverts, setOpenFilterAdverts] = useState(false)

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
            sourceImage="https://github.com/LUKASRIB15.png"
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
              Lucas!
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
                  4
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
          />
          <HStack
            position={"absolute"}
            right={4}
            bottom={3.5}
            space={4}
          >
            <TouchableOpacity>
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
      <FlatList 
        data={[1,2,3,4,5,6,7,8,9,10]}
        keyExtractor={(item)=>item.toString()}
        numColumns={2}
        columnWrapperStyle={{columnGap:32}}
        showsVerticalScrollIndicator={false}
        renderItem={(({item})=>(
          <Card
            isNew={item%3===0}
            isActive={item%4===2}
            key={item}
            src={"https://github.com/italoopaula.png"}
          />
        ))}
        contentContainerStyle={{
          paddingBottom: 50,
          alignItems: "center",
          rowGap: 32
        }}
      />
      <FilterAdverts
        isOpen={openFilterAdverts}
        onClose={() => setOpenFilterAdverts(false)}
      />  
    </VStack>
  )
}