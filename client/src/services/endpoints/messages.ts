import { Message } from "@/interfaces/message";
import { AxiosInstance } from "axios";

export function messagesEndpoints(axiosInstance: AxiosInstance) {
  return {
    getMsg: async (msgData: Message) => {
      try {
        const response = await axiosInstance.post("/messages/get", msgData);
        return { messages: response.data };
      } catch (error) {
        console.error("Error fetching messages:", error);
        throw error; // Gérer l'erreur de manière appropriée
      }
    },
    
    sendMsg: async (msgData: Message) => {
      try {
        const response = await axiosInstance.post("/messages/send", msgData);
        return response.data;
      } catch (error) {
        console.error("Error sending message:", error);
        throw error; // Gérer l'erreur de manière appropriée
      }
    },
  };
}
