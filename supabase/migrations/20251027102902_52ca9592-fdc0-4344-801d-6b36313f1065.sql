-- Add role and is_admin columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'coach', 'admin')),
ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT false;

-- Drop existing RLS policies on profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create new RLS policies for profiles
-- Users can insert their own profile during signup (role defaults to 'client', is_admin defaults to false)
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  auth.uid() = id 
  AND role = 'client' 
  AND is_admin = false
);

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile fields EXCEPT role and is_admin
CREATE POLICY "Users can update own profile basic fields" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  AND is_admin = (SELECT is_admin FROM public.profiles WHERE id = auth.uid())
);

-- Admins can update any profile's role or is_admin fields
CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Update the handle_new_user function to set role on profiles instead of user_roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, is_admin)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(new.raw_user_meta_data->>'role', 'client'),
    false
  );
  
  RETURN new;
END;
$$;

-- Drop the user_roles table and related objects
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP TYPE IF EXISTS public.app_role CASCADE;