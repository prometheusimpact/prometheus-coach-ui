import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AvailableUser {
  id: string;
  full_name: string;
  roles: string[];
}

export const useAvailableUsers = () => {
  const { user, profile } = useAuth();
  const [users, setUsers] = useState<AvailableUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || !profile) return;

      try {
        // Determine which roles to fetch based on current user's role
        let targetRoles: string[] = [];
        
        if (profile.roles.includes('client')) {
          // Clients can message coaches and admins
          targetRoles = ['coach', 'admin'];
        } else if (profile.roles.includes('coach')) {
          // Coaches can message clients and admins
          targetRoles = ['client', 'admin'];
        } else if (profile.roles.includes('admin')) {
          // Admins can message everyone
          targetRoles = ['client', 'coach', 'admin'];
        }

        // Get all profiles except current user
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .neq('id', user.id);

        if (profilesError) throw profilesError;

        if (!profiles || profiles.length === 0) {
          setUsers([]);
          setLoading(false);
          return;
        }

        // Get roles for each profile
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('user_id, role')
          .in('user_id', profiles.map(p => p.id));

        if (rolesError) throw rolesError;

        // Combine profiles with their roles and filter by target roles
        const usersWithRoles = profiles.map(profile => {
          const roles = userRoles
            ?.filter(ur => ur.user_id === profile.id)
            .map(ur => ur.role) || [];
          
          return {
            id: profile.id,
            full_name: profile.full_name,
            roles,
          };
        });

        // Filter users who have at least one of the target roles
        const filteredUsers = usersWithRoles.filter(u => 
          u.roles.some(role => targetRoles.includes(role))
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching available users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, profile]);

  return { users, loading };
};
