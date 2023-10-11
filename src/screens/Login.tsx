import {
  IconButton,
  Input,
  ScrollView,
  Text,
  Toast,
  VStack,
} from "native-base";
import { AuthHeader } from "../components/AuthHeader";
import LottieView from "lottie-react-native";
import GoogleIcon from "../assets/googlcon.svg";
import { useEffect, useRef, useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../components/Button";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppError";

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const { signIn } = useAuth();

  const loginSchema = yup.object({
    email: yup.string().required("O e-mail é obrigatório.").email("Digite um e-mail válido.").trim(),
    password: yup
      .string()
      .required("A senha é obrigatória.")
      .trim()
      .min(6, "A senha deve conter no mínimo 6 caracteres."),
  });

  async function handleSignIn({ email, password }: FormData) {
    try {
      await signIn(email, password);
      Toast.show({
        title: "Usuário logado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível realizar o login. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleGoToRegister() {
    navigate("register");
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
          rules={{ required: "O e-mail é obrigatório." }}
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
          rules={{ required: "A senha é obrigatória." }}
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
          title="Esqueceu sua senha?"
          backgroundColor="#fbbf24"
          textColor="white"
          onSubmit={() => navigate("forgotPassword")}
        >
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
