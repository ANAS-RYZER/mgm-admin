export const formatCurrency = (
  value?: number,
) => {
  if (!value && value !== 0) return "-";

  if (value >= 10000000) {
    return `₹${(
      value / 10000000
    ).toFixed(1)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(
      value / 100000
    ).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(
      value / 1000
    ).toFixed(1)}K`;
  }

  return `₹${value}`;
};