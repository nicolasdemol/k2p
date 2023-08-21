import { AxiosInstance } from "axios";
import socket from "../socket";

export function tasksEndpoints(axiosInstance: AxiosInstance) {
  return {
    getAllTasks: async () => {
      try {
        const response = await axiosInstance.get("/tasks/get");
        return { tasks: response.data };
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error; // Gérer l'erreur de manière appropriée
      }
    },

    addTask: async (taskData) => {
      try {
        const response = await axiosInstance.post("/tasks/add", taskData);
        socket.emit("addTask", taskData);
        return response.data;
      } catch (error) {
        console.error("Error adding task:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },

    removeTask: async (taskId) => {
      try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        console.log(taskId);
        socket.emit("removeTask", taskId);
        return response.data;
      } catch (error) {
        console.error("Error removing task:", error);
        throw error; // Gérer l'erreur de manière appropriée ou renvoyer un message d'erreur
      }
    },

    // Autres fonctions d'appels API liées aux cartes...
  };
}
