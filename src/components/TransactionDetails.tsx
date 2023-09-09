import { Box, Text } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

interface Props extends InterfaceBoxProps {
  title: string;
  category?: "FOOD" | "HEALTH" | "FUN" | "FIXED" | "EDUCATION" | "OTHERS"
}

export function TransactionDetails({ title, category, ...rest  }: Props) {
  return (
    <Box
      bg="gray.600"
      display="flex"
      flexDirection="row"
      rounded="md"
      alignItems="center"
      p={2}
      justifyContent="space-between"
      {...rest}
    >
      <Text color="gray.200" bold fontSize="md">
        {title}
      </Text>
      <Text color="gray.200" bold fontSize="md">
        20/08/2023
      </Text>
    </Box>
  );
}
