import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { Text, VStack } from "native-base";

interface Props {
  size: "sm" | "md" | "lg" | "xl";
}

export function MainLoading({ size = "md" }: Props) {
  const animation = useRef<any>(null);
  useEffect(() => {
    animation.current?.play();
  }, []);

  const animationSize =
    size === "sm" ? 80 : size === "md" ? 120 : size === "lg" ? 160 : 200;

  return (
    <VStack alignItems="center" justifyContent="center">
      <LottieView
        source={require("../lib/lottie/loadingCoin.json")}
        style={{ width: animationSize, height: animationSize, marginBottom: 6 }}
        ref={animation}
      />

      <Text
        color="amber.400"
        bold
        fontSize={
          size === "sm"
            ? "sm"
            : size === "md"
            ? "md"
            : size === "lg"
            ? "lg"
            : "xl"
        }
      >
        Carregando
      </Text>
    </VStack>
  );
}
