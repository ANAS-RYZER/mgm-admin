import { Container } from "lucide-react";

export const EMPTY_TABLE_DATA = [
  {
    id: "Product",
    title: "No asset available",
    description: "There are no assets available at the moment.",
    icon: <Container size={44} />,
    actionButton: {
      label: "Add New Asset",
      location: "/assets/add-asset",
    },
  },
  {
    id: "Applications",
    title: "No applications available",
    description: "There are no applications available at the moment.",
    icon: <Container size={44} />,
  },
  {
    id: "Partners",
    title: "No partners found",
    description: "There are no partners available at the moment.",
    icon: <Container size={44} />,
  },
  {
    id: "Appointments",
    title: "No appointments found",
    description: "There are no appointments available at the moment.",
    icon: <Container size={44} />,
  },
];
