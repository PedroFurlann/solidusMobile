import {
  Box,
  CheckIcon,
  Input,
  ScrollView,
  Select,
  Text,
  Toast,
  VStack,
} from "native-base";
import { MainHeader } from "../components/MainHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { MainLoading } from "../components/MainLoading";

interface FormData {
  title: string;
  amount: number;
}

export function NewTransaction() {
  const [selectedType, setSelectedType] = useState("PROFIT");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();

  const newTransactionSchema = yup.object({
    title: yup
      .string()
      .trim()
      .required("Informe o título da transação.")
      .min(6, "O título da transação deve ter no mínimo 6 caracteres."),
    amount: yup
      .number()
      .required("Informe a quantidade transacionada.")
      .min(1, "A quantidade transacionada deve ser maior que 0."),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newTransactionSchema),
    defaultValues: {
      amount: 100,
    },
  });

  async function handleNewTransaction({ title, amount }: FormData) {
    if (selectedCategory === "" && selectedType === "LOSS") {
      setCategoryEmpty(true);
      return;
    }

    const transactionData = {
      title,
      amount,
      type: selectedType,
      category: selectedCategory,
    };

    setLoading(true);

    try {
      await api.post("/transactions", transactionData);

      navigate("transactions");

      setSelectedCategory("");
      setSelectedType("PROFIT");
      reset();

      Toast.show({
        title: "Transação criada com sucesso.",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a transação. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  function verifyCategoryIsEmpty() {
    if (selectedType === "") {
      setCategoryEmpty(true);
    } else {
      setCategoryEmpty(false);
    }
  }

  useEffect(() => {
    verifyCategoryIsEmpty();
  }, [selectedCategory]);

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
          <VStack flex={1} pb={10} bgColor="gray.900" px={8}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    bgColor="white"
                    placeholder="EX: R$ 50,00"
                    onChangeText={onChange}
                    mb={errors.amount?.message ? 2 : 4}
                    fontWeight="medium"
                    value={value?.toString()}
                    type="text"
                    keyboardType="numeric"
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
                mb={selectedType === "LOSS" ? 6 : 8}
              >
                <TouchableOpacity onPress={() => setSelectedType("LOSS")}>
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
                      selectedType === "LOSS" ? "red.500" : "gray.400"
                    }
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

                <TouchableOpacity
                  onPress={() => {
                    setSelectedType("PROFIT");
                    setCategoryEmpty(false);
                    setSelectedCategory("");
                  }}
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

            <Box w="full">
              <Select
                selectedValue={selectedCategory}
                accessibilityLabel="Escolha a categoria da sua transação"
                placeholder="Escolha a categoria da sua transação"
                _selectedItem={{
                  bg: "amber.400",
                  endIcon: <CheckIcon size="5" />,
                  borderRadius: 5,
                  fontSize: 16,
                }}
                mt={1}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                bg="gray.200"
                mb={categoryEmpty ? 2 : 8}
                display={selectedType === "LOSS" ? "flex" : "none"}
                fontSize="sm"
                dropdownIcon={
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={22}
                    style={{ marginRight: 12, width: 22, height: 22 }}
                  />
                }
                placeholderTextColor={"gray.700"}
                pl={4}
              >
                <Select.Item label="Comida" value="FOOD" />
                <Select.Item label="Saúde" value="HEALTH" />
                <Select.Item label="Lazer" value="FUN" />
                <Select.Item label="Educação" value="EDUCATION" />
                <Select.Item label="Gastos fixos" value="FIXED" />
                <Select.Item label="Outros" value="OTHERS" />
              </Select>
            </Box>

            {categoryEmpty && (
              <Text color="red.500" mb={6} fontWeight="bold">
                Selecione a categoria da transação
              </Text>
            )}

            <Box width="full">
              <Button
                title="Voltar"
                backgroundColor="#ef4444"
                textColor="#e4e4e7"
                onSubmit={goBack}
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
                onSubmit={handleSubmit(handleNewTransaction)}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </>
  );
}
