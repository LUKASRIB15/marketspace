import { Box, Center, Heading, Image, ScrollView, Text, VStack, useTheme, useToast } from "native-base";
import { Input } from "../components/Input";

import LogoSvg from "../assets/logo.svg"
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker"
import { PencilSimpleLine } from "phosphor-react-native";

import AvatarPng from "../assets/avatar.png"
import { AppError } from "../utils/AppError";
import { useAuthContext } from "../hooks/useAuthContext";
import { NewUser } from "../contexts/AuthContext";

type SignUpFormData = {
  name: string
  email: string
  tel: string
  password: string
  confirmPassword: string
}

const SignUpFormDataSchema = yup.object({
  name: yup.string().required("Informe seu nome!"),
  email: yup.string().required("Informe o seu email!").email("Seu email é inválido!"),
  tel: yup.string().required("Informe seu telefone!"),
  password: yup.string().required("Informe sua senha!").min(5, "A senha deve conter no mínimo 5 caracteres!"),
  confirmPassword: yup.string().required("Confirme sua senha!").min(5, "A senha deve conter no mínimo 5 caracteres!").oneOf([yup.ref("password")], "As senhas devem ser iguais!")
})

export function SignUp(){
  const navigation = useNavigation()
  const {colors} = useTheme()
  const toast = useToast()
  const {signUp} = useAuthContext()

  const [imageProfile ,setImageProfile] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {handleSubmit, control, formState: {errors}} = useForm<SignUpFormData>({
    resolver: yupResolver(SignUpFormDataSchema)
  })

  async function handleSignUp({name, email, tel, password}: SignUpFormData){
    try{
      setIsLoading(true)
      if(!imageProfile){
        throw new AppError('É necessário cadastrar uma imagem de perfil')
      }

      const newUser : NewUser = {
        name,
        email,
        tel,
        password,
        avatar: imageProfile
      }

      await signUp(newUser)
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível criar uma conta. Tente novamente mais tarde!"
    
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

  async function handleAddPhotoOfProfile(){
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4]
    })

    if(photoSelected.assets && photoSelected.assets[0].uri){
      setImageProfile(photoSelected.assets[0].uri)
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        pb={20}
      >
        <Center
          px={12}
          pt={16}          
        >
          <VStack 
            alignItems={"center"}
          >
            <LogoSvg width={60} height={40}/>
            <Heading 
              fontSize={'xl'}
              fontFamily={'heading'}
              mt={5}
            >
              Boas vindas!
            </Heading>
            <Text 
              
              color={"gray.700"}
              fontFamily={"body"}
              textAlign={'center'}
            >
              Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
            </Text>
          </VStack>
          <VStack
            mt={8}
            mb={8}
            alignItems={"center"}
            space={4}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddPhotoOfProfile}
            >
              
              <Image 
                source={imageProfile ? {uri: imageProfile} : AvatarPng} 
                alt="Imagem de perfil atual do usuário" 
                w={88} 
                h={88}
                rounded={999}
                borderWidth={3}
                borderColor={'blue.500'}
                resizeMode="cover"
              />
                <Box
                  p={3}
                  rounded={999}
                  bg={"blue.500"}
                  position={"absolute"}
                  bottom={-5}
                  right={-5}
                >
                  <PencilSimpleLine size={16} color={colors.gray[100]}/>
                </Box>
              
            </TouchableOpacity>
            <Controller 
              control={control}
              name="name"
              render={({field})=>(
                <Input 
                  placeholder="Nome"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller 
              control={control}
              name="email"
              render={({field})=>(
                <Input 
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller 
              control={control}
              name="tel"
              render={({field})=>(
                <Input 
                  placeholder="Telefone"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={errors.tel?.message}
                />
              )}
            />
            <Controller 
              control={control}
              name="password"
              render={({field})=>(
                <Input 
                  placeholder="Senha"
                  secureTextEntry
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller 
              control={control}
              name="confirmPassword"
              render={({field})=>(
                <Input 
                  placeholder="Confirmar Senha"
                  onSubmitEditing={()=>{}}
                  returnKeyType="send"
                  secureTextEntry
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
          </VStack>
          <Button
            bgVariant="dark"
            w={"100%"}
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          >
            <Button.Text>Criar</Button.Text>
          </Button>
        </Center>
        <VStack
          alignItems={'center'}
          px={12}
          mt={12}
          space={4}
        >
          <Text
            fontFamily={'body'}
          >
            Já tem uma conta?
          </Text>
          <Button
            bgVariant="light"
            w={"100%"}
            onPress={()=>navigation.goBack()}
          >
            <Button.Text textVariant="dark">Ir para o login</Button.Text>
          </Button>
        </VStack>
          
      </VStack>
    </ScrollView>
  )
}