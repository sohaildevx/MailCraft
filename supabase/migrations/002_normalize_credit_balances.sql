-- Migration: Normalize credit balances after disabling usage limits
-- Run this in your Supabase SQL Editor
--
-- Usage quotas are currently disabled in app/api/generate-email/route.ts
-- (USAGE_LIMITS_ENABLED = false), so balances are no longer decremented and
-- existing rows may sit at a partially-used or zero value. This tops every
-- account back up to its plan's full allotment and restarts the reset clock,
-- so quotas can be re-enabled later without locking anyone out.
--
-- Safe to run multiple times (idempotent): it only touches rows that are
-- not already at their plan's full allotment.

UPDATE public.profiles
SET credits = CASE subscription_tier
                WHEN 'pro'  THEN 100
                WHEN 'team' THEN 500
                ELSE 10
              END,
    credits_reset_at = now()
WHERE credits <> CASE subscription_tier
                   WHEN 'pro'  THEN 100
                   WHEN 'team' THEN 500
                   ELSE 10
                 END;
