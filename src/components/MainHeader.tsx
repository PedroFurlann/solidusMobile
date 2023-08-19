import { HStack, Image } from "native-base";
import Logo from "../assets/logo.png";
import { AvatarProfile } from "./AvatarProfile";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

interface Props extends InterfaceHStackProps {}

export function MainHeader({...rest}: Props) {
  return (
    <HStack
      {...rest}
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
