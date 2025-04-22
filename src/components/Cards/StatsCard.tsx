interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "green" | "orange" | "purple";
}

function StatsCard({ title, value, subtitle, color }: StatsCardProps) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  const valueColorMap = {
    blue: "text-blue-700",
    green: "text-green-700",
    orange: "text-orange-700",
    purple: "text-purple-700",
  };

  return (
    <div className={`p-6 rounded-md ${colorMap[color]}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className={`text-3xl font-bold mt-1 ${valueColorMap[color]}`}>
        {value}
      </p>
      <p className="text-sm mt-1">{subtitle}</p>
    </div>
  );
}

export default StatsCard;
