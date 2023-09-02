import { ScrollView, VStack } from "native-base";
import { MainHeader } from "../components/MainHeader";
import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  text: string;
  isUser: boolean;
}

export function CoinBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const addMessage = (text: string, isUser = false) => {
    setMessages([...messages, { text, isUser }]);
  };

  async function handleSendMessage() {
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, true);
    setInputMessage('');

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

      const botMessage = response.data.choices[0].text;
      addMessage(botMessage);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }

  }

  useEffect(() => {
    // Inicializa a conversa com uma mensagem do chatbot
    addMessage('Olá! Como posso ajudar?');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <MainHeader />
      <VStack flex={1} pb={2} bgColor="gray.900" px={2}>
        <VStack flex={1}>

        </VStack>

      </VStack>
    </ScrollView>
  );
}
