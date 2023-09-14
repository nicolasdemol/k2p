import { useCallback, useState } from "react";
import { Entity } from "@/interfaces/entity";

const useEntity = () => {
  const [entity, setEntity] = useState<Entity>(undefined);

  const updateEntity = useCallback((entity: Entity) => {
    setEntity(entity);
  }, []);

  return {
    entity,
    updateEntity,
  };
};
export default useEntity;
