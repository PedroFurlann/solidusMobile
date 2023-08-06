import {
  Box,
  Button,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { AuthHeader } from "../components/AuthHeader";
import LottieView from "lottie-react-native";
import GoogleIcon from "../assets/googlcon.svg";
import { useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";

export function Login() {
  const animation = useRef<any>(null);
  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader />
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        pb={10}
        bgColor="gray.900"
        px={12}
      >
        <LottieView
          source={require("../lib/lottie/money.json")}
          style={{ width: 200, height: 200, marginBottom: 16 }}
          ref={animation}
        />

        <Input
          bgColor="white"
          placeholder="Digite seu nome"
          type="text"
          mb={4}
          fontSize="sm"
        />
        <Input
          bgColor="white"
          placeholder="Digite seu email"
          type="text"
          mb={4}
          fontSize="sm"
        />
        <TouchableOpacity
          style={{
            marginBottom: 16,
            backgroundColor: "#fbbf24",
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 48,
            width: "100%"
          }}
        >
          <Text
            color="gray.200"
            fontWeight="bold"
            fontSize="md"
            fontFamily="heading"
          >
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            height: 48,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <GoogleIcon style={{ width: 20, height: 20, marginRight: 16 }} />
          <Text>Entrar com a conta Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginBottom: 16,
            backgroundColor: "#fbbf24",
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 48,
            width: "100%"
          }}
        >
          <Text
            color="gray.200"
            fontWeight="bold"
            fontSize="md"
            fontFamily="heading"
          >
            Cadastre-se aqui
          </Text>
        </TouchableOpacity>
      </VStack>
    </ScrollView>
  );
}
