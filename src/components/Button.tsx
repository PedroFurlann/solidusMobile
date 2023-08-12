import { Text } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  onSubmit?: () => void
  title: string
  backgroundColor: string
  children?: ReactNode
  textColor?: string | null
  fontWeight?: string 
}

export function Button ({ title, onSubmit, backgroundColor, children, textColor = null, fontWeight = "bold" }: Props) {  
  return (
    <TouchableOpacity
          style={{
            marginBottom: 16,
            backgroundColor,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 48,
            width: "100%",
          }}
          onPress={onSubmit}
        >
          {children}
          <Text
            color={textColor}
            fontWeight={fontWeight}
            fontSize="md"
            fontFamily="heading"
          >
            {title}
          </Text>
          
        </TouchableOpacity>
  )
}