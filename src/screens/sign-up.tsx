import { Center, Heading, ScrollView, Text, VStack } from "native-base";
import { Input } from "../components/Input";

import LogoSvg from "../assets/logo.svg"
import { Button } from "../components/Button";
import { Profile } from "../components/Profile";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

type SignUpFormData = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const SignUpFormDataSchema = yup.object({
  name: yup.string().required("Informe seu nome!"),
  email: yup.string().required("Informe o seu email!").email("Seu email é inválido!"),
  phone: yup.string().required("Informe seu telefone!"),
  password: yup.string().required("Informe sua senha!").min(5, "A senha deve conter no mínimo 5 caracteres!"),
  confirmPassword: yup.string().required("Confirme sua senha!").min(5, "A senha deve conter no mínimo 5 caracteres!").oneOf([yup.ref("password")], "As senhas devem ser iguais!")
})

export function SignUp(){
  const navigation = useNavigation()

  const {handleSubmit, control, formState: {errors}} = useForm<SignUpFormData>({
    resolver: yupResolver(SignUpFormDataSchema)
  })

  function handleSignUp(data: SignUpFormData){
    console.log(data)
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
            <Profile 
              w={88} 
              h={88}
              
              showButtonEdit
            />
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
              name="phone"
              render={({field})=>(
                <Input 
                  placeholder="Telefone"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={errors.phone?.message}
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