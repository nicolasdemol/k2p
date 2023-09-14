import { AxiosInstance } from "axios";

export function assocsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllAssocs: async () => {
      try {
        const response = await axiosInstance.get("/assocs/get");
        return response.data;
      } catch (error) {
        console.error("Error fetching assocs:", error);
        return { assocs: [] }; // Gérer l'erreur de manière appropriée
      }
    },

    getAssocByRef: async (ref: string | number) => {
      try {
        const response = await axiosInstance.get(`/assocs/get/${ref}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching cards:", error);
        throw error; // Gérer l'erreur de manière appropriée
      }
    },
  };
}
