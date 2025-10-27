-- Fix RLS policies for messaging functionality
-- This addresses the "new row violates row-level security policy" errors

-- ==========================================
-- CONVERSATIONS TABLE POLICIES
-- ==========================================

-- Already exists: "Users can create conversations" with true check
-- Let's verify and recreate it to ensure it works
DROP POLICY IF EXISTS "Users can create conversations" ON public.conversations;

-- Allow any authenticated user to create a conversation
CREATE POLICY "Authenticated users can create conversations"
ON public.conversations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Verify SELECT policy exists (already created earlier)
-- "Users can view conversations they participate in" - should already exist

-- Verify UPDATE policy exists
-- "Participants can update conversations" - should already exist


-- ==========================================
-- CONVERSATION_PARTICIPANTS TABLE POLICIES
-- ==========================================

-- The current INSERT policy only allows users to insert themselves
-- Let's also add a policy to allow creating participants when creating a conversation
DROP POLICY IF EXISTS "Users can insert themselves as participants" ON public.conversation_participants;

-- Allow users to insert themselves as participants
CREATE POLICY "Users can add themselves to conversations"
ON public.conversation_participants
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to add OTHER users when creating a new conversation
-- This is needed when the conversation creator adds the other participant
CREATE POLICY "Users can add others to new conversations"
ON public.conversation_participants
FOR INSERT
TO authenticated
WITH CHECK (
  -- User can add another participant if they are also a participant in this conversation
  EXISTS (
    SELECT 1 
    FROM public.conversation_participants cp 
    WHERE cp.conversation_id = conversation_participants.conversation_id 
    AND cp.user_id = auth.uid()
  )
  OR
  -- OR if this is a new conversation (no participants yet), allow adding anyone
  NOT EXISTS (
    SELECT 1 
    FROM public.conversation_participants cp 
    WHERE cp.conversation_id = conversation_participants.conversation_id
  )
);


-- ==========================================
-- MESSAGES TABLE POLICIES  
-- ==========================================

-- Verify INSERT policy exists (should already be working)
-- "Users can send messages to their conversations"

-- Verify SELECT policy exists
-- "Users can view messages in their conversations"

-- Note: Messages don't need UPDATE or DELETE policies for now