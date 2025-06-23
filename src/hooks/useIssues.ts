
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Issue {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reported_by: string;
  volunteers_needed: number;
  skills_required?: string;
  estimated_cost?: number;
  images?: string[];
  created_at: string;
  updated_at: string;
}

export const useIssues = () => {
  return useQuery({
    queryKey: ['issues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Issue[];
    }
  });
};

export const useIssuesByStatus = (status?: string) => {
  return useQuery({
    queryKey: ['issues', status],
    queryFn: async () => {
      let query = supabase.from('issues').select('*');
      
      if (status && status !== 'all') {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Issue[];
    }
  });
};
