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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('🔍 [useAvailableUsers] Starting fetch...');
      console.log('🔍 [useAvailableUsers] Current user:', user?.id);
      console.log('🔍 [useAvailableUsers] Current profile:', profile);
      
      // In DEV_MODE without auth, show all users
      if (!user || !profile) {
        console.log('⚠️ [useAvailableUsers] No user or profile - fetching ALL users for DEV_MODE');
        
        // Set timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          setLoading(false);
          setError('Request timed out. Please try again.');
        }, 3000);

        try {
          // Get ALL profiles when no user (DEV_MODE)
          const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name');

          if (profilesError) throw profilesError;

          console.log('✅ [useAvailableUsers] Fetched profiles (no auth):', profiles?.length);

          if (!profiles || profiles.length === 0) {
            console.log('⚠️ [useAvailableUsers] No profiles found in database');
            setUsers([]);
            setError(null);
            clearTimeout(timeoutId);
            setLoading(false);
            return;
          }

          // Get roles for each profile
          const { data: userRoles, error: rolesError } = await supabase
            .from('user_roles')
            .select('user_id, role')
            .in('user_id', profiles.map(p => p.id));

          if (rolesError) throw rolesError;

          console.log('✅ [useAvailableUsers] Fetched user roles:', userRoles?.length);

          // Combine profiles with their roles
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

          console.log('✅ [useAvailableUsers] Users with roles:', usersWithRoles);
          setUsers(usersWithRoles);
          setError(null);
          clearTimeout(timeoutId);
          setLoading(false);
          return;
        } catch (error) {
          console.error('❌ [useAvailableUsers] Error in DEV_MODE:', error);
          setError('Failed to load users');
          setLoading(false);
          return;
        }
      }

      // Set timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        setLoading(false);
        setError('Request timed out. Please try again.');
      }, 3000);

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

        console.log('🔍 [useAvailableUsers] Target roles:', targetRoles);

        // Get all profiles except current user
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .neq('id', user.id);

        if (profilesError) throw profilesError;

        console.log('✅ [useAvailableUsers] Fetched profiles:', profiles?.length);

        if (!profiles || profiles.length === 0) {
          console.log('⚠️ [useAvailableUsers] No other profiles found in database');
          setUsers([]);
          setError(null);
          clearTimeout(timeoutId);
          setLoading(false);
          return;
        }

        // Get roles for each profile
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('user_id, role')
          .in('user_id', profiles.map(p => p.id));

        if (rolesError) throw rolesError;

        console.log('✅ [useAvailableUsers] Fetched user roles:', userRoles?.length);

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

        console.log('🔍 [useAvailableUsers] All users with roles:', usersWithRoles);

        // Filter users who have at least one of the target roles
        const filteredUsers = usersWithRoles.filter(u => 
          u.roles.some(role => targetRoles.includes(role))
        );

        console.log('✅ [useAvailableUsers] Filtered users:', filteredUsers.length, filteredUsers);
        setUsers(filteredUsers);
        setError(null);
      } catch (error) {
        console.error('Error fetching available users:', error);
        setError('Failed to load users');
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, profile]);

  return { users, loading, error };
};
