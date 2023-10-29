import { FlatList, ScrollView, Text, Toast, VStack, View } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { TransactionCard } from "../components/TransactionCard";
import { Button } from "../components/Button";
import { TransactionItem } from "../components/TransactionItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { AppError } from "../utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { MainLoading } from "../components/MainLoading";
import { TransactionDTO } from "../dtos/TransactionDTO";
import { useAuth } from "../hooks/useAuth";

export function Transactions() {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { user } = useAuth();

  let totalProfit: number = 0;
  let totalLoss: number = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "PROFIT") {
      totalProfit += Number(transaction.amount);
    }

    if (transaction.type === "LOSS") {
      totalLoss += Number(transaction.amount);
    }
  });

  const finalAmount: number = totalProfit + totalLoss;

  console.log(totalProfit, totalLoss);

  

  async function fetchTransactions() {
    setLoading(true);

    try {
      const response = await api.get("/transactions");
      console.log(response.data);
      setTransactions(response.data.transactions);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar as transações. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

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
          <VStack flex={1} pb={10} bgColor="gray.900" px={12} mt={2}>
            <VStack
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text
                color="gray.200"
                bold
                fontSize="lg"
                textAlign="center"
                mt={4}
                mb={4}
              >
                Essas é o resumo de suas transações {user.name}
              </Text>
              <Button
                title="Nova transação"
                backgroundColor="#fbbf24"
                textColor="white"
                onSubmit={() => navigate("newTransaction")}
                style={{ marginBottom: 12 }}
              />

              <View flex={1} alignItems="center" justifyContent="center"></View>
            </VStack>
            <TransactionCard
              title="Total de gastos"
              amount={totalLoss}
              mb={4}
            />
            <TransactionCard
              title="Balanço geral"
              amount={finalAmount}
              mb={4}
            />
            <TransactionCard
              title="Total de ganhos"
              amount={totalProfit}
              mb={8}
            />
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TransactionItem
                  title={item.title}
                  type={item.type}
                  idTransaction={item.id}
                  w="full"
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 16 }}
              ListHeaderComponent={
                <Text
                  color="gray.200"
                  bold
                  fontSize="lg"
                  textAlign="center"
                  mb={4}
                >
                  Transações
                </Text>
              }
              ListEmptyComponent={
                <Text
                  color="gray.200"
                  bold
                  fontFamily="heading"
                  fontSize="lg"
                  textAlign="center"
                >
                  Voce ainda não tem nenhuma transação. Que tal cadastrar uma?
                </Text>
              }
            />
          </VStack>
        </ScrollView>
      )}
    </>
  );
}
