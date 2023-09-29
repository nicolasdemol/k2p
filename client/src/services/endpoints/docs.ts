import { Doc } from "@/interfaces/doc";
import { AxiosInstance } from "axios";

export function docsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getDocList: async () => {
      try {
        const response = await axiosInstance.get("/docs");
        return response.data;
      } catch (error) {
        console.error("Error doc list:", error);
      }
    },
    refreshDocList: async () => {
      try {
        const response = await axiosInstance.get("/docs/refresh");
        return response.data;
      } catch (error) {
        console.error("Error refresh doc list:", error);
        throw error
      }
    },
    buildDocUrl: async (doc: Doc) => {
      try {
        const response = await axiosInstance.post("/docs", { doc: doc });
        return response.data;
      } catch (error) {
        console.error(
          "L'url du document recherché n'a pas pu être correctement crée."
        );
        throw error;
      }
    },
  };
}
