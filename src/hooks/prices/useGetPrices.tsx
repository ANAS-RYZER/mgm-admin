import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export type PriceItem = {
  _id?: string;
  id?: string;
  name: string;
  price: number;
};

export type PricesData = {
  platinum: PriceItem[];
  gold: PriceItem[];
};

function normalizeItem(raw: PriceItem): PriceItem {
  const id = raw._id ?? raw.id;
  return { ...raw, _id: id };
}

export default function useGetPrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await api.get<{ message: string; data: PricesData; count: number }>("/prices");
      const d = res.data.data;
      return {
        platinum: (d.platinum ?? []).map(normalizeItem),
        gold: (d.gold ?? []).map(normalizeItem),
      };
    },
    staleTime: 60 * 1000,
    retry: 2,
  });
}
