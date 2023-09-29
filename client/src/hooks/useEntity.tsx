import React, { createContext, useContext, useState } from "react";
import { Entity } from "@/interfaces/entity";

interface EntityContextType {
  entity: Entity | undefined;
  setEntity: React.Dispatch<React.SetStateAction<Entity | undefined>>;
}

const EntityContext = createContext<EntityContextType>(null!);

// Créez un fournisseur de contexte
function EntityProvider({ children }: { children?: React.ReactNode }) {
  const [entity, setEntity] = useState<Entity | undefined>(undefined);

  const values = { entity, setEntity };

  return (
    <EntityContext.Provider value={values}>{children}</EntityContext.Provider>
  );
}

function useEntity() {
  const context = useContext(EntityContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export { EntityProvider, useEntity };
