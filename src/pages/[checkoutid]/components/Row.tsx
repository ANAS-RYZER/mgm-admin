export const Row = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) => (
  <div className={`flex justify-between text-sm ${bold ? "font-semibold text-lg" : ""}`}>
    <span>{label}</span>
    <span>₹ {value?.toLocaleString("en-IN")}</span>
  </div>
);
