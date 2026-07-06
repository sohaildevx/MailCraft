-- Migration: Add credits_reset_at column and update default credits
-- Run this in your Supabase SQL Editor

-- Add credits_reset_at column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS credits_reset_at timestamptz not null default now();

-- Update default credits from 5 to 10 for free users
UPDATE public.profiles 
SET credits = 10 
WHERE credits = 5 AND subscription_tier = 'free';

-- Update subscription tier check to include 'team' instead of 'enterprise'
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_subscription_tier_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_subscription_tier_check 
CHECK (subscription_tier in ('free', 'pro', 'team'));
