import { AxiosInstance } from "axios";

export function docsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllDocs: async () => {
      try {
        const response = await axiosInstance.get("/docs/get");
        return { docs: response.data };
      } catch (error) {
        console.error("Error fetching cards:", error);
        return { docs: [] }; // Gérer l'erreur de manière appropriée
      }
    },
    getDoc: async (ref, type) => {
      try {
        const response = await axiosInstance.get(`/docs/get/${ref}/${type}`, {
          responseType: "arraybuffer",
        });
        return { doc: response.data };
      } catch (error) {
        console.error("Error fetching cards:", error);
        return { doc: [] }; // Gérer l'erreur de manière appropriée
      }
    },

    // Autres fonctions d'appels API liées aux cartes...
  };
}
