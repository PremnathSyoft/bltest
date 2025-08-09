import { useState, useCallback } from 'react';
import { useAuth } from '../auth-context';

export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  role: string;
  verification_status: string;
  price_per_hour: number;
  created_at: string;
}

export interface TeamMemberFormData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  mobile_number: string;
  email: string;
  profile_pic: string;
  role: string;
  price_per_hour: number;
  dob: string;
  terms_accepted: boolean;
  location_ids: string[];
  driving_license_number: string;
  driving_license_image: string;
  address_proof_image: string;
  verification_status: string;
  verification_notes: string;
  password: string;
}

const API_BASE_URL = 'https://rtcblissdrive.onrender.com/api/team';

export const useTeamMembers = () => {
  const { token } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = useCallback(async (page = 1, offset = 100) => {
    if (!token) {
      setError('Authentication token not found');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/?page=${page}&offset=${offset}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.data || []);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team members';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createTeamMember = useCallback(async (formData: TeamMemberFormData): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchTeamMembers(); // Refresh the list
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create team member';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTeamMembers, token]);

  const updateTeamMember = useCallback(async (id: string, formData: TeamMemberFormData): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchTeamMembers(); // Refresh the list
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update team member';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTeamMembers, token]);

  const deleteTeamMember = useCallback(async (id: string): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (response.ok) {
        await fetchTeamMembers(); // Refresh the list
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete team member';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTeamMembers, token]);

  const bulkDeleteTeamMembers = useCallback(async (userIds: string[]): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
      return false;
    }

    if (userIds.length === 0) {
      setError('No team members selected for deletion');
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/bulk_delete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_ids=${userIds.join(',')}`
      });
      
      if (response.ok) {
        await fetchTeamMembers(); // Refresh the list
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete team members';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTeamMembers, token]);

  const importTeamMembers = useCallback(async (file: File): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });
      
      if (response.ok) {
        await fetchTeamMembers(); // Refresh the list
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to import team members';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTeamMembers, token]);

  const exportTeamMembers = useCallback(async (
    format: 'csv' | 'excel' | 'pdf', 
    userIds?: string[], 
    filters?: string
  ): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const body = new URLSearchParams();
      body.append('export_format', format);
      if (userIds && userIds.length > 0) {
        body.append('user_ids', userIds.join(','));
      }
      if (filters) {
        body.append('filters', filters);
      }
      
      const response = await fetch(`${API_BASE_URL}/export`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `team-members.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export team members';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    teamMembers,
    loading,
    error,
    fetchTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    bulkDeleteTeamMembers,
    importTeamMembers,
    exportTeamMembers,
    clearError
  };
};
