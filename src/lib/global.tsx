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

  ];