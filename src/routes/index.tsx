import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/useAuth";
import { MainLoading } from "../components/MainLoading";

export function Routes() {
  const { colors } = useTheme();

  const { user, isLoadingUserStorageData } = useAuth();


  if(isLoadingUserStorageData) {
    return <MainLoading size="md" />
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