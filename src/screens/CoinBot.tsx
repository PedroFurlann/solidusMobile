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

  async function handleSendMessage() {
    if (!inputMessage.trim())
      return Toast.show({
        bgColor: "red.500",
        placement: "top",
        title: "Digite uma mensagem para o Coin bot.",
      });

    const newMessage = { text: inputMessage, isUser: true };
    const newMessages = [...messages, newMessage]; 

    setInputMessage("");

    try {
      setLoading(true)

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful investment assistant, be as friendly as possible.",
            },
            {
              role: "system",
              content: "Give shorter answers, being as succinct as possible",
            },
            ...newMessages.map((message) => ({
              role: message.isUser ? "user" : "system",
              content: message.text,
            })),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_GPT_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      const newBotMessage = { text: botMessage, isUser: false };
      newMessages.push(newBotMessage);

      setMessages(newMessages);
    } catch (error) {
      console.log(error, "aquii");
      const errorMessage =
        "Erro ao se comunicar com o coin bot. Tente novamente mais tarde.";
      const newErrorMessage = { text: errorMessage, isUser: false };
      newMessages.push(newErrorMessage);

      setMessages(newMessages);
    } finally {
      setLoading(false)
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
      <>
        <VStack flex={1} pb={2} bgColor="gray.900" px={2} py={4}>
          <VStack flex={1} mb={4} my={2} px={2}>
            {messages.map((message, i) => (
              <Box
                key={`message.text - ${i}`}
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
            {loading && (
              <Box
                bgColor="amber.400"
                borderRadius="2xl"
                w="1/2"
                p={2}
                mb={2}
                mt={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                alignSelf="flex-start"
              >
                <Text bold fontSize="sm">
                  Carregando...
                </Text>
              </Box>
            )}
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
    </ScrollView>
  );
}
