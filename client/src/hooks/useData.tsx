import { api } from "@/services/api";
import * as React from "react";
import { Doc } from "@/interfaces/doc";
import { Issue } from "@/interfaces/issue";
import { User } from "@/interfaces/user";

export interface Assoc {
  aeb: Card;
  cms?: Card;
  pcb: Card;
}

interface DataContextType {
  users: User[];
  cards: Card[];
  issues: Issue[];
  assocs: Assoc[];
  docs: Doc[];
  configs: Config[];
}

export interface Config {
  remotePath: string;
  localPath: string;
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
  const [users, setUsers] = React.useState<User[]>([]);
  const [cards, setCards] = React.useState<Card[]>([]);
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const [assocs, setAssocs] = React.useState<Assoc[]>([]);
  const [docs, setDocs] = React.useState<Doc[]>([]);
  const [configs, setConfigs] = React.useState<Config[]>([]);

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
      api.getDocList().then((res) => setDocs(res));
    };
    if (docs && docs.length === 0) {
      fetchDocs();
    }
  }, [docs]);

  React.useEffect(() => {
    const fetchConfig = () => api.getConfig().then((res) => setConfigs(res));
    if (configs && configs.length === 0) {
      fetchConfig();
    }
  }, [configs]);

  const values = { cards, assocs, docs, users, issues, configs };

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
