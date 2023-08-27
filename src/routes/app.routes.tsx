import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { useTheme } from "native-base";

import { Platform } from "react-native";
import { Transactions } from "../screens/Transactions";
import { Feather } from "@expo/vector-icons";
import { NewTransaction } from "../screens/NewTransaction";

type AppRoutes = {
  transactions: undefined;
  newTransaction: undefined;
  coinBot: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.amber[400],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="dollar-sign" color={color} size={26} style={{ width: 24, height: 24 }}  />
          ),
        }}
      />

      <Screen
        name="newTransaction"
        component={NewTransaction}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
