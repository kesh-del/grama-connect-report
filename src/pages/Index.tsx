
import { useState } from 'react';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import IssueCard from '../components/IssueCard';
import SuccessStoryCard from '../components/SuccessStoryCard';
import ReportForm from '../components/ReportForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sampleIssues = [
    {
      id: '1',
      title: 'Damaged road near school',
      category: 'Roads',
      description: 'The main road connecting our village to the school has several large potholes making it dangerous for children to walk to school.',
      location: 'Rampur Village, Main Road',
      status: 'open' as const,
      reportedBy: 'Rajesh Kumar',
      reportedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'Irregular electricity supply',
      category: 'Electricity',
      description: 'Power outages lasting 8-10 hours daily affecting local businesses and household activities.',
      location: 'Sundarpur Village',
      status: 'in-progress' as const,
      reportedBy: 'Priya Sharma',
      reportedDate: '5 days ago'
    },
    {
      id: '3',
      title: 'Water pump maintenance completed',
      category: 'Water',
      description: 'Community water pump has been successfully repaired and is now providing clean water to 50+ families.',
      location: 'Greenfield Village',
      status: 'resolved' as const,
      reportedBy: 'Village Committee',
      reportedDate: '1 week ago'
    }
  ];

  const successStories = [
    {
      title: 'Solar Street Lights Installation',
      village: 'Madhavpur',
      description: 'Community collaboration with local NGO resulted in installation of 25 solar street lights, improving safety and enabling evening activities.',
      impact: '200+ families benefited, 60% reduction in evening accidents',
      image: 'photo-1466442929976-97f336a657be'
    },
    {
      title: 'Water Filtration System',
      village: 'Nandgaon',
      description: 'Village youth implemented a low-cost water filtration system using locally available materials, providing clean drinking water.',
      impact: '150 families now have access to safe drinking water',
      image: 'photo-1500673922987-e212871fec22'
    },
    {
      title: 'Community Road Repair',
      village: 'Shivpur',
      description: 'Villagers organized a community initiative to repair the main access road using crowdfunded resources and volunteer labor.',
      impact: 'Improved connectivity for 300+ residents, increased market access',
      image: 'photo-1433086966358-54859d0ed716'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard
                title="Total Issues Reported"
                value="127"
                description="Last 30 days: +23"
                color="text-blue-600"
              />
              <StatsCard
                title="Issues Resolved"
                value="89"
                description="70% resolution rate"
                color="text-green-600"
              />
              <StatsCard
                title="Active Villages"
                value="45"
                description="Across 3 districts"
                color="text-purple-600"
              />
              <StatsCard
                title="Community Members"
                value="2,340"
                description="Growing daily"
                color="text-orange-600"
              />
            </div>

            {/* Recent Issues */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Issues</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sampleIssues.map((issue) => (
                  <IssueCard key={issue.id} {...issue} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'report':
        return <ReportForm />;

      case 'success':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <SuccessStoryCard key={index} {...story} />
              ))}
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Educational Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Fixes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500">💡</span>
                    <div>
                      <p className="font-medium">DIY Solar Lamps</p>
                      <p className="text-sm text-gray-600">Simple solar lighting solutions using basic materials</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500">💧</span>
                    <div>
                      <p className="font-medium">Water Purification</p>
                      <p className="text-sm text-gray-600">Low-cost water filtration methods for households</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-500">🛣️</span>
                    <div>
                      <p className="font-medium">Road Maintenance</p>
                      <p className="text-sm text-gray-600">Community-led road repair techniques</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900">Technical Support</p>
                    <p className="text-sm text-gray-600">help@gramaconnect.org</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">NGO Partnerships</p>
                    <p className="text-sm text-gray-600">partners@gramaconnect.org</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Emergency Hotline</p>
                    <p className="text-sm text-gray-600">1800-GRAMA-HELP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'report'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Report Issue
            </button>
            <button
              onClick={() => setActiveTab('success')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'success'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Success Stories
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'resources'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Resources
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
