
interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  color: string;
}

const StatsCard = ({ title, value, description, color }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
