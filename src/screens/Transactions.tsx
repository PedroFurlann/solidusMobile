import {
  FlatList,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { MainHeader } from "../components/MainHeader";
import { TransactionCard } from "../components/TransactionCard";
import { Button } from "../components/Button";
import { TransactionDetails } from "../components/TransactionDetails";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { priceFormatter } from "../utils/priceFormatter";
import { LineChart } from 'react-native-chart-kit';


const fakeData = ["Teste 1", "Teste 2", "Teste 3", "Teste 4", "Teste 5"];

const categories = ['Comida', 'Lazer', 'Educação', 'Saúde', 'Outros']


const chartData = [20, 45, 17, 27, 100]


const chartDataToMoney = chartData.map((data) => priceFormatter.format(data))

const data = {
  labels: categories,
  datasets: [
    {
      data: chartData,
      color: (opacity = 1) => `#fbbf24`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Gastos"] // optional
};



const chartConfig = {
  backgroundGradientFrom: '#fffbeb',
  backgroundGradientTo: '#f59e0b',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
};

export function Transactions() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
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
            onSubmit={() => navigate("newTransaction")}
            style={{marginBottom: 12  }}
          />

<View flex={1} alignItems="center" justifyContent="center" >
      <LineChart
        data={data}
        chartConfig={chartConfig}
        height={200}
        width={200}
        style={{ borderRadius: 16 }}
        yAxisLabel="R$"
      />
    </View>


        </VStack>
        <TransactionCard title="Total de gastos" amount={1200} mb={4} />
        <TransactionCard title="Balanço geral" amount={1400} mb={4} />
        <TransactionCard title="Total de ganhos" amount={1300} mb={8} />

        <Text color="gray.200" bold fontSize="lg" textAlign="center" mb={8}>
          Transações
        </Text>

        <FlatList
          data={fakeData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TransactionDetails title={item} w="full" />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        />
      </VStack>
    </ScrollView>
  );
}
