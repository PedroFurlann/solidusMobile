import { Box, ScrollView, Text, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { TransactionCard } from "../components/TransactionCard";

export function Transactions() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <MainHeader />
      <VStack flex={1} pb={10} bgColor="gray.900" px={12}>
       <TransactionCard title="Total de gastos" amount={1200} />
      </VStack>
    </ScrollView>
  );
}
