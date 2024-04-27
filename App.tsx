import { StatusBar } from 'react-native';
import {Karla_400Regular, Karla_700Bold, useFonts} from "@expo-google-fonts/karla";
import { Center, NativeBaseProvider, Spinner, useTheme } from 'native-base';
import { THEME } from './src/theme';
import { Routes } from './src/routes';


export default function App() {

  const [hasLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
    <StatusBar barStyle="dark-content" backgroundColor='#EDECEE' translucent/>
      {
        hasLoaded ?
          <Routes/>
        :
          <Center flex={1}>
            <Spinner />
          </Center>
      } 
    </NativeBaseProvider>
  );
}
