import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Catalog } from "../screens/catalog"
import { Adverts } from "../screens/adverts"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Text, useTheme } from "native-base"
import { TouchableOpacity } from "react-native"
import { House, SignOut, Tag } from "phosphor-react-native"

type TabRoutesParamsProps = {
  catalog: undefined
  adverts: undefined
  exit: undefined
}

export type TabNavigatorRoutesProps = NativeStackNavigationProp<TabRoutesParamsProps>

const Tabs = createBottomTabNavigator<TabRoutesParamsProps>()

export function TabRoutes(){
  const {colors} = useTheme()

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[800],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0
        }
      }}
    >
      <Tabs.Screen 
        name="catalog" 
        component={Catalog}
        options={{
          tabBarIcon: ({focused})=> (
            <House 
              color={focused ? colors.gray[800] : colors.gray[500]} 
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="adverts" 
        component={Adverts}
        options={{
          tabBarIcon: ({focused})=> (
            <Tag 
              color={focused ? colors.gray[800] : colors.gray[500]} 
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="exit"  
        children={()=>{
          console.log("cliquei")
          return null
        }}
        options={{
          tabBarIcon: ()=> <SignOut color={colors.red[500]}/>
        }} 
      />
    </Tabs.Navigator>
  )
}