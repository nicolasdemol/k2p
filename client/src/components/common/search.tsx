import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/services/api";

import { useNavigate } from "react-router-dom";

interface Card {
  _id: string;
  ref: number;
  name: string;
}

export function Search({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const [cards, setCards] = React.useState<Card[]>([]);
  const [search, setSearch] = React.useState("");
  const [filteredCards, setFilteredCards] = React.useState<Card[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCards = async () => {
      await api.getAllCards().then((res) => setCards(res.cards));
    };
    fetchCards();
  }, []);

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
    const searchNumber = parseInt(search);
    const filteredData = cards.filter((card) => {
      // Vérifier si la valeur de recherche correspond à un numéro de référence (Number)
      if (!isNaN(searchNumber)) {
        return card.ref.toString().startsWith(searchNumber.toString());
      }
      // Si la valeur de recherche n'est pas un nombre, alors rechercher par nom de carte (String)
      return card.name.toLowerCase().includes(search.toLowerCase());
    });

    // Mettre à jour l'état avec les résultats de la recherche
    setFilteredCards(filteredData);
  }, [search, cards]);

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Rechercher une carte"
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {"Rechercher une carte"}
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Rechercher une carte..."
          />
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Teledyne Oldham Simtronics">
            {filteredCards.slice(0, 10).map((card) => (
              <CommandItem
                key={card._id}
                onSelect={() => {
                  navigate(`/cards/${card.ref}`);
                  setOpen(false);
                }}
              >
                {card.ref} - {card.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
