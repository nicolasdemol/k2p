import { api } from "@/services/api";
import * as React from "react";
import { User } from "./useAuth";

export interface Doc {
  name: string;
  path: string;
  type: "f" | "d";
  children?: Doc[];
}

export interface Assoc {
  aeb: Card;
  cms?: Card;
  pcb: Card;
}

interface DataContextType {
  cards: Card[];
  assocs: Assoc[];
  docs: Doc[];
  users: User[];
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
  const [users, setUsers] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [issues, setIssues] = React.useState([]);
  const [assocs, setAssocs] = React.useState([]);
  const [docs, setDocs] = React.useState([]);

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
    async function fetchUsers() {
      api.getAllUsers().then((res) => setUsers(res));
    }
    if (users && users.length === 0) {
      fetchUsers();
    }
  }, [users]);

  React.useEffect(() => {
    const fetchIssues = async () => {
      api.getAllIssues().then((res) => setIssues(res));
    };
    if (issues && issues.length === 0) {
      fetchIssues();
    }
  }, [issues]);

  React.useEffect(() => {
    const fetchDocs = async () => {
      api.getDocs().then((res) => setDocs(res));
    };
    if (docs && docs.length === 0) {
      fetchDocs();
    }
  }, [docs]);

  const values = { cards, assocs, docs, users, issues };

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
