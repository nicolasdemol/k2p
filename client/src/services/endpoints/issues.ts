import { AxiosInstance } from "axios";

export function issuesEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllIssues: async () => {
      try {
        const response = await axiosInstance.get("/issues/get");
        return { issues: response.data };
      } catch (error) {
        console.error("Erreur lors de la récupération des issues :", error);
        throw error;
      }
    },

    getIssuesById: async (issueId) => {
      try {
        const response = await axiosInstance.get(`/issues/get/${issueId}`);
        return { issues: response.data };
      } catch (error) {
        console.error("Erreur lors de la récupération de l'issue :", error);
        throw error;
      }
    },

    addIssue: async (issueData) => {
      try {
        const response = await axiosInstance.post("/issues/add", issueData);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'issue :", error);
        throw error;
      }
    },

    deleteIssueById: async (issueId) => {
      try {
        const response = await axiosInstance.delete(
          `/issues/delete/${issueId}`
        );
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la suppression de l'issue :", error);
        throw error;
      }
    },
  };
}
