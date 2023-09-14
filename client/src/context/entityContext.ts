import { createContext } from "react";
import { Entity } from "@/interfaces/entity";

interface EntityContextProps {
  entity?: Entity;
  updateEntity: (entity: Entity) => void;
}

const EntityContext = createContext<EntityContextProps>({
  entity: undefined,
  updateEntity: () => {},
});

EntityContext.displayName = "EntityContext";
export default EntityContext;
