import { io } from "socket.io-client";
import { SERVER_ADDRESS } from "@/config";

const socket = io(SERVER_ADDRESS); // Remplacez l'URL par l'adresse de votre serveur

export default socket;
