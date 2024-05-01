import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { ProductsContextProvider } from "../contexts/ProductsContext";
import { Loading } from "../components/Loading";

export function Routes(){
  const {colors} = useTheme()
  const {user, authentication, isLoadingStorageData} = useAuthContext()

  const userExists = Boolean(user.id)

  const theme = DefaultTheme
  theme.colors.background = colors.gray[200]


  useEffect(()=>{
    if(userExists === false){
      authentication()
    }
  }, [])

  if(isLoadingStorageData){
    return <Loading />
  }

  return (
    <Box flex={1} color={"gray.200"}>
      <NavigationContainer theme={theme}>
        {
          userExists ? 
            <ProductsContextProvider>
              <AppRoutes /> 
            </ProductsContextProvider>
          : 
            <AuthRoutes />
        }
      </NavigationContainer>
    </Box>
  )
}