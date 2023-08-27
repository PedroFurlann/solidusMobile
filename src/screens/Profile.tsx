import { Input, ScrollView, Text, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { AvatarProfile } from "../components/AvatarProfile";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableNativeFeedback } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "../components/Button";

interface FormData {
  name: string;
  email: string;
  new_password: string;
  confirm_new_password: string;
}

export function Profile() {
  const [showPassword, setShowPassword] = useState(false);

  const updateProfileSchema = yup.object().shape({
    name: yup.string().min(6, "O nome deve conter no mímimo 6 caracteres"),
    email: yup
      .string()
      .required("O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    new_password: yup.string(),
    confirm_new_password: yup
      .string()
      .oneOf([yup.ref("new_password")], "As senhas devem coincidir"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: "Pedro01",
      email: "pedrofurlan6@gmail.com",
    },
  });

  function handleUpdateProfile({
    name,
    email,
    new_password,
    confirm_new_password,
  }: FormData) {
    console.log(
      "Name => ",
      name,
      "Email => ",
      email,
      "New_Password =>",
      new_password,
      "Confirm_New_Password => ",
      confirm_new_password
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <MainHeader />
      <VStack flex={1} pb={10} bgColor="gray.900" px={12}>
        <VStack
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <VStack display="flex" alignItems="center" justifyContent="center">
            <AvatarProfile
              size="2xl"
              src="https://github.com/PedroFurlann.png"
              mb={2}
            />
            <Text color="amber.400" bold fontSize="md" mb={6}>
              Alterar foto de perfil
            </Text>
          </VStack>

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
                isDisabled={true}
              />
            )}
          />

          <Text color="red.500" mb={2} fontWeight="bold">
            {errors.email?.message}
          </Text>

          <Controller
            control={control}
            name="new_password"
            rules={{ required: "Escolha uma senha" }}
            render={({ field: { onChange, value } }) => (
              <Input
                bgColor="white"
                placeholder="Senha"
                secureTextEntry={!showPassword}
                value={value}
                type="password"
                mb={errors.new_password?.message ? 2 : 0}
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
            {errors.new_password?.message}
          </Text>

          <Controller
            control={control}
            name="confirm_new_password"
            rules={{ required: "Confirme sua senha" }}
            render={({ field: { onChange, value } }) => (
              <Input
                bgColor="white"
                placeholder="Confirme sua senha"
                secureTextEntry={!showPassword}
                mb={errors.confirm_new_password?.message ? 2 : 0}
                fontWeight="medium"
                onChangeText={onChange}
                value={value}
                type="password"
                fontSize="sm"
              />
            )}
          />

          <Text color="red.500" mb={8} fontWeight="bold">
            {errors.confirm_new_password?.message}
          </Text>

          <Button 
            backgroundColor="#fbbf24"
            title="Atualizar perfil"
            onSubmit={handleSubmit(handleUpdateProfile)}
            textColor="#fff"
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
