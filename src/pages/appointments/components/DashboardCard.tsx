interface DashboardCardProps {
  title: string;
  value: number | string| React.ReactNode;

  icon?: React.ReactNode;
  iconBg?: string;

  leftIcon?: React.ReactNode; // NEW: icon before title
  rightIcon?: React.ReactNode; // alternative to "icon"

  titleClass?: string;
  valueClass?: string;

  containerClass?: string;
}

const DashboardCard = ({
  title,
  value,

  icon, // legacy support
  leftIcon,
  rightIcon,

  iconBg = "bg-black/5",

  titleClass = "text-sm text-gray-600",
  valueClass = "text-xl font-semibold",

  containerClass = "",
}: DashboardCardProps) => {
  return (
    <div
      className={`border px-5 py-4 rounded-lg flex justify-between items-center gap-3 shadow-md bg-white ${containerClass}`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {/* LEFT ICON BEFORE TITLE */}
          {leftIcon && (
            <div className={`${iconBg} rounded-full p-2`}>{leftIcon}</div>
          )}

          <h1 className={titleClass}>{title}</h1>
        </div>

        <div className={valueClass}>{value}</div>
      </div>

      {/* RIGHT ICON (priority: rightIcon -> icon) */}
      {(rightIcon || icon) && (
        <div className={`${iconBg} rounded-full p-3`}>{rightIcon || icon}</div>
      )}
    </div>
  );
};

export default DashboardCard;
