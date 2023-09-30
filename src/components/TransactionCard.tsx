import { Box, HStack, Text } from "native-base";
import { Feather } from "@expo/vector-icons";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
import { priceFormatter } from "../utils/priceFormatter";

interface Props extends InterfaceBoxProps {
  amount: number;
  title: string;
}

export function TransactionCard({ title, amount, ...rest }: Props) {
  return (
    <Box
      {...rest}
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
      {amount < 0 ? (
        <HStack display="flex" alignItems="center">
          <Text color="red.500" bold marginRight={2} fontSize="md">
            {priceFormatter.format(amount).replace("-", "- ")}
          </Text>
          <Feather name="arrow-down-circle" color="#ef4444" size={18} />
        </HStack>
      ) : amount > 0 ? (
        <HStack display="flex" alignItems="center">
        <Text color="amber.400" bold marginRight={2} fontSize="md">
          {priceFormatter.format(amount)}
        </Text>
        <Feather name="arrow-up-circle" color="#fbbf24" size={18} />
      </HStack>
      ) : (
        <HStack display="flex" alignItems="center">
        <Text color="gray.400" bold marginRight={2} fontSize="md">
          {priceFormatter.format(amount)}
        </Text>
        <Feather name="minus-circle" color="#a1a1aa" size={18} />
      </HStack>
      )}
    </Box>
  );
}
