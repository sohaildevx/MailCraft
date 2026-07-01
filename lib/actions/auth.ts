"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

function getFriendlyError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "Invalid email or password. Please try again.";
  }
  if (message.includes("Email not confirmed")) {
    return "Please verify your email before signing in. Check your inbox.";
  }
  if (message.includes("User already registered")) {
    return "An account with this email already exists.";
  }
  if (message.includes("Password should be at least")) {
    return "Password must be at least 6 characters.";
  }
  if (message.includes("Unable to validate email address")) {
    return "Please enter a valid email address.";
  }
  if (message.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (message.includes("For security purposes")) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  return "Something went wrong. Please try again.";
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: getFriendlyError(error.message) };
  }

  if (data.user?.identities?.length === 0) {
    return { error: "An account with this email already exists." };
  }

  redirect("/sign-in?verified=false");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please fill in all fields." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: getFriendlyError(error.message) };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Please enter your email address." };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=...&type=recovery&redirect_to=${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return { error: getFriendlyError(error.message) };
  }

  return { success: "Check your email for a password reset link." };
}

export async function verifyOtp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const token = formData.get("token") as string;

  if (!email || !token) {
    return { error: "Please enter your email and verification code." };
  }

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });

  if (error) {
    return { error: getFriendlyError(error.message) };
  }

  redirect("/sign-in?verified=true");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
