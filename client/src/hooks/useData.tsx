import { api } from "@/services/api";
import * as React from "react";

export interface FileItem {
  name: string;
  type: "f";
}

export interface FolderItem {
  name: string;
  type: "d";
  children: (FileItem | FolderItem)[];
}

export type FileStructure = (FileItem | FolderItem)[];

export interface Assoc {
  aeb: Card;
  cms?: Card;
  pcb: Card;
}

interface DataContextType {
  cards: Card[];
  assocs: Assoc[];
  files: FileStructure;
}

export interface Card {
  _id: string;
  ref: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
}

const DataContext = React.createContext<DataContextType>(null!);

function DataProvider({ children }: { children?: React.ReactNode }) {
  const [cards, setCards] = React.useState([]);
  const [assocs, setAssocs] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [loadingFiles, setLoadingFiles] = React.useState(false);

  React.useEffect(() => {
    async function fetchCards() {
      api.getAllCards().then((res) => setCards(res));
    }
    if (cards && cards.length === 0) {
      fetchCards();
    }
  }, [cards]);

  React.useEffect(() => {
    async function fetchAssocs() {
      api.getAllAssocs().then((res) => setAssocs(res));
    }
    if (assocs && assocs.length === 0) {
      fetchAssocs();
    }
  }, [assocs]);

  React.useEffect(() => {
    async function listfiles() {
      // Vérifiez d'abord si les fichiers sont déjà en cache
      const cachedFiles = localStorage.getItem("cachedFiles");

      if (cachedFiles) {
        setFiles(JSON.parse(cachedFiles));
      } else {
        // Si les fichiers ne sont pas en cache, effectuez la requête API
        setLoadingFiles(true); // Définissez l'état de chargement sur true pendant le chargement
        api.getFiles().then((res) => {
          setFiles(res);
          localStorage.setItem("cachedFiles", JSON.stringify(res)); // Mettez en cache les fichiers
          setLoadingFiles(false); // Rétablissez l'état de chargement une fois terminé
        });
      }
    }

    if (files.length === 0 && !loadingFiles) {
      listfiles();
    }
  }, [files, loadingFiles]);

  const values = { cards, assocs, files };

  return (
    // 2. Utilisez le contexte pour fournir les données et les fonctions aux enfants.
    <DataContext.Provider value={values}>{children}</DataContext.Provider>
  );
}

// 3. Créez un hook personnalisé pour accéder aux données depuis le contexte.
function useData() {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export { DataProvider, useData };
