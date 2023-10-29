import { Box, Input, ScrollView, Text, Toast, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { AvatarProfile } from "../components/AvatarProfile";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { MainLoading } from "../components/MainLoading";
import UserPlacehodlerImage from '../assets/Portrait_Placeholder.png'

interface FormData {
  name: string;
  email: string;
  new_password?: string;
  confirm_new_password?: string;
}

export function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, updateUserProfile, signOut } = useAuth();

  const updateProfileSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("O nome é obrigatório.")
      .min(6, "O nome deve conter no mímimo 6 caracteres."),
    email: yup
      .string()
      .trim()
      .required("O e-mail é obrigatório.")
      .email("Digite um e-mail válido."),
    new_password: yup
      .string()
      .trim()
      .min(6, "A senha deve conter no mínimo 6 caracteres."),
    confirm_new_password: yup
      .string()
      .trim()
      .oneOf([yup.ref("new_password")], "As senhas devem coincidir."),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  async function handleUpdateProfile({
    name,
    email,
    new_password,
    confirm_new_password,
  }: FormData) {
    let userData = {
      name,
      password: new_password,
    };

    const userUpdated = user;

    userUpdated.name = name;

    setLoading(true);

    try {
      console.log(userData)

      await api.patch("/user", userData);
      await updateUserProfile(userUpdated);

      Toast.show({
        title: "Usuário atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o usuário. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          bgColor="gray.900"
        >
          <MainLoading size="md" />
        </VStack>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <MainHeader />
          <VStack flex={1} pb={10} bgColor="gray.900" px={12} mt={6}>
            <VStack
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <VStack
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <AvatarProfile
                  size="xl"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  mb={8}
                  mt={2}
                />
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
                    placeholder="Nova senha"
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
                    placeholder="Confirme sua nova senha"
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

              <Box width="full">
              <Button
                backgroundColor="#fbbf24"
                title="Atualizar perfil"
                onSubmit={handleSubmit(handleUpdateProfile)}
                textColor="#fff"
              />

              <Button
                title="Sair"
                backgroundColor="#ef4444"
                textColor="#e4e4e7"
                onSubmit={async () => {
                  await signOut()
                }}
                iconLeft={false}
              >
                <MaterialCommunityIcons
                  name="door-open"
                  color="#e4e4e7"
                  size={22}
                  style={{ marginLeft: 12, marginTop: 2 }}
                />
              </Button>
            </Box>

              
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </>
  );
}
