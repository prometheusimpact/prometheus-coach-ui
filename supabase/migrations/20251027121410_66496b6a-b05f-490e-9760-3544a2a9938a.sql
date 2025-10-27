-- Add policy to allow users to add OTHER users when creating conversations
-- This fixes the issue where conversation creators can't add the second participant

DROP POLICY IF EXISTS "Users can add others to new conversations" ON public.conversation_participants;

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