-- Fix profiles SELECT policy to allow viewing other users for messaging
-- Drop the restrictive policy
DROP POLICY IF EXISTS "Users can view own profile or admins view all" ON public.profiles;

-- Create new policy that allows authenticated users to view all profiles
-- This is necessary for messaging and user discovery features
CREATE POLICY "Users can view all profiles"
ON public.profiles
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Keep the existing UPDATE policies for security
-- (Users can only update their own profile unless they're admin)