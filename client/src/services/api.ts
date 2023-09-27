import axios from "axios";
import { SERVER_ADDRESS } from "@/config";

import { usersEndpoints } from "./endpoints/users";
import { cardsEndpoints } from "./endpoints/cards";
import { issuesEndpoints } from "./endpoints/issues";
import { assocsEndpoints } from "./endpoints/assocs";
import { docsEndpoints } from "./endpoints/docs";
import { messagesEndpoints } from "./endpoints/messages";
import { notificationsEndpoints } from "./endpoints/notifications";
import { tasksEndpoints } from "./endpoints/tasks";
import { metricsEndpoints } from "./endpoints/metrics";
import { configsEndpoints } from "./endpoints/configs";

const axiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}/api`, // Remplacez par l'URL de votre serveur
});

// Intercepteur pour inclure automatiquement le token dans le header des requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Combinez les endpoints pour chaque entité
const api = {
  ...usersEndpoints(axiosInstance),
  ...cardsEndpoints(axiosInstance),
  ...issuesEndpoints(axiosInstance),
  ...assocsEndpoints(axiosInstance),
  ...docsEndpoints(axiosInstance),
  ...messagesEndpoints(axiosInstance),
  ...notificationsEndpoints(axiosInstance),
  ...tasksEndpoints(axiosInstance),
  ...metricsEndpoints(axiosInstance),
  ...configsEndpoints(axiosInstance),
  // Ajoutez d'autres entités si nécessaire
};

export { api };
