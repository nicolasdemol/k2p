import { AxiosInstance } from "axios";

export function metricsEndpoints(axiosInstance: AxiosInstance) {
  return {
    getCA: async (startDate: string, endDate: string) => {
      try {
        const response = await axiosInstance.get("/metrics/ca", {
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        });
        return { ca: response.data };
      } catch (error) {
        console.error("Error fetching CA:", error);
        throw error;
      }
    },
    getProductivity: async (startDate: string, endDate: string) => {
      try {
        const response = await axiosInstance.get("/metrics/productivity", {
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        });
        return { productivity: response.data };
      } catch (error) {
        console.error("Error fetching productivity:", error);
        throw error;
      }
    },
  };
}
