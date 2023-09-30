import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Text, useTheme } from "native-base";

import { Platform } from "react-native";
import { Transactions } from "../screens/Transactions";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { NewTransaction } from "../screens/NewTransaction";
import { Profile } from "../screens/Profile";
import { CoinBot } from "../screens/CoinBot";
import { TransactionDetails } from "../screens/TransactionDetails";

type AppRoutes = {
  transactions: undefined;
  newTransaction: undefined;
  coinBot: undefined;
  profile: undefined;
  transactionDetails: {
    transactionId: number;
  };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.amber[400],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[900],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 52 : 96,
          paddingBottom: sizes[1],
          paddingTop: sizes[4],
        },
      }}
    >
      <Screen
        name="transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather
              name="dollar-sign"
              color={color}
              size={20}
              style={{ width: 28, height: 28, marginLeft: 3 }}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text color={color} bold style={{ fontSize: 13 }}>
              Transações
            </Text>
          ),
        }}
      />

      <Screen
        name="coinBot"
        component={CoinBot}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="robot-excited"
              color={color}
              size={20}
              style={{ width: 28, height: 28, marginLeft: 6 }}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text color={color} bold style={{ fontSize: 13 }}>
              Coin Bot
            </Text>
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather
              name="user"
              color={color}
              size={20}
              style={{ width: 28, height: 28, marginLeft: 6 }}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text color={color} bold style={{ fontSize: 13 }}>
              Perfil
            </Text>
          ),
        }}
      />

      <Screen
        name="newTransaction"
        component={NewTransaction}
        options={{ tabBarButton: () => null }}
      />

    <Screen
        name="transactionDetails"
        component={TransactionDetails}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
