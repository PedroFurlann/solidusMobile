import { ScrollView, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";

export function Transactions() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <MainHeader />
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        pb={10}
        bgColor="gray.900"
        px={12}
      >

      </VStack>
    </ScrollView>
  )
}