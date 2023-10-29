import { HStack, Image } from "native-base";
import Logo from "../assets/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";

export function AuthHeader() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fbbf24",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24
      }}
    >
      <HStack
        w="full"
        h={20}
        justifyContent="center"
        alignItems="center"
        bgColor="amber.400"
        position="fixed"
      >
        <Image
          source={Logo}
          alt="Logo image"
          resizeMode="contain"
          defaultSource={Logo}
          w={12}
          h={12}
          rounded="full"
        />
      </HStack>
    </SafeAreaView>
  );
}
