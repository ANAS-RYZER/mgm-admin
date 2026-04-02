import type { ColumnDef } from "@tanstack/react-table";

type DynamicRow = Record<string, any>;

const escapeCsvCell = (value: unknown): string => {
  const stringValue = value == null ? "" : String(value);
  const escapedValue = stringValue.replace(/"/g, '""');
  return /[",\n]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
};

const getNestedValue = (row: DynamicRow, path?: string) => {
  if (!path) return "";
  return path.split(".").reduce((acc: any, key) => acc?.[key], row);
};

const normalizeHeader = (header: unknown, accessorKey?: string) => {
  if (typeof header === "string") return header;
  if (accessorKey) {
    return accessorKey
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
  return "Column";
};

const getColumnValue = <TData extends DynamicRow>(
  column: ColumnDef<TData, any>,
  row: TData,
) => {
  const resolvedColumn = column as {
    accessorFn?: (originalRow: TData, index: number) => unknown;
    accessorKey?: string;
  };

  if (column.meta?.exportValue) {
    return column.meta.exportValue(row);
  }

  if (typeof resolvedColumn.accessorFn === "function") {
    return resolvedColumn.accessorFn(row, 0);
  }

  if (typeof resolvedColumn.accessorKey === "string") {
    return getNestedValue(row, resolvedColumn.accessorKey);
  }

  return "";
};

interface ExportTableToCsvParams<TData extends DynamicRow> {
  columns: ColumnDef<TData, any>[];
  rows: TData[];
  fileName?: string;
}

export const exportCommissionsToCsv = <TData extends DynamicRow>({
  columns,
  rows,
  fileName,
}: ExportTableToCsvParams<TData>) => {
  const exportableColumns = columns.filter(
    (column) => !column.meta?.excludeFromExport,
  );

  const headers = exportableColumns.map((column) =>
    normalizeHeader(
      column.meta?.exportHeader ?? column.header,
      typeof (column as { accessorKey?: string }).accessorKey === "string"
        ? (column as { accessorKey?: string }).accessorKey
        : undefined,
    ),
  );

  const csvRows = rows.map((row) =>
    exportableColumns.map((column) => escapeCsvCell(getColumnValue(column, row))).join(","),
  );

  const csvContent = [headers.join(","), ...csvRows].join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileDate = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = fileName ?? `commissions-${fileDate}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
