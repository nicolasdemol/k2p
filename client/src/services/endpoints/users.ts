import { User } from "@/interfaces/user";
import { AxiosInstance } from "axios";

export function usersEndpoints(axiosInstance: AxiosInstance) {
  return {
    logInWithUsername: async (username: string, password: string) => {
      try {
        const response = await axiosInstance.post("/users/login", {
          username,
          password,
        });
        return { user: response.data.user, token: response.data.token };
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
      }
    },
    signUpWithUsername: async (userData: User) => {
      try {
        const response = await axiosInstance.post("/users/signup", userData);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
      }
    },
    removeUser: async (userId: string) => {
      try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
      }
    },
    getAllUsers: async () => {
      try {
        const response = await axiosInstance.get(`/users`);
        return response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        throw error;
      }
    },
  };
}
