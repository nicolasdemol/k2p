/* eslint-disable react-refresh/only-export-components */
import { api } from "@/services/api";
import * as React from "react";

export interface Config {
  remotePath: string;
  localPath: string;
}

interface ConfigContextType {
  config: Config;
}

const ConfigContext = React.createContext<ConfigContextType>(null!);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = React.useState<Config[]>([]);

  React.useEffect(() => {
    const fetchConfig = () => api.getConfig().then((res) => setConfig(res));
    if (config && config.length === 0) {
      fetchConfig();
    }
  }, [config]);

  const value = { config };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  return React.useContext(ConfigContext);
}
