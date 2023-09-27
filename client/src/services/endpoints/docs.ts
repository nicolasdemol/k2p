import { AxiosInstance } from "axios";

export function docsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getDocs: async () => {
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
      }
    },
  };
}
