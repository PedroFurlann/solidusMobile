import { HStack, ScrollView, Text, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { TransactionCard } from "../components/TransactionCard";
import { Button } from "../components/Button";

export function Transactions() {
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
          justifyContent="space-between"
        >
          <Text color="gray.200" bold fontSize="lg" textAlign="center" mt={4} mb={4}>
            Essas é o resumo de suas transações Pedro
          </Text>
          <Button title="Nova transação" backgroundColor="#fbbf24" textColor="white" />
        </VStack>
        <TransactionCard title="Total de gastos" amount={1200} mb={4} />
        <TransactionCard title="Balanço geral" amount={1400} mb={4} />
        <TransactionCard title="Total de ganhos" amount={1300} />
      </VStack>
    </ScrollView>
  );
}
