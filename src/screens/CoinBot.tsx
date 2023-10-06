import {
  Box,
  HStack,
  Input,
  ScrollView,
  Text,
  Toast,
  VStack,
} from "native-base";
import { MainHeader } from "../components/MainHeader";
import { useCallback, useState } from "react";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MainLoading } from "../components/MainLoading";
import { useAuth } from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

interface Message {
  text: string;
  isUser: boolean;
}

export function CoinBot() {
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Olá, meu nome é Coin bot seu assistente virtual de investimentos. Como posso te ajudar hoje? `,
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const addMessage = (text: string, isUser = false) => {
    setMessages([...messages, { text, isUser }]);
  };

  async function handleSendMessage() {
    if (!inputMessage.trim())
      return Toast.show({
        bgColor: "red.500",
        placement: "top",
        title: "Digite uma mensagem para o Coin bot.",
      });

    addMessage(inputMessage, true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "assistant",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: inputMessage,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      addMessage(botMessage, false);
    } catch (error) {
      console.log(error);
      addMessage(
        "Erro ao se comunicar com o coin bot. Tente novamente mais tarde.",
        false
      );
    } finally {
      setInputMessage("");
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      stickyHeaderIndices={[0]}
    >
      <MainHeader style={{ zIndex: 1 }} />
      {loading ? (
        <VStack
          flex={1}
          bgColor="gray.900"
          alignItems="center"
          justifyContent="center"
        >
          <MainLoading size="md" />
        </VStack>
      ) : (
        <>
          <VStack flex={1} pb={2} bgColor="gray.900" px={2} py={4}>
            <VStack flex={1} mb={4} my={2} px={2}>
              {messages.map((message) => (
                <Box
                  key={message.text}
                  bgColor="amber.400"
                  borderRadius="2xl"
                  w="1/2"
                  p={2}
                  mb={2}
                  mt={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  alignSelf={message.isUser ? "flex-end" : "flex-start"}
                >
                  <Text bold fontSize="sm">
                    {message.text}
                  </Text>
                </Box>
              ))}
            </VStack>
          </VStack>
          <HStack
            display="flex"
            flexDirection="row"
            alignItems="center"
            px={4}
            mb={6}
          >
            <Input
              placeholder="Digite sua mensagem"
              fontWeight="medium"
              value={inputMessage}
              type="text"
              fontSize="sm"
              borderWidth={1}
              mr={2}
              flex={1}
              color="gray.200"
              borderRadius="lg"
              borderColor="gray.400"
              placeholderTextColor="#767681"
              onChangeText={(text) => setInputMessage(text)}
            />
            <MaterialCommunityIcons
              name="send-circle"
              color="#fbbf24"
              size={40}
              style={{ width: 40, height: 40 }}
              onPress={handleSendMessage}
            />
          </HStack>
        </>
      )}
    </ScrollView>
  );
}
