import { AxiosInstance } from "axios";

export function assocsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllAssocs: async () => {
      try {
        const response = await axiosInstance.get("/assocs/get");
        return { assocs: response.data };
      } catch (error) {
        console.error("Error fetching assocs:", error);
        return { assocs: [] }; // Gérer l'erreur de manière appropriée
      }
    },

    getAssoc: async (assocId) => {
      try {
        const response = await axiosInstance.get(`/assocs/get/${assocId}`); // Utilisez l'ID pour faire une requête spécifique pour une association
        return { assoc: response.data }; // Retourne l'association spécifique
      } catch (error) {
        console.error(`Error fetching assoc with ID ${assocId}:`, error);
        return { assoc: null }; // Gérer l'erreur de manière appropriée
      }
    },
  };
}
