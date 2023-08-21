import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "documentation",
    label: "Documentation",
  },
  {
    value: "panne",
    label: "Panne",
  },
  {
    value: "feature",
    label: "Fonctionnalité",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "En Attente",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "À Faire",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "En Progression",
    icon: StopwatchIcon,
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

export const priorities = [
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
