import { NativeBaseProvider, StatusBar } from 'native-base'
import { Login } from './src/screens/Login';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Register } from './src/screens/Register';
import { Routes } from './src/routes';
import { Transactions } from './src/screens/Transactions';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded && <Transactions />}
    </NativeBaseProvider>
  )
};
