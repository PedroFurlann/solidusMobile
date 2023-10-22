import {
  Box,
  HStack,
  Input,
  ScrollView,
  Spinner,
  Text,
  Toast,
  VStack,
} from "native-base";
import { MainHeader } from "../components/MainHeader";
import { useCallback, useState } from "react";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { MainLoading } from "../components/MainLoading";
import { storageTokenGet } from "../storage/storageToken";
import { Alert, TouchableOpacity } from "react-native";

interface Message {
  content: string;
  isUserMessage: boolean;
}

export function CoinBot() {
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      content: `Olá, meu nome é Coin bot seu assistente virtual de investimentos. Como posso te ajudar hoje? `,
      isUserMessage: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSendMessage() {
    if (!inputMessage.trim())
      return Toast.show({
        bgColor: "red.500",
        placement: "top",
        title: "Digite uma mensagem para o Coin bot.",
      });

    if (inputMessage.trim().length > 200) {
      return Toast.show({
        bgColor: "red.500",
        placement: "top",
        title: "Limite de 200 caracteres ultrapassado",
      });
    }

    await api.post("/messages", {
      content: inputMessage,
      isUserMessage: true,
    });

    const newMessage = { content: inputMessage, isUserMessage: true };
    const newMessages = [...messages, newMessage];

    console.log(newMessages);

    setMessages(newMessages);
    setInputMessage("");

    try {
      setLoadingMessages(true);

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
              role: message.isUserMessage ? "user" : "system",
              content: message.content,
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

      console.log(response.data.choices[0].message.content);

      await api.post("/messages", {
        content: response.data.choices[0].message.content,
        isUserMessage: false,
      });

      const botMessage = response.data.choices[0].message.content;
      const newBotMessage = { content: botMessage, isUserMessage: false };

      newMessages.push(newBotMessage);

      setMessages(newMessages);
    } catch (error) {
      console.log(error);
      const errorMessage =
        "Erro ao se comunicar com o coin bot. Tente novamente mais tarde.";
      const newErrorMessage = { content: errorMessage, isUserMessage: false };
      newMessages.push(newErrorMessage);

      setMessages(newMessages);
    } finally {
      setLoadingMessages(false);
    }
  }

  async function getMessagesHistoric() {
    setLoading(true);

    try {
      const response = await api.get("/messages");
      response.data.messages.forEach((message: Message) => {
        setMessages((state) => [
          ...state,
          { content: message.content, isUserMessage: message.isUserMessage },
        ]);
      });
    } catch (error) {
      console.error(error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico de mensagens. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteHistoricMessage() {
    setLoading(true);
    try {
      await api.delete("/messages");
      setMessages([
        {
          content: `Olá, meu nome é Coin bot seu assistente virtual de investimentos. Como posso te ajudar hoje? `,
          isUserMessage: false,
        },
      ]);
      getMessagesHistoric();
      Toast.show({
        bgColor: "green.500",
        placement: "top",
        title: "Histórico de mensagens deletado com sucesso!",
      });
    } catch (error) {
      console.error(error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar o histórico de mensagens. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTransaction() {
    Alert.alert("Deletar", "Deseja deletar o histórico de mensagens", [
      {
        text: "Sim",
        onPress: () => deleteHistoricMessage(),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      getMessagesHistoric();
    }, [])
  );

  return (
    <>
      {loading ? (
        <VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          bgColor="gray.900"
        >
          <MainLoading size="md" />
        </VStack>
      ) : (
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
                <TouchableOpacity
                  disabled={loading || messages.length <= 1 || loadingMessages}
                  onPress={handleDeleteTransaction}
                >
                  <Box
                    bgColor="red.500"
                    borderRadius="2xl"
                    p={2}
                    mb={6}
                    mt={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="center"
                  >
                    <Text color="gray.200" bold>
                      Limpar histórico de mensagens
                    </Text>
                  </Box>
                </TouchableOpacity>
                {messages.map((message, i) => (
                  <Box
                    key={`${message.content} - ${i}`}
                    bgColor="amber.400"
                    borderRadius="2xl"
                    maxW="2/3"
                    p={2}
                    mb={2}
                    mt={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf={
                      message.isUserMessage ? "flex-end" : "flex-start"
                    }
                  >
                    <Text bold fontSize="sm">
                      {message.content}
                    </Text>
                  </Box>
                ))}
                {loadingMessages && (
                  <Box
                    bgColor="amber.400"
                    borderRadius="2xl"
                    p={2}
                    mb={2}
                    mt={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="flex-start"
                  >
                    <Spinner size="sm" color="black" fontWeight="bold" />
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
                isDisabled={loadingMessages}
              />
              <MaterialCommunityIcons
                name="send-circle"
                color="#fbbf24"
                size={40}
                style={{ width: 40, height: 40 }}
                onPress={handleSendMessage}
                disabled={loadingMessages}
              />
            </HStack>
          </>
        </ScrollView>
      )}
    </>
  );
}
