import { Input, ScrollView, VStack } from "native-base";
import { AuthHeader } from "../components/AuthHeader";
import LottieView from 'lottie-react-native'
import { useEffect, useRef } from "react";

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
            source={require('../lib/lottie/money.json')}
            style={{ width: 200, height: 200, marginBottom: 16 }}
            ref={animation}
          />
          
          <Input bgColor="white" placeholder="Digite seu nome" type="text" mb={4} fontSize="sm" />
          <Input bgColor="white" placeholder="Digite seu email" type="text" fontSize="sm" />

        </VStack>
    </ScrollView>
  );
}
