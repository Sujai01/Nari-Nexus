<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check .env.local file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
=======
export interface VolunteerSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  interestArea: string;
  timestamp: string;
}

export interface NewsletterSubmission {
  id: string;
  email: string;
  timestamp: string;
}

// Simulated backend delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  await delay(800); // Simulate network latency

  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address format." };
  }

  try {
    // Get existing subscriptions
    const existingStr = typeof window !== "undefined" ? localStorage.getItem("nari_subscriptions") : null;
    const subscriptions: NewsletterSubmission[] = existingStr ? JSON.parse(existingStr) : [];

    // Check duplicate
    if (subscriptions.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return { success: true, message: "You are already subscribed to the NARI Nexus newsletter!" };
    }

    // Add new subscription
    const newSubscription: NewsletterSubmission = {
      id: Math.random().toString(36).substring(2, 9),
      email: email.trim(),
      timestamp: new Date().toISOString(),
    };

    subscriptions.push(newSubscription);
    if (typeof window !== "undefined") {
      localStorage.setItem("nari_subscriptions", JSON.stringify(subscriptions));
    }

    return {
      success: true,
      message: "Thank you for subscribing! A welcome email will be sent via nari.world.",
    };
  } catch (error) {
    console.error("Newsletter submission error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export async function submitVolunteerApplication(data: {
  name: string;
  email: string;
  phone: string;
  skills: string;
  interestArea: string;
}): Promise<{ success: boolean; message: string }> {
  await delay(1200); // Simulate network latency

  if (!data.name || !data.email || !data.phone || !data.interestArea) {
    return { success: false, message: "Please fill in all the required fields." };
  }

  try {
    // Get existing submissions
    const existingStr = typeof window !== "undefined" ? localStorage.getItem("nari_volunteer_applications") : null;
    const applications: VolunteerSubmission[] = existingStr ? JSON.parse(existingStr) : [];

    // Add new application
    const newApplication: VolunteerSubmission = {
      id: "VOL-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      skills: data.skills.trim(),
      interestArea: data.interestArea,
      timestamp: new Date().toISOString(),
    };

    applications.push(newApplication);
    if (typeof window !== "undefined") {
      localStorage.setItem("nari_volunteer_applications", JSON.stringify(applications));
    }

    return {
      success: true,
      message: `Application submitted successfully! Your tracking ID is ${newApplication.id}. Our HR team will reach out to you within 3 business days from recruitment@nari.world.`,
    };
  } catch (error) {
    console.error("Volunteer application error:", error);
    return { success: false, message: "We encountered an issue submitting your application. Please try again." };
  }
}

// Function to fetch submissions for debugging/dashboard purposes
export function getNewsletterSubscribers(): NewsletterSubmission[] {
  if (typeof window === "undefined") return [];
  const existingStr = localStorage.getItem("nari_subscriptions");
  return existingStr ? JSON.parse(existingStr) : [];
}

export function getVolunteerApplications(): VolunteerSubmission[] {
  if (typeof window === "undefined") return [];
  const existingStr = localStorage.getItem("nari_volunteer_applications");
  return existingStr ? JSON.parse(existingStr) : [];
}
>>>>>>> b532d6d0899c38f64735f58c253bd8c68d35452d
