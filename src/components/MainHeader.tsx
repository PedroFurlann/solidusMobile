import { HStack, Image } from "native-base";
import Logo from "../assets/logo.png";
import { AvatarProfile } from "./AvatarProfile";

export function MainHeader() {
  return (
    <HStack
      w="full"
      h={20}
      justifyContent="center"
      alignItems="center"
      bgColor="amber.400"
      position="fixed"
    >
      <AvatarProfile
        size="md"
        src="https://github.com/PedroFurlann.png"
      />
    </HStack>
  );
}
