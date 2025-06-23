
interface SuccessStoryProps {
  title: string;
  village: string;
  description: string;
  impact: string;
  image: string;
}

const SuccessStoryCard = ({ title, village, description, impact, image }: SuccessStoryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <img 
        src={`https://images.unsplash.com/${image}?w=400&h=200&fit=crop`} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-sm text-green-600 font-medium">{village}</span>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-sm text-green-800 font-medium">Impact: {impact}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
