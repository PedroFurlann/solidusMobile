import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { ForgotPassword } from "../screens/ForgotPassword";


type AuthRoutes = {
  login: undefined;
  register: undefined;
  forgotPassword: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
      <Screen name="forgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}
