interface DashboardCardProps {
  title?: string;
  value: number | string | React.ReactNode;

  icon?: React.ReactNode;
  iconBg?: string;

  leftIcon?: React.ReactNode; // NEW: icon before title
  rightIcon?: React.ReactNode; // alternative to "icon"
  leftBigIcon?: React.ReactNode; // NEW: bigger icon on the left, separate from title
  rightButton?: React.ReactNode; // NEW: button on the right side

  titleClass?: string;
  valueClass?: string;
  subTitle?: string;

  containerClass?: string;
}

const DashboardCard = ({
  title,
  value,

  icon, // legacy support
  leftIcon,
  rightIcon,
  leftBigIcon,
  rightButton,

  iconBg = "bg-black/5",
  titleClass = "text-sm text-gray-600",
  valueClass = "text-xl font-semibold",
  subTitle,

  containerClass = "flex justify-between items-center gap-3",
}: DashboardCardProps) => {
  return (
    <div
      className={`border px-5 py-4 rounded-lg  shadow-md bg-white ${containerClass}`}
    >
      {leftBigIcon && (
        <div className={`${iconBg} rounded-full p-3`}>{leftBigIcon}</div>
      )}
      <div className="space-y-2">
        {(leftIcon || title) && (
          <div className="flex items-center gap-2">
            {/* LEFT ICON BEFORE TITLE */}
            {leftIcon && (
              <div className={`${iconBg} rounded-full p-2`}>{leftIcon}</div>
            )}

            <h1 className={titleClass}>{title}</h1>
          </div>
        )}

        <div className={valueClass}>
          <h1>{value}</h1>
          <p className="text-sm text-muted-foreground font-medium">
            {subTitle}
          </p>
        </div>
      </div>

      {/* RIGHT ICON (priority: rightIcon -> icon) */}
      {(rightIcon || icon) && (
        <div className={`${iconBg} rounded-full p-3`}>{rightIcon || icon}</div>
      )}

      {/* RIGHT BUTTON */}
      {rightButton && <div className="ml-2">{rightButton}</div>}

    </div>
  );
};

export default DashboardCard;
