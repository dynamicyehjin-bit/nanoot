interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "bg-gray-900 text-white",
    outline: "text-gray-900 border border-gray-200",
    secondary: "bg-gray-100 text-gray-900",
    destructive: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-700",
  };

  const badgeClass = `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className || ''}`.trim();

  return (
    <div
      className={badgeClass}
      {...props}
    />
  );
}
