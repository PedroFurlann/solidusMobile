import { Box, Input, ScrollView, Text, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";

interface FormData {
  title: string;
  amount: number;
}

export function NewTransaction() {
  const [selectedType, setSelectedType] = useState("LOSS");

  const newTransactionSchema = yup.object({
    title: yup
      .string()
      .required("Informe o título da transação.")
      .min(6, "O título da transação deve ter no mínimo 6 caracteres"),
    amount: yup
      .number()
      .required("Informe a quantidade transacionada")
      .min(1, "A quantidade transacionada deve ser maior que 0"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newTransactionSchema),
  });

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <MainHeader />
      <VStack flex={1} pb={10} bgColor="gray.900" px={8}>
        <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
          <Text
            color="gray.200"
            bold
            fontFamily="heading"
            pb={8}
            fontSize="xl"
          >
            Nova Transação
          </Text>

          <Controller
            control={control}
            name="title"
            rules={{ required: "Digite o título da transação" }}
            render={({ field: { onChange, value } }) => (
              <Input
                bgColor="white"
                placeholder="Título"
                fontWeight="medium"
                value={value}
                type="text"
                mb={errors.title?.message ? 2 : 0}
                fontSize="sm"
                autoCapitalize="none"
                onChangeText={onChange}
              />
            )}
          />
          <Text color="red.500" mb={2} fontWeight="bold" display="flex">
            {errors.title?.message}
          </Text>

          <Controller
            control={control}
            name="amount"
            rules={{ required: "Escolha seu email" }}
            render={({ field: { onChange, value } }) => (
              <Input
                bgColor="white"
                placeholder="Quantidade $"
                onChangeText={onChange}
                mb={errors.amount?.message ? 2 : 8}
                fontWeight="medium"
                value={value?.toString()}
                type="text"
                fontSize="sm"
              />
            )}
          />

          <Text color="red.500" mb={6} fontWeight="bold">
            {errors.amount?.message}
          </Text>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="full"
            justifyContent="space-between"
          >
            <TouchableOpacity
              onPress={() => setSelectedType("LOSS")}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                py={5}
                px={8}
                borderRadius="lg"
                borderWidth={2}
                bgColor="gray.600"
                borderColor={selectedType === "LOSS" ? "red.500" : "gray.400"}
              >
                <Text fontSize="md" bold color="gray.200" marginRight={4}>
                  Gasto
                </Text>
                <Feather
                  name="arrow-down-circle"
                  size={22}
                  color="#ef4444"
                  style={{ marginTop: 4 }}
                />
              </Box>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedType("PROFIT")}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                py={5}
                px={8}
                borderRadius="lg"
                borderWidth={2}
                bgColor="gray.600"
                borderColor={
                  selectedType === "PROFIT" ? "amber.400" : "gray.400"
                }
              >
                <Text fontSize="md" bold color="gray.200" marginRight={4}>
                  Lucro
                </Text>
                <Feather
                  name="arrow-up-circle"
                  size={22}
                  color="#fbbf24"
                  style={{ marginTop: 4 }}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>

        <Box width="full">
            <Button
              title="Voltar"
              backgroundColor="#ef4444"
              textColor="#e4e4e7"
            >
              <Feather
                name="arrow-left-circle"
                color="#e4e4e7"
                size={22}
                style={{ marginRight: 12, marginTop: 2 }}
              />
            </Button>

            <Button
              title="Cadastrar"
              backgroundColor="#fbbf24"
              textColor="#e4e4e7"
            />
          </Box>
      </VStack>
    </ScrollView>
  );
}
