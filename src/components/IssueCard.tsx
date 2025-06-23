
interface IssueCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  status: 'open' | 'in-progress' | 'resolved';
  reportedBy: string;
  reportedDate: string;
}

const IssueCard = ({ title, category, description, location, status, reportedBy, reportedDate }: IssueCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Roads': return '🛣️';
      case 'Electricity': return '⚡';
      case 'Water': return '💧';
      case 'Healthcare': return '🏥';
      default: return '📋';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCategoryIcon(category)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{category} • {location}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status.replace('-', ' ')}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Reported by {reportedBy}</span>
        <span>{reportedDate}</span>
      </div>
    </div>
  );
};

export default IssueCard;
