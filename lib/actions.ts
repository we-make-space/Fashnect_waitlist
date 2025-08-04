"use server"

import { supabase } from "./supabase"

export interface FormState {
  success: boolean
  message: string
  errors?: {
    email?: string
    phone?: string
    role?: string
  }
}

export async function joinWaitlist(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const role = formData.get("role") as string

  // Validation
  const errors: { email?: string; phone?: string; role?: string } = {}

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    errors.email = "Email is required"
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address"
  }

  const phoneRegex = /^[+]?[0-9]{7,16}$/;
  const cleanPhone = phone.replace(/[\s\-().]/g, "");

  if (phone && !phoneRegex.test(cleanPhone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!role) {
    errors.role = "Please select a role";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors,
    }
  }

  try {
    const cleanPhone = phone ? phone.replace(/[\s\-$$$$]/g, "") : null

    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email: email.toLowerCase().trim(),
          phone: cleanPhone,
          role,
        },
      ])
      .select()

    if (error) {
      if (error.code === "23505") {
        return {
          success: false,
          message: "This email is already on our waitlist!",
          errors: { email: "Email already exists" },
        }
      }

      console.error("Database error:", error)
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      }
    }

    return {
      success: true,
      message: "Successfully joined the waitlist! We'll be in touch soon.",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}