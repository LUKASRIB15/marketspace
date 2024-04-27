import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignIn } from "../screens/sign-in"
import { SignUp } from "../screens/sign-up"

// Rotas públicas
type AuthRoutesParamsProps = {
  signIn: undefined
  signUp: undefined
} 

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesParamsProps>

const Stack = createNativeStackNavigator<AuthRoutesParamsProps>()

export function AuthRoutes(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "ios"
      }}
    >
      <Stack.Screen name="signIn" component={SignIn}/>
      <Stack.Screen name="signUp" component={SignUp}/>
    </Stack.Navigator>
  )
}