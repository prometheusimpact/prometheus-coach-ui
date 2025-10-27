-- Fix infinite recursion in conversation_participants RLS policies
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can add themselves to conversations" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can update their own participant record" ON public.conversation_participants;

-- Create simplified non-recursive policies

-- 1. SELECT policy: Users can only view their own participant records
CREATE POLICY "Users can view their own participant records"
ON public.conversation_participants
FOR SELECT
USING (auth.uid() = user_id);

-- 2. INSERT policy: Users can only insert themselves as participants
CREATE POLICY "Users can insert themselves as participants"
ON public.conversation_participants
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE policy: Users can only update their own participant records
CREATE POLICY "Users can update their own participant records"
ON public.conversation_participants
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. DELETE policy: Users can remove themselves from conversations
CREATE POLICY "Users can delete their own participant records"
ON public.conversation_participants
FOR DELETE
USING (auth.uid() = user_id);