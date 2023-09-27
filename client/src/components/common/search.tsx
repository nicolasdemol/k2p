import * as React from "react";
import {
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandDialog,
} from "@/components/ui/command";

import { useNavigate } from "react-router-dom";
import { Cpu, CircuitBoard } from "lucide-react";
import { Card, useData } from "@/hooks/useData";

export function Search({ children, ...props }) {
  const [open, setOpen] = React.useState(false);
  const { cards } = useData();
  const [search, setSearch] = React.useState("");
  const [filteredCards, setFilteredCards] = React.useState<Card[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    const searchTokens = search.toLowerCase().split(" "); // Diviser la requête en mots

    const filteredData = cards.filter((card) => {
      if (!searchTokens.length) {
        return true; // Si la recherche est vide, afficher toutes les cartes
      }

      const refLower = card.ref.toString().toLowerCase();
      const nameLower = card.name.toLowerCase();

      // Vérifier si tous les mots de recherche sont présents dans le numéro de référence ou le nom de la carte
      return searchTokens.every((token) => {
        return refLower.includes(token) || nameLower.includes(token);
      });
    });

    // Mettre à jour l'état avec les résultats de la recherche
    setFilteredCards(filteredData);
  }, [search, cards]);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <CommandDialog open={open} onOpenChange={setOpen} {...props}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Rechercher un produit..."
        />
        {search && <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>}
        <CommandGroup
          heading="Teledyne Oldham Simtronics"
        >
          {filteredCards.slice(0, 8).map((card) => (
            <CommandItem
              key={card._id}
              className="p-3 m-1 rounded-md"
              onSelect={() => {
                navigate(`/cards/${card.ref}`, {
                  state: { card: card },
                });
                setOpen(false);
              }}
            >
              {card.type === "AEB" ? (
                <Cpu strokeWidth={1.5} className="mr-2 h-4 w-4" />
              ) : (
                <CircuitBoard strokeWidth={1.5} className="mr-2 h-4 w-4" />
              )}

              <span>
                {card.name}{" "}
                <strong className="text-[#1F51FF] font-semibold">
                  {card.ref}
                </strong>
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandDialog>
    </>
  );
}
