import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { Cpu, File, MemoryStick, Microscope } from "lucide-react";

export const labels: DataLabel[] = [
  {
    value: "component",
    label: "Composant",
    icon: MemoryStick
  },
  {
    value: "card",
    label: "Carte",
    icon: Cpu
  },
  {
    value: "doc",
    label: "Document",
    icon: File
  },
  {
    value: "equipment",
    label: "Matériel",
    icon: Microscope
  },
];

export type DataLabel = {
  value: string;
  label: string;
  icon?: any;
};

export const statuses: DataLabel[] = [
  {
    value: "todo",
    label: "À Faire",
    icon: CircleIcon,
  },
  {
    value: "done",
    label: "Terminée",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Annulée",
    icon: CrossCircledIcon,
  },
];

export const priorities: DataLabel[] = [
  {
    label: "Minimale",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Normale",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "Haute",
    value: "high",
    icon: ArrowUpIcon,
  },
];
