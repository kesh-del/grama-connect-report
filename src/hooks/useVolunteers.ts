
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Volunteer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  skills: string;
  experience?: string;
  availability?: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface VolunteerRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: string;
  experience: string;
  availability: string;
  motivation: string;
}

export const useVolunteers = () => {
  return useQuery({
    queryKey: ['volunteers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Volunteer[];
    }
  });
};

export const useVolunteerRegistration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (volunteerData: VolunteerRegistrationData) => {
      const { data, error } = await supabase
        .from('volunteers')
        .insert({
          full_name: volunteerData.fullName,
          email: volunteerData.email,
          phone: volunteerData.phone,
          location: volunteerData.location,
          skills: volunteerData.skills,
          experience: volunteerData.experience,
          availability: volunteerData.availability,
          motivation: volunteerData.motivation,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
      toast.success('Volunteer registration submitted successfully!');
    },
    onError: (error: any) => {
      console.error('Registration error:', error);
      toast.error('Failed to submit registration. Please try again.');
    }
  });
};
