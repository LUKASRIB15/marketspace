import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import { TabNavigatorRoutesProps, TabRoutes } from "./TabRoutes"
import { DetailsAdvert } from "../screens/details-advert"
import { DetailsMyAdvert } from "../screens/details-my-advert"
import { FormAdvert } from "../screens/form-advert"
import { PreviewNewAdvert } from "../screens/preview-new-advert"

type AppRoutesParamsProps = {
  tabRoutes: TabNavigatorRoutesProps
  detailsAdvert: undefined
  detailsMyAdvert: undefined
  formAdvert: undefined
  previewNewAdvert: undefined
} 

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesParamsProps>

const Stack = createNativeStackNavigator<AppRoutesParamsProps>()

export function AppRoutes(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "ios"
      }}
    >
      <Stack.Screen name="tabRoutes" component={TabRoutes}/>
      <Stack.Screen name="detailsAdvert" component={DetailsAdvert}/>
      <Stack.Screen name="detailsMyAdvert" component={DetailsMyAdvert} />
      <Stack.Screen name="formAdvert" component={FormAdvert} />
      <Stack.Screen name="previewNewAdvert" component={PreviewNewAdvert} />
    </Stack.Navigator>

  )
}