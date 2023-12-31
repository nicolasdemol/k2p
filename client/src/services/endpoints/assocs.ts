import { Assoc } from "@/interfaces/assoc";
import { AxiosInstance } from "axios";

export function assocsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllAssocs: async () => {
      try {
        const response = await axiosInstance.get("/assocs");
        return response.data;
      } catch (error) {
        console.error("Error fetching assocs:", error);
      }
    },
    updateAssocs: async (newAssocs: Assoc[]) => {
      try {
        const response = await axiosInstance.post("/assocs", newAssocs, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error updating assocs:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },
  };
}
