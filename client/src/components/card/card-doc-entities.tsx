import * as React from "react";
import { Card } from "../ui/card";
import { Entity } from "@/interfaces/entity";
import { Button } from "../ui/button";
import { useEntity } from "@/hooks/useEntity";

const entities: Array<Entity> = [
  {
    id: 1,
    name: "Soudure",
    color: "#d11141",
    entityType: "AREA",
  },
  {
    id: 2,
    name: "Composant",
    color: "#00aedb",
    entityType: "AREA",
  },
  {
    id: 3,
    name: "Infos",
    color: "#f37735",
    entityType: "AREA",
  },
];

export function CardDocEntities({ handleEnter, handleLeave }) {
  const [selectedEntity, setSelectedEntity] = React.useState(-1);
  const { setEntity, entity } = useEntity();

  const handleSelectedEntities = (index) => {
    setSelectedEntity(selectedEntity !== index ? index : -1);
    setEntity(entities[selectedEntity !== index ? index : -1]);
  };

  return (
    <Card className="w-full flex justify-between items-center px-8 border-dashed border-x-0 border-t-0">
      <div className="h-10 flex space-x-2 items-center">
        {entities.map((entity, index) => (
          <div
            key={entity.id}
            onMouseEnter={() => handleEnter(entity.id)}
            onMouseLeave={() => handleLeave(entity.id)}
          >
            <Button
              size="sm"
              className="h-6"
              role="button"
              style={
                selectedEntity === index || selectedEntity === -1
                  ? { backgroundColor: entity.color }
                  : { backgroundColor: "#bebebe" }
              }
              onClick={() => handleSelectedEntities(index)}
            >
              {entity.name}
            </Button>
          </div>
        ))}
      </div>
      {entity && (
        <span className="text-slate-900 text-sm font-semibold bg-slate-100 py-1 px-2 rounded-md">
          Édition
        </span>
      )}
    </Card>
  );
}
