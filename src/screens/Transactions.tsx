import { Box, FlatList, HStack, ScrollView, Text, VStack, useDisclose } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { TransactionCard } from "../components/TransactionCard";
import { Button } from "../components/Button";
import { TransactionDetails } from "../components/TransactionDetails";
import { Actionsheet } from 'native-base'
import { Feather } from '@expo/vector-icons'

const fakeData = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5']

export function Transactions() {
  const { isOpen, onOpen, onClose } = useDisclose();

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
          <Text
            color="gray.200"
            bold
            fontSize="lg"
            textAlign="center"
            mt={4}
            mb={4}
          >
            Essas é o resumo de suas transações Pedro
          </Text>
          <Button
            title="Nova transação"
            backgroundColor="#fbbf24"
            textColor="white"
            onPress={onOpen}
          />

          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <VStack
                p={8}
              >
                <HStack display="flex" alignItems="center" justifyContent="space-between">
                  <Text color="gray.200" bold fontSize="md">Nova transação</Text>
                  <Feather name="x" size={12} color="#ef4444" onPress={onClose} />
                </HStack>
              </VStack>
            </Actionsheet.Content>
          </Actionsheet>
        </VStack>
        <TransactionCard title="Total de gastos" amount={1200} mb={4} />
        <TransactionCard title="Balanço geral" amount={1400} mb={4} />
        <TransactionCard title="Total de ganhos" amount={1300} mb={12} />

        <Box p={4} bg="gray.700" borderRadius="md" display="flex" mt={4}>
          <FlatList 
            data={fakeData}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TransactionDetails title={item} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          />
        </Box>
      </VStack>
    </ScrollView>
  );
}
