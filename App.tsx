import { NativeBaseProvider, StatusBar } from "native-base";
import { Login } from "./src/screens/Login";
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { MainLoading } from "./src/components/MainLoading";
import { useEffect } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await preventAutoHideAsync()
    }

    prepare()
  }, [fontsLoaded])

  if(!fontsLoaded) {
    return undefined
  } else {
    hideAsync();
  }

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>{fontsLoaded && <Routes />}</AuthContextProvider>
    </NativeBaseProvider>
  );
}
