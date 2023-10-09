import { Input, ScrollView, Text, Toast, VStack } from "native-base";
import { AuthHeader } from "../components/AuthHeader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "../routes/auth.routes";
import { AppError } from "../utils/AppError";
import { useState } from "react";
import { MainLoading } from "../components/MainLoading";

interface FormData {
  email: string;
}

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const validateSchema = yup.object({
    email: yup
      .string()
      .required("Informe o e-mail.")
      .email("E-mail inválido.")
      .trim(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validateSchema),
  });

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  async function handleSendEmail({ email }: FormData) {
    setLoading(true);

    try {
      await api.post("/forgot-password", { email });
      reset();
      navigate("login");
      Toast.show({
        title: "Email de recuperação enviado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível enviar o email de recuperação. Tente novamente mais tarde.";

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
          <AuthHeader />
          <VStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            pb={10}
            bgColor="gray.900"
            px={12}
          >
            <Text
              color="white"
              fontWeight="bold"
              mb={4}
              fontFamily="heading"
              fontSize="2xl"
            >
              Recuperar senha
            </Text>

            <Controller
              control={control}
              name="email"
              rules={{ required: "Informe o e-mail" }}
              render={({ field: { onChange, value } }) => (
                <Input
                  bgColor="white"
                  placeholder="Digite o email para recuperação"
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

            <Button
              title="Enviar email de recuperação"
              backgroundColor="#fbbf24"
              textColor="white"
              onSubmit={handleSubmit(handleSendEmail)}
            />
          </VStack>
        </ScrollView>
      )}
    </>
  );
}
