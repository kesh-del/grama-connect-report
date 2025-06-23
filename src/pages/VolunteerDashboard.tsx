
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Users, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import IssueCard from '../components/IssueCard';

const VolunteerDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const allIssues = [
    {
      id: '1',
      title: 'Damaged road near school',
      category: 'Roads',
      description: 'The main road connecting our village to the school has several large potholes making it dangerous for children to walk to school.',
      location: 'Rampur Village, Main Road',
      status: 'open' as const,
      reportedBy: 'Rajesh Kumar',
      reportedDate: '2 days ago',
      priority: 'High',
      volunteersNeeded: 3,
      skillsRequired: 'Civil Engineering, Labor'
    },
    {
      id: '2',
      title: 'Irregular electricity supply',
      category: 'Electricity',
      description: 'Power outages lasting 8-10 hours daily affecting local businesses and household activities.',
      location: 'Sundarpur Village',
      status: 'in-progress' as const,
      reportedBy: 'Priya Sharma',
      reportedDate: '5 days ago',
      priority: 'Medium',
      volunteersNeeded: 2,
      skillsRequired: 'Electrical Engineering'
    },
    {
      id: '3',
      title: 'Water pump maintenance needed',
      category: 'Water',
      description: 'Community water pump requires immediate maintenance to ensure clean water supply to 50+ families.',
      location: 'Madhavpur Village',
      status: 'open' as const,
      reportedBy: 'Village Committee',
      reportedDate: '1 day ago',
      priority: 'High',
      volunteersNeeded: 2,
      skillsRequired: 'Plumbing, Mechanical'
    },
    {
      id: '4',
      title: 'Solar street lights installation',
      category: 'Electricity',
      description: 'Need installation of solar street lights in the main market area for better safety.',
      location: 'Nandgaon Village',
      status: 'open' as const,
      reportedBy: 'Local Youth Committee',
      reportedDate: '3 days ago',
      priority: 'Medium',
      volunteersNeeded: 4,
      skillsRequired: 'Electrical work, Solar installation'
    }
  ];

  const myAssignments = [
    {
      id: '2',
      title: 'Irregular electricity supply',
      location: 'Sundarpur Village',
      status: 'In Progress',
      assignedDate: '3 days ago',
      deadline: '1 week',
      progress: 60
    }
  ];

  const stats = [
    { label: 'Available Issues', value: '12', icon: AlertCircle, color: 'text-orange-600' },
    { label: 'My Active Projects', value: '1', icon: Clock, color: 'text-blue-600' },
    { label: 'Completed Projects', value: '3', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Impact Score', value: '85', icon: Users, color: 'text-purple-600' }
  ];

  const filteredIssues = selectedFilter === 'all' 
    ? allIssues 
    : allIssues.filter(issue => issue.status === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GramaConnect</h1>
                <p className="text-sm text-gray-500">Volunteer Dashboard</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/volunteer-registration">
                <Button variant="outline">Register New Volunteer</Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">Volunteer</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Current Assignments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Current Assignments</CardTitle>
            <CardDescription>Issues currently assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            {myAssignments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.location}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {assignment.status}
                        </span>
                      </TableCell>
                      <TableCell>{assignment.assignedDate}</TableCell>
                      <TableCell>{assignment.deadline}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${assignment.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{assignment.progress}%</span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 py-8">No current assignments. Browse available issues below to get started!</p>
            )}
          </CardContent>
        </Card>

        {/* Available Issues */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Available Issues</CardTitle>
                <CardDescription>Issues that need volunteer assistance</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedFilter === 'open' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('open')}
                >
                  Open
                </Button>
                <Button
                  variant={selectedFilter === 'in-progress' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('in-progress')}
                >
                  In Progress
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="relative">
                  <IssueCard {...issue} />
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Volunteers needed: {issue.volunteersNeeded}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                        issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Skills required: {issue.skillsRequired}
                    </p>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Apply to Help
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
