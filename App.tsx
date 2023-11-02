import { NativeBaseProvider, StatusBar } from "native-base";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await preventAutoHideAsync();
    }

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return undefined;
  } else {
    hideAsync();
  }

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#18181b"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded && (
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
        )}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
