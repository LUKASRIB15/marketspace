import { Center, Heading, ScrollView, Text, VStack, useToast } from "native-base";
import { Input } from "../components/Input";

import LogoSvg from "../assets/logo.svg"
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/AuthRoutes";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { api } from "../lib/api";
import { AppError } from "../utils/AppError";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";


type SignInFormData = {
  email: string
  password: string
}

const signInFormDataSchema = yup.object({
  email: yup.string().required("Informe o seu email!").email("Seu email é inválido!"),
  password: yup.string().required("Informe sua senha!").min(5, "A senha deve conter no mínimo 5 caracteres!")
})

export function SignIn(){
  const {signIn} = useAuthContext()
  const toast = useToast()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const [isLoading, setIsLoading] = useState(false)

  const {handleSubmit, control, formState: {errors}} = useForm<SignInFormData>({
    resolver: yupResolver(signInFormDataSchema)
  })

  async function handleSignIn({email, password}:SignInFormData){
    try{
      setIsLoading(true)
      await signIn(email, password)
    }catch(error){
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível realizar login. Tente novamente mais tarde"
      
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bg={"gray.100"}
    >
      <VStack
        flex={1}
      >
        <Center
          bg={"gray.200"}
          px={12}
          pt={110}
          pb={65}
          roundedBottom={24}
        >
          <VStack 
            alignItems={"center"}
          >
            <LogoSvg />
            <Heading 
              fontSize={30}
              fontFamily={'heading'}
              mt={5}
            >
              marketspace
            </Heading>
            <Text 
              fontSize={14}
              color={"gray.700"}
              fontFamily={"body"}
            >
              Seu espaço de compra e venda
            </Text>
          </VStack>
          <VStack
            mt={76}
            mb={8}
            alignItems={"center"}
            space={4}
          >
            <Text>Acesse sua conta</Text>
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
              name="password"
              render={({field})=>(
                <Input 
                  placeholder="Senha"
                  onSubmitEditing={()=>{}}
                  returnKeyType="send"
                  secureTextEntry
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </VStack>
          <Button
            bgVariant="primary"
            w={"100%"}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          >
            <Button.Text>Entrar</Button.Text>
          </Button>
        </Center>
        <VStack
          alignItems={'center'}
          px={12}
          mt={12}
          mb={6}
          space={4}
        >
          <Text
            fontFamily={'body'}
          >
            Ainda não tem acesso?
          </Text>
          <Button
            bgVariant="light"
            w={"100%"}
            onPress={()=>navigation.navigate('signUp')}
          >
            <Button.Text textVariant="dark">Criar uma conta</Button.Text>
          </Button>
        </VStack>
          
      </VStack>
    </ScrollView>
  )
}