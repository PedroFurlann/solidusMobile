import { IconButton, Input, ScrollView, Text, VStack } from "native-base";
import { AuthHeader } from "../components/AuthHeader";
import LottieView from "lottie-react-native";
import GoogleIcon from "../assets/googlcon.svg";
import { useEffect, useRef, useState } from "react";
import {
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../components/Button";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()


  const loginSchema = yup.object({
    email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
    password: yup
      .string()
      .required("Informe a senha.")
      .min(6, "A senha deve ter no mínimo 6 caracteres."),
  });

  function handleSignIn({ email, password }: FormData) {
    console.log(email, password);
  }

  function handleGoToRegister() {
    navigate('register')
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const animation = useRef<any>(null);
  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader />
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        pb={10}
        bgColor="gray.900"
        px={12}
      >
        <LottieView
          source={require("../lib/lottie/money.json")}
          style={{ width: 200, height: 200, marginBottom: 16 }}
          ref={animation}
        />

        <Text
          color="white"
          fontWeight="bold"
          mb={4}
          fontFamily="heading"
          fontSize="2xl"
        >
          Faça Login
        </Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: "Informe o e-mail" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Email"
              mb={errors.email?.message ? 2 : 0}
              fontWeight="medium"
              value={value}
              type="text"
              fontSize="sm"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
            />
          )}
        />
        <Text color="red.500" mb={2} fontWeight="bold">
          {errors.email?.message}
        </Text>

        <Controller
          control={control}
          name="password"
          rules={{ required: "Informe a senha" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Senha"
              fontWeight="medium"
              secureTextEntry={!showPassword}
              onChangeText={onChange}
              value={value}
              mb={errors.password?.message ? 2 : 0}

              type="password"
              fontSize="sm"
              InputRightElement={
                <TouchableNativeFeedback
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    style={{ marginRight: 12 }}
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={21}
                    color="#71717a"
                  />
                </TouchableNativeFeedback>
              }
            />
          )}
        />

        <Text mb={2} color="red.500" fontWeight="bold">
          {errors.password?.message}
        </Text>

        <Button
          onSubmit={handleSubmit(handleSignIn)}
          title="Entrar"
          backgroundColor="#fbbf24"
          textColor="white"
        />

        <Button
          title="Entrar com a conta Google"
          backgroundColor="white"
          fontWeight="normal"
        >
          <GoogleIcon style={{ width: 20, height: 20, marginRight: 16 }} />
        </Button>

        <Button
          backgroundColor="#fbbf24"
          title="Cadastre-se aqui"
          textColor="white"
          iconLeft={false}
          onSubmit={handleGoToRegister}
        >
          <Feather
            name="arrow-right-circle"
            size={22}
            color="#fff"
            style={{ marginLeft: 12, marginTop: 2 }}
          />
        </Button>
      </VStack>
    </ScrollView>
  );
}
