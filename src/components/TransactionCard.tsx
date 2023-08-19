import { Box, HStack, Text } from "native-base";
import { Feather } from "@expo/vector-icons";

interface Props {
  amount: number;
  title: string;
}

export function TransactionCard({ title, amount }: Props) {
  return (
    <Box
      p={4}
      bg="gray.700"
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      <Text color="gray.200" bold fontSize="lg">
        {title}
      </Text>
      {amount < 0 || title.includes("gastos") ? (
        <HStack display="flex" alignItems="center">
          <Text color="red.500" bold marginRight={2} fontSize="md">
            {amount}
          </Text>
          <Feather name="arrow-down-circle" color="#ef4444" size={18} />
        </HStack>
      ) : (
        <HStack display="flex" alignItems="center">
          <Text color="amber.400" bold marginRight={2} fontSize="md">
            {amount}
          </Text>
          <Feather name="arrow-up-circle" color="#fbbf24" size={18} />
        </HStack>
      )}
    </Box>
  );
}
