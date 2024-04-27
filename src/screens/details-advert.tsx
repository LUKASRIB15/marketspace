import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Heading, ScrollView, Text, VStack, useTheme } from "native-base";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, WhatsappLogo } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { Carousel } from "../components/Carousel";
import { Profile } from "../components/Profile";
import { Button } from "../components/Button";

export function DetailsAdvert(){
  const {colors} = useTheme()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

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
              sourceImage="https://github.com/italoopaula.png"
            />
            <Text>Italo Paula</Text>
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
            <Text> 120,00</Text>
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