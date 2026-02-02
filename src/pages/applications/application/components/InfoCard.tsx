import { ReactNode } from "react";

type InfoItem = {
  label: string;
  value?: ReactNode;
};

type InfoCardProps = {
  title: string;
  items: InfoItem[];
  columns?: number;
};

const InfoCard = ({
  title,
  items,
  columns = 2,
}: InfoCardProps) => {
  return (
    <div className="rounded-lg border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>

      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="font-medium">
              {item.value ?? "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
