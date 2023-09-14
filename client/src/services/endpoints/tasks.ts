import { AxiosInstance } from "axios";

export function tasksEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllTasks: async () => {
      try {
        const response = await axiosInstance.get("/tasks");
        return { tasks: response.data };
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error; // Gérer l'erreur de manière appropriée
      }
    },

    addTask: async (taskData) => {
      try {
        const response = await axiosInstance.post("/tasks", taskData);
        return response.data;
      } catch (error) {
        console.error("Error adding task:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },

    removeTask: async (taskId) => {
      try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        return response.data;
      } catch (error) {
        console.error("Error removing task:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },

    // Autres fonctions d'appels API liées aux tâches...
  };
}
