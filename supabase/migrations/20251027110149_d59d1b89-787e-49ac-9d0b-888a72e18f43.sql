-- Update handle_new_user function to create user_roles entry
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles (without role/is_admin)
  INSERT INTO public.profiles (id, full_name, role, is_admin)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(new.raw_user_meta_data->>'role', 'client'),
    false
  );
  
  -- Insert role into user_roles table (secure storage)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    new.id,
    COALESCE((new.raw_user_meta_data->>'role')::app_role, 'client'::app_role)
  )
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN new;
END;
$$;