import { Avatar } from "native-base";
import { InterfaceAvatarProps } from "native-base/lib/typescript/components/composites/Avatar/types";

interface Props extends InterfaceAvatarProps {
  src: string
  width: number
  height: number
}

export function MainHeader({ src, width, height, ...rest }: Props) {
  return (
    <Avatar {...rest} source={{ width, height, uri: src }} />
  )
}