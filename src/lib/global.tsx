import { ClipboardList, Container, Diamond, Gem } from "lucide-react";
import { toast } from "sonner";

export const EMPTY_TABLE_DATA = [
  {
    id: "product",
    title: "No products available",
    description:
      "There are no products available. Please add new products to see them here.",
    icon: <Gem size={44} />,
    actionButton: {
      label: "Add New Product",
      location: "/add-product",
    },
  },
  {
    id: "Applications",
    title: "No applications available",
    description: "There are no applications available at the moment.",
    icon: <ClipboardList size={44} />,
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
  {
    id: "Commisions",
    title: "No commissions found",
    description: "There are no commissions available for this partner.",
    icon: <Container size={44} />,
  },
];

export const categoryColors: Record<string, string> = {
  bracelets: "bg-blue-100 text-blue-800 border-blue-400",
  earrings: "bg-green-100 text-green-800 border-green-400",
  rings: "bg-yellow-100 text-yellow-800 border-yellow-400",
  bangles: "bg-pink-100 text-pink-800 border-pink-400",
  pendants: "bg-purple-100 text-purple-800 border-purple-400",
  mangalsutras: "bg-emerald-100 text-emerald-800 border-emerald-400",
  chains: "bg-amber-100 text-amber-800 border-amber-400",
  necklaces: "bg-indigo-100 text-indigo-800 border-indigo-400",
};

export const categories = [
  {
    value: "bracelets",
    label: "Bracelets",
    active: "bg-blue-700",
    hover: "hover:bg-blue-700",
  },
  {
    value: "earrings",
    label: "Earrings",
    active: "bg-green-700",
    hover: "hover:bg-green-700",
  },
  {
    value: "rings",
    label: "Rings",
    active: "bg-yellow-700",
    hover: "hover:bg-yellow-700",
  },
  {
    value: "bangles",
    label: "Bangles",
    active: "bg-pink-700",
    hover: "hover:bg-pink-700",
  },
  {
    value: "pendants",
    label: "Pendants",
    active: "bg-purple-700",
    hover: "hover:bg-purple-700",
  },
  {
    value: "mangalsutras",
    label: "Mangalsutras",
    active: "bg-emerald-700",
    hover: "hover:bg-emerald-700",
  },
  {
    value: "chains",
    label: "Chains",
    active: "bg-amber-700",
    hover: "hover:bg-amber-700",
  },
  {
    value: "necklaces",
    label: "Necklaces",
    active: "bg-indigo-700",
    hover: "hover:bg-indigo-700",
  }
];
export const formatINR = (amount?: number) => {
  if (amount === null || amount === undefined) return "-";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const handleCopyToClipboard = (text: string,message: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success(`${message} copied to clipboard!`);
    },
    (err) => {
      toast.error("Failed to copy text: ", err);
    },
  );
};
