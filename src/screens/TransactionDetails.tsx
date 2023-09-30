import { ScrollView, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";

export function TransactionDetails() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <MainHeader />
      <VStack flex={1} pb={10} bgColor="gray.900" px={8}>
        
      </VStack>
    </ScrollView>
  );
}
