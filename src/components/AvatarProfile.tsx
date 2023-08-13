import { Avatar } from "native-base";
import { InterfaceAvatarProps } from "native-base/lib/typescript/components/composites/Avatar/types";

interface Props extends InterfaceAvatarProps {
  src: string;
}

export function AvatarProfile({ src, ...rest }: Props) {
  return (
    <Avatar
      {...rest}
      source={{ uri: src }}
      borderColor="amber.500"
      borderRadius="full"
      borderWidth="4"
    />
  );
}
