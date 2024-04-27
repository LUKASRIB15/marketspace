import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Heading, Image, ScrollView, Text, VStack, useTheme, Radio } from "native-base";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/AppRoutes";
import { ArrowLeft, Plus, X } from "phosphor-react-native";
import { useState } from "react";
import { Input } from "../components/Input";
import * as ImagePicker from "expo-image-picker"
import { Switch } from "react-native-switch";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";

export function FormAdvert(){
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [imagesOfAdverts, setImagesOfAdverts] = useState<string[]>([])

  const [acceptTrade, setAcceptTrade] = useState(false)
  const [hasTicket, setHasTicket] = useState(false)
  const [hasPix, setHasPix] = useState(false)
  const [hasMoney, setHasMoney] = useState(false)
  const [hasBankDeposit, setHasBankDeposit] = useState(false)
  const [hasCreditCard, setHasCreditCard] = useState(false)

  const {colors} = useTheme()

  function handleRemoveAdvertImageOfAdvert(imageDeleted:string){
    const imagesOfAdvertWithoutRemovedOne = imagesOfAdverts.filter((image)=>{
      return image !== imageDeleted
    })

    setImagesOfAdverts(imagesOfAdvertWithoutRemovedOne)
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
            Criar anúncio
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
            Escolha até 3 imagens para mostrar o quanto seu produto é incrível!
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
          <Input 
            placeholder="Título de anúncio"
          />
          <Input 
            placeholder="Descrição do produto"
            multiline
            textAlignVertical="top"
            h={160}
            
          />
          <Radio.Group
            name="condition"
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
            <Input 
              w={"100%"}
              fontSize={'md'}
              fontFamily={'body'}
              rounded={6}
              bg={'gray.100'}
              borderWidth={0}
              py={3}
              pl={4}
              placeholder="Valor do produto"
              placeholderTextColor={'gray.500'}
              keyboardType="numeric"
              _focus={{
                bg: 'gray.100',
                borderWidth: 1,
                borderColor: 'gray.700'
              }}
              style={{
                paddingLeft: 44
              }}
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
            
            <Switch 
              value={acceptTrade}
              onValueChange={setAcceptTrade}
              activeText=""
              inActiveText=""
              backgroundActive={colors.blue[500]}
              backgroundInactive={colors.gray[300]}
              circleBorderActiveColor={colors.blue[500]}
              circleBorderInactiveColor={colors.gray[300]}
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
                onValueChange={()=>setHasTicket(!hasTicket)}
              />
              <Checkbox 
                isChecked={hasPix}
                label="Pix"
                onValueChange={()=>setHasPix(!hasPix)}
              />
              <Checkbox 
                isChecked={hasMoney}
                label="Dinheiro"
                onValueChange={()=>setHasMoney(!hasMoney)}
              />
              <Checkbox 
                isChecked={hasCreditCard}
                label="Cartão de crédito"
                onValueChange={()=>setHasCreditCard(!hasCreditCard)}
              />
              <Checkbox 
                isChecked={hasBankDeposit}
                label="Depósito bancário"
                onValueChange={()=>setHasBankDeposit(!hasBankDeposit)}
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
          >
            <Button.Text textVariant="dark">Cancelar</Button.Text>
          </Button>
          <Button 
            bgVariant="dark" 
            flex={1}
            onPress={()=>navigation.navigate('previewNewAdvert')}
          >
            <Button.Text>Avançar</Button.Text>
          </Button>
        </HStack>
    </ScrollView>
  )
}