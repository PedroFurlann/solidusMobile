import {
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { AuthHeader } from "../components/AuthHeader";
import LottieView from "lottie-react-native";
import GoogleIcon from "../assets/googlcon.svg";
import { useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../components/Button";

interface FormData {
  email: string;
  password: string;
}

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

export function Login() {
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

        <Controller
          control={control}
          name="email"
          rules={{ required: "Informe o e-mail" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Email"
              value={value}
              type="text"
              mb={errors.email?.message ? 2 : 4}
              fontSize="sm"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
            />
          )}
        />
          <Text color="red.500" mb={2} fontWeight="bold">{errors.email?.message}</Text>

        <Controller
          control={control}
          name="password"
          rules={{ required: "Informe a senha" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              type="password"
              mb={errors.password?.message ? 2 : 4}
              fontSize="sm"
            />
          )}
        />

          <Text mb={2} color="red.500" fontWeight="bold">{errors.password?.message}</Text>

        <Button onSubmit={handleSubmit(handleSignIn)} title="Entrar" backgroundColor="#fbbf24" textColor="gray.200" />

        <Button title="Entrar com a conta Google" backgroundColor="white" fontWeight="normal" >
          <GoogleIcon style={{ width: 20, height: 20, marginRight: 16 }} />
        </Button>

        <Button backgroundColor="#fbbf24" title="Cadastre-se aqui" textColor="gray.200" />
      </VStack>
    </ScrollView>
  );
}
