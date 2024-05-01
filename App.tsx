import { StatusBar } from 'react-native';
import {Karla_400Regular, Karla_700Bold, useFonts} from "@expo-google-fonts/karla";
import { Center, NativeBaseProvider, Spinner, useTheme } from 'native-base';
import { THEME } from './src/theme';
import { Routes } from './src/routes';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Loading } from './src/components/Loading';


export default function App() {

  const [hasLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
    <StatusBar barStyle="dark-content" backgroundColor='#EDECEE' translucent/>
      <AuthContextProvider>
        {
          hasLoaded ?
            
            <Routes/>
           
          :
            <Loading />
        } 
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
