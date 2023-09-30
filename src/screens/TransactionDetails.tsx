import { Box, ScrollView, Text, Toast, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TransactionDTO } from "../dtos/TransactionDTO";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { MainLoading } from "../components/MainLoading";
import dayjs from "dayjs";
import { priceFormatter } from "../utils/priceFormatter";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { Button } from "../components/Button";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Alert } from "react-native";

interface RouteParamsProps {
  transactionId: number;
}

interface transactionCategoryItemsProps {
  displayValue: string;
  value: string;
}

export function TransactionDetails() {
  const [transaction, setTransaction] = useState<TransactionDTO>();
  const [loading, setLoading] = useState(false);

  const { params } = useRoute();

  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();

  const { transactionId } = params as RouteParamsProps;

  const transactionCategoryItems = [
    { displayValue: "Comida", value: "FOOD" },
    { displayValue: "Saúde", value: "HEALTH" },
    { displayValue: "Lazer", value: "FUNNY" },
    { displayValue: "Educação", value: "EDUCATION" },
    { displayValue: "Gastos fixos", value: "FIXED" },
    { displayValue: "Outros", value: "OTHERS" },
  ];

  function changeTransactionCategoryName(
    transactionCategoryItems: transactionCategoryItemsProps[],
    transactionCategory: string | undefined
  ) {
    let item: string = "";

    transactionCategoryItems.forEach((transaction) => {
      if (transaction["value"] === transactionCategory) {
        item = transaction["displayValue"];
      }
    });

    return item;
  }

  async function handleDeleteTransaction() {
    Alert.alert(
      "Deletar",
      `Deseja deletar a transação ${
        transaction &&
        transaction.title.charAt(0).toUpperCase() + transaction.title.slice(1)
      }`,
      [
        {
          text: "Sim",
          onPress: () => deleteTransaction(),
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  async function deleteTransaction() {
    setLoading(true);

    try {
      await api.delete(`/transactions/${transactionId}`);

      navigate("transactions");

      Toast.show({
        title: "Transação deletada com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar a transação. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchTransaction() {
    setLoading(true);

    try {
      const response = await api.get(`transactions/${transactionId}`);

      console.log(response.data.transaction);

      setTransaction(response.data.transaction);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível encontrar a transação. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, [transactionId]);

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
            <Text
              color="gray.200"
              bold
              fontFamily="heading"
              fontSize="xl"
              mt={4}
              display="flex"
              alignSelf="center"
            >
              {transaction &&
                transaction.title.charAt(0).toUpperCase() +
                  transaction.title.slice(1)}
            </Text>

            <VStack alignItems="center" justifyContent="center" mt={8} flex={1}>
              <VStack mb={4} justifyContent="center" alignItems="center">
                <Text color="gray.200" bold fontFamily="heading" fontSize="lg">
                  Transação Criada em:
                </Text>

                <Text color="gray.400" bold fontSize="md">
                  {dayjs(transaction?.createdAt).format("DD/MM/YYYY HH:mm")}
                </Text>
              </VStack>

              <VStack mb={4} justifyContent="center" alignItems="center">
                <Text color="gray.200" bold fontFamily="heading" fontSize="lg">
                  Tipo da Transação:
                </Text>

                {transaction?.type === "LOSS" ? (
                  <Text color="red.500" bold fontSize="md">
                    Gasto
                  </Text>
                ) : (
                  <Text color="amber.400" bold fontSize="md">
                    Lucro
                  </Text>
                )}
              </VStack>

              <VStack mb={4} justifyContent="center" alignItems="center">
                <Text color="gray.200" bold fontFamily="heading" fontSize="lg">
                  Quantia transacionada:
                </Text>

                {transaction?.type === "LOSS" ? (
                  <Text color="red.500" bold fontSize="md">
                    {priceFormatter.format(transaction.amount).replace("-", "")}
                  </Text>
                ) : (
                  <Text color="amber.400" bold fontSize="md">
                    {transaction && priceFormatter.format(transaction.amount)}
                  </Text>
                )}
              </VStack>

              {transaction?.type === "LOSS" && (
                <VStack mb={4} justifyContent="center" alignItems="center">
                  <Text
                    color="gray.200"
                    bold
                    fontFamily="heading"
                    fontSize="lg"
                  >
                    Categoria da transação:
                  </Text>

                  <Text color="gray.400" bold fontSize="md">
                    {changeTransactionCategoryName(
                      transactionCategoryItems,
                      transaction.category
                    )}
                  </Text>
                </VStack>
              )}
            </VStack>

            <Box width="full">
              <Button
                title="Voltar"
                backgroundColor="#fbbf24"
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
                title="Deletar transação"
                backgroundColor="#ef4444"
                textColor="#e4e4e7"
                onSubmit={handleDeleteTransaction}
                iconLeft={false}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  color="#e4e4e7"
                  size={22}
                  style={{ marginLeft: 12, marginTop: 2 }}
                />
              </Button>
            </Box>
          </VStack>
        </ScrollView>
      )}
    </>
  );
}
