import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

interface Props extends InterfaceBoxProps {
  idTransaction: number;
  title: string;
  type: string;
}

export function TransactionItem({ title, type, idTransaction, ...rest  }: Props) {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  function goToTransactionDetails() {
    navigate("transactionDetails", { transactionId: idTransaction })
  }

  return (
   <TouchableOpacity onPress={goToTransactionDetails}>
     <Box
      bg="gray.600"
      display="flex"
      flexDirection="row"
      rounded="md"
      alignItems="center"
      p={3}
      justifyContent="space-between"
      {...rest}
    >
      <Text color="gray.200" bold fontSize="md" maxWidth={60} textAlign="center">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Text>
      <Text color={type === "PROFIT" ? "amber.400" : "red.500"} bold fontSize="md" underline>
        Ver detalhes
      </Text>
    </Box>
   </TouchableOpacity>
  );
}
