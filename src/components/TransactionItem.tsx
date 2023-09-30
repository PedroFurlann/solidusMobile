import { Dayjs } from "dayjs";
import { Box, Text } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { Button } from "./Button";
import { TouchableOpacity } from "react-native";

interface Props extends InterfaceBoxProps {
  idTransaction: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Dayjs
}

export function TransactionItem({ title, type, ...rest  }: Props) {
  return (
   <TouchableOpacity>
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
      <Text color="gray.200" bold fontSize="md">
        {title}
      </Text>
      <Text color={type === "PROFIT" ? "amber.400" : "red.500"} bold fontSize="md">
        {type === "PROFIT" ? "Lucro" : "Gasto"}
      </Text>
    </Box>
   </TouchableOpacity>
  );
}
