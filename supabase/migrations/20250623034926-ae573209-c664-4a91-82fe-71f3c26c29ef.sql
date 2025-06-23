
-- Create volunteers table to store volunteer registrations
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  skills TEXT NOT NULL,
  experience TEXT,
  availability TEXT,
  motivation TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create issues table to store infrastructure issues
CREATE TABLE public.issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Roads', 'Electricity', 'Water', 'Healthcare', 'Education', 'Transport')),
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  reported_by TEXT NOT NULL,
  volunteers_needed INTEGER DEFAULT 1,
  skills_required TEXT,
  estimated_cost DECIMAL(10,2),
  images TEXT[], -- Array to store image URLs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteer_assignments table to track volunteer assignments to issues
CREATE TABLE public.volunteer_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  volunteer_id UUID REFERENCES public.volunteers(id) ON DELETE CASCADE,
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'working', 'completed', 'cancelled')),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  UNIQUE(volunteer_id, issue_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a community platform)
-- Volunteers table policies
CREATE POLICY "Anyone can view volunteers" ON public.volunteers FOR SELECT USING (true);
CREATE POLICY "Anyone can insert volunteer registrations" ON public.volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update volunteer profiles" ON public.volunteers FOR UPDATE USING (true);

-- Issues table policies
CREATE POLICY "Anyone can view issues" ON public.issues FOR SELECT USING (true);
CREATE POLICY "Anyone can report issues" ON public.issues FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update issues" ON public.issues FOR UPDATE USING (true);

-- Volunteer assignments policies
CREATE POLICY "Anyone can view assignments" ON public.volunteer_assignments FOR SELECT USING (true);
CREATE POLICY "Anyone can create assignments" ON public.volunteer_assignments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update assignments" ON public.volunteer_assignments FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX idx_volunteers_email ON public.volunteers(email);
CREATE INDEX idx_volunteers_status ON public.volunteers(status);
CREATE INDEX idx_issues_status ON public.issues(status);
CREATE INDEX idx_issues_category ON public.issues(category);
CREATE INDEX idx_issues_priority ON public.issues(priority);
CREATE INDEX idx_volunteer_assignments_volunteer_id ON public.volunteer_assignments(volunteer_id);
CREATE INDEX idx_volunteer_assignments_issue_id ON public.volunteer_assignments(issue_id);

-- Insert sample data for testing
INSERT INTO public.issues (title, category, description, location, status, priority, reported_by, volunteers_needed, skills_required) VALUES
('Damaged road near school', 'Roads', 'The main road connecting our village to the school has several large potholes making it dangerous for children to walk to school.', 'Rampur Village, Main Road', 'open', 'high', 'Rajesh Kumar', 3, 'Civil Engineering, Labor'),
('Irregular electricity supply', 'Electricity', 'Power outages lasting 8-10 hours daily affecting local businesses and household activities.', 'Sundarpur Village', 'in-progress', 'medium', 'Priya Sharma', 2, 'Electrical Engineering'),
('Water pump maintenance needed', 'Water', 'Community water pump requires immediate maintenance to ensure clean water supply to 50+ families.', 'Madhavpur Village', 'open', 'high', 'Village Committee', 2, 'Plumbing, Mechanical'),
('Solar street lights installation', 'Electricity', 'Need installation of solar street lights in the main market area for better safety.', 'Nandgaon Village', 'open', 'medium', 'Local Youth Committee', 4, 'Electrical work, Solar installation');
