import { ROOT_PATH } from "@/config";
import { AxiosInstance } from "axios";

export function docsEndpoints(axiosInstance: AxiosInstance) {
  return {
    downloadDoc: async (filePath: string) => {
      try {
        const response = await axiosInstance.post("/docs", {
          remotePath: `${ROOT_PATH}/${filePath}`,
          localPath: `./tmp/${filePath}`,
        });
        return response.data;
      } catch (error) {
        console.error("Error doc download:", error);
      }
    },
    getFiles: async () => {
      try {
        const response = await axiosInstance.post("/docs/tree", {
          remotePath: ROOT_PATH,
        });
        return response.data;
      } catch (error) {
        console.error("Error doc list:", error);
      }
    },
    downloadFile: (file) => {
      axiosInstance
        .get(`/tmp/${file.path}`, {
          responseType: "blob", // Indique à axios de traiter la réponse comme un blob
        })
        .then((response) => {
          // Créez un objet URL à partir du blob
          const url = window.URL.createObjectURL(new Blob([response.data]));

          // Créez un lien pour le téléchargement
          const a = document.createElement("a");
          a.href = url;
          a.download = file.name; // Spécifiez le nom de fichier souhaité
          document.body.appendChild(a);

          // Cliquez sur le lien pour déclencher le téléchargement
          a.click();

          // Libérez l'objet URL lorsque le téléchargement est terminé
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error(
            "Il y a eu une erreur lors du téléchargement du fichier:",
            error
          );
        });
    },
    checkFileExists: async (filePath) => {
      try {
        const response = await axiosInstance.head(`/tmp/${filePath}`);
        if (response.status === 200) {
          return true; // Le fichier existe
        }
        return false;
      } catch (error) {
        return false; // Une erreur s'est produite lors de la vérification
      }
    },
  };
}
