import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Heading, ScrollView, Text, VStack, useTheme } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, PencilSimpleLine, Power, QrCode, TrashSimple, WhatsappLogo } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { Carousel } from "../components/Carousel";
import { Profile } from "../components/Profile";
import { Button } from "../components/Button";
import { useState } from "react";

export function DetailsMyAdvert(){
  const [isAdvertActive, setIsAdvertActive] = useState(true)

  const {colors} = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

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
            onPress={()=>navigation.navigate("formAdvert")}
          >
            <PencilSimpleLine color={colors.gray[900]}/>
          </TouchableOpacity>
        </HStack>
        
        <Carousel isActive={isAdvertActive} />

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
              sourceImage="https://github.com/LUKASRIB15.png"
            />
            <Text>Lucas Ribeiro</Text>
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
                Usado
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
                Luminária pendente
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
                <Text> 45,00</Text>
              </Text>
            </HStack>
            <Text
              color={"gray.800"}
              mt={2}
            >
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. 
              Vitae ante leo eget maecenas urna mattis cursus. 
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
              <Text>Não</Text>
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
              <HStack
                space={2}
                alignItems={"center"}
              >
                 <Barcode size={20}/>
                 <Text>Boleto</Text>
              </HStack>
              <HStack
                space={2}
                alignItems={"center"}
              >
                 <QrCode size={20}/>
                 <Text>Pix</Text>
              </HStack>
              <HStack
                space={2}
                alignItems={"center"}
              >
                 <Bank size={20}/>
                 <Text>Depósito Bancário</Text>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
        <VStack
          mt={6}
          px={6}
          space={2}
          mb={12}
        >
          <Button bgVariant={isAdvertActive ? "dark" : "primary"} onPress={()=>setIsAdvertActive(!isAdvertActive)}>
            <Button.Icon>
              <Power color={colors.gray[100]}/>
            </Button.Icon>
            <Button.Text>
              {
                isAdvertActive ? "Desativar anúncio" : "Reativar anúncio"
              }
            </Button.Text>
          </Button>
          <Button bgVariant="light">
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