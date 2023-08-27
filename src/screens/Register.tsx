import { Input, ScrollView, Text, VStack } from "native-base";
import { AuthHeader } from "../components/AuthHeader";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../components/Button";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const animation = useRef<any>(null);
  useEffect(() => {
    animation.current?.play();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("O nome é obrigatório")
      .min(5, "O nome deve conter no mímimo 5 caracteres"),
    email: yup
      .string()
      .required("O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas devem coincidir"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  function handleRegister({
    name,
    email,
    password,
    confirm_password,
  }: FormData) {
    console.log(name, email, password, confirm_password);
  }

  function handleGoToLogin() {
    navigate('login')
  }


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
          source={require("../lib/lottie/goldBar.json")}
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
          Cadastre sua conta
        </Text>

        <Controller
          control={control}
          name="name"
          rules={{ required: "Escolha o nome" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Nome"
              fontWeight="medium"
              value={value}
              type="text"
              mb={errors.name?.message ? 2 : 0}
              fontSize="sm"
              autoCapitalize="none"
              onChangeText={onChange}
            />
          )}
        />
        <Text color="red.500" mb={2} fontWeight="bold" display="flex">
          {errors.name?.message}
        </Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: "Escolha seu email" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Email"
              onChangeText={onChange}
              mb={errors.email?.message ? 2 : 0}
              fontWeight="medium"
              value={value}
              keyboardType="email-address"
              type="text"     
              fontSize="sm"
            />
          )}
        />

        <Text color="red.500" mb={2} fontWeight="bold">
          {errors.email?.message}
        </Text>

        <Controller
          control={control}
          name="password"
          rules={{ required: "Escolha uma senha" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Senha"
              secureTextEntry={!showPassword}
              value={value}
              type="password"
              mb={errors.password?.message ? 2 : 0}
              fontWeight="medium"
              fontSize="sm"
              autoCapitalize="none"
              onChangeText={onChange}
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
        <Text color="red.500" mb={2} fontWeight="bold">
          {errors.password?.message}
        </Text>

        <Controller
          control={control}
          name="confirm_password"
          rules={{ required: "Confirme sua senha" }}
          render={({ field: { onChange, value } }) => (
            <Input
              bgColor="white"
              placeholder="Confirme sua senha"
              secureTextEntry={!showPassword}
              mb={errors.confirm_password?.message ? 2 : 0}
              fontWeight="medium"
              onChangeText={onChange}
              value={value}
              type="password"
              fontSize="sm"
            />
          )}
        />

        <Text color="red.500" mb={2} fontWeight="bold">
          {errors.confirm_password?.message}
        </Text>

        <Button
          backgroundColor="#fbbf24"
          title="Confirmar"
          onSubmit={handleSubmit(handleRegister)}
          textColor="white"
        />

        <Button
          title="Voltar para o login"
          backgroundColor="#fbbf24"
          textColor="white"
          onSubmit={handleGoToLogin}
        >
          <Feather
            name="arrow-left-circle"
            size={22}
            color="#fff"
            style={{ marginRight: 12, marginTop: 2 }}
          />
        </Button>
      </VStack>
    </ScrollView>
  );
}
