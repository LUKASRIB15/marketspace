import { StatusBar } from "react-native";
import { Box, HStack, Heading, ScrollView, Text, VStack, useTheme } from "native-base";
import { Carousel } from "../components/Carousel";
import { Profile } from "../components/Profile";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, Tag } from "phosphor-react-native";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";

export function PreviewNewAdvert(){
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const {colors} = useTheme()

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
        
        <Carousel isActive/>
        
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
                Novo
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
                Bicicleta
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
                <Text> 120,00</Text>
              </Text>
            </HStack>
            <Text
              color={"gray.800"}
              mt={2}
            >
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. 
              Vitae ante leo eget maecenas urna mattis cursus. 
              Mauris metus amet nibh mauris mauris accumsan, euismod. 
              Aenean leo nunc, purus iaculis in aliquam.
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
              <Text>Sim</Text>
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
                 <Money size={20}/>
                 <Text>Dinheiro</Text>
              </HStack>
              <HStack
                space={2}
                alignItems={"center"}
              >
                 <CreditCard size={20}/>
                 <Text>Cartão de Crédito</Text>
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
            onPress={()=>{}}
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