import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, VStack, useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/useAuth";
import { MainLoading } from "../components/MainLoading";

export function Routes() {
  const { colors } = useTheme();

  const { user, isLoadingUserStorageData } = useAuth();


  if(isLoadingUserStorageData) {
    return (
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        bgColor="gray.900"
      >
        <MainLoading size="md" />
      </VStack>
    )
  }

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[900];

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}