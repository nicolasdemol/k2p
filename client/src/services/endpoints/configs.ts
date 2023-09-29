import { Config } from "@/interfaces/config";
import { AxiosInstance } from "axios";

export function configsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getConfig: async () => {
      try {
        const response = await axiosInstance.get("/configs");
        return response.data;
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    },
    updateConfig: async (newConfig: Config) => {
      // Assurez-vous de spécifier le type de newConfig
      try {
        const response = await axiosInstance.patch("/configs", newConfig, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error updating config:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },
  };
}
