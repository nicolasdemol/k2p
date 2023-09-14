import { AxiosInstance } from "axios";

export function cardsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllCards: async () => {
      try {
        const response = await axiosInstance.get("/cards/get");
        return response.data;
      } catch (error) {
        console.error("Error fetching cards:", error);
        throw error; // Gérer l'erreur de manière appropriée
      }
    },

    getCardByRef: async (ref) => {
      try {
        const response = await axiosInstance.get(`/cards/get/${ref}`);
        return response.data
      } catch (error) {
        console.error("Error fetching cards:", error);
        throw error; // Gérer l'erreur de manière appropriée
      }
    },

    addCard: async (cardData) => {
      try {
        const response = await axiosInstance.post("/cards/add", cardData);
        return response.data;
      } catch (error) {
        console.error("Error adding card:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },

    removeCard: async (cardId) => {
      try {
        const response = await axiosInstance.delete(`/cards/${cardId}`);
        return response.data;
      } catch (error) {
        console.error("Error adding card:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },

    // Autres fonctions d'appels API liées aux cartes...
  };
}
