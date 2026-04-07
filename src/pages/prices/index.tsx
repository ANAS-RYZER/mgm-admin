import { AdminLayout } from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useGetPrices, { type PriceItem } from "@/hooks/prices/useGetPrices";
import useUpdatePrice from "@/hooks/prices/useUpdatePrice";
import { Loader2, Pencil } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

function PriceRow({
  item,
  onSave,
  isSaving,
}: {
  item: PriceItem;
  onSave: (id: string, price: number) => void;
  isSaving: boolean;
}) {
  const id = item._id ?? item.id;
  const [value, setValue] = useState(String(item.price));
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDirty = Number(value) !== item.price;

  const handleBlur = useCallback(() => {
    const num = Number(value);
    if (!id || Number.isNaN(num) || num < 0) {
      setIsEditing(false);
      setValue(String(item.price));
      return;
    }
    if (isDirty) onSave(id, num);
    setIsEditing(false);
  }, [id, value, isDirty, item.price, onSave]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === "Escape") {
      setValue(String(item.price));
      setIsEditing(false);
      inputRef.current?.blur();
    }
  };

  const startEditing = () => {
    if (!id || isSaving) return;
    setIsEditing(true);
    setValue(String(item.price));
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-4 py-2 border-b border-black/5 last:border-0">
        <span className="flex-1 text-sm font-medium text-foreground">
          {item.name}
        </span>
        <div className="flex items-center gap-2 w-36 justify-end">
          <span className="text-sm text-muted-foreground tabular-nums">
            {item.price}
          </span>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
            disabled={!id || isSaving}
            onClick={startEditing}
            aria-label="Edit price"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 py-2 border-b border-black/5 last:border-0">
      <span className="flex-1 text-sm font-medium text-foreground">
        {item.name}
      </span>
      <div className="flex items-center gap-2 w-36">
        <Input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={!id || isSaving}
          className="h-9 text-sm text-right"
        />
        {id && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-9 shrink-0"
            disabled={isSaving}
            onClick={() => {
              const num = Number(value);
              if (!Number.isNaN(num) && num >= 0) {
                onSave(id, num);
                setIsEditing(false);
              }
            }}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
          </Button>
        )}
      </div>
    </div>
  );
}

function PriceSection({
  title,
  items,
  onSave,
  isSaving,
}: {
  title: string;
  items: PriceItem[];
  onSave: (id: string, price: number) => void;
  isSaving: boolean;
}) {
  return (
    <Card className="border border-black/10 bg-white shadow-sm rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No items</p>
        ) : (
          items.map((item) => (
            <PriceRow
              key={item._id ?? item.id ?? item.name}
              item={item}
              onSave={onSave}
              isSaving={isSaving}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default function PricesPage() {
  const { data, isLoading, isError, error } = useGetPrices();
  const { mutate: updatePrice, isPending: isUpdating } = useUpdatePrice();

  const handleSave = useCallback(
    (id: string, price: number) => {
      updatePrice(
        { id, price },
        {
          onSuccess: () => toast.success("Price updated"),
          onError: (err: any) => {
            const msg =
              err?.response?.data?.message ?? err?.message ?? "Update failed";
            toast.error(msg);
          },
        },
      );
    },
    [updatePrice],
  );

  // if (isLoading) {
  //   return (
  //     <AdminLayout title="Prices" description="Manage metal prices">
  //       <div className="p-4 mt-10 text-sm text-muted-foreground">
  //         <LoadingSpinner label={"Loading Prices..."} />
  //       </div>
  //     </AdminLayout>
  //   );
  // }

  if (isError) {
    return (
      <AdminLayout title="Prices">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          {error?.message ?? "Failed to load prices"}
        </div>
      </AdminLayout>
    );
  }

  const platinum = data?.platinum ?? [];
  const gold = data?.gold ?? [];

  return (
    <AdminLayout
      title="Price Management"
      description="Manage and update metal prices."
      searchBar={false}
    >
      {isLoading && (
        <div className="p-4 mt-10 text-sm text-muted-foreground">
          <LoadingSpinner label={"Loading Prices..."} />
        </div>
      )}
      {!isLoading && (
        <div className="grid gap-6    grid-cols-2">
          <PriceSection
            title="Platinum"
            items={platinum}
            onSave={handleSave}
            isSaving={isUpdating}
          />
          <PriceSection
            title="Gold"
            items={gold}
            onSave={handleSave}
            isSaving={isUpdating}
          />
        </div>
      )}
    </AdminLayout>
  );
}
