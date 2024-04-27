import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AuthRoutes } from "./AuthRoutes";
import { TabRoutes } from "./TabRoutes";
import { AppRoutes } from "./AppRoutes";

export function Routes(){
  const {colors} = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[200]

  return (
    <Box flex={1} color={"gray.200"}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}