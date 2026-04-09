"use client"

import { useState } from "react"
import { Input } from "@heroui/input"
import { Form } from "@heroui/form"
import { Button } from "@heroui/button"
import { Select, SelectItem, SelectSection } from "@heroui/react"
import { addToast } from "@heroui/toast"
import { supabase } from "@/lib/supabase"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    phone?: string
    role?: string
  }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[+]?[0-9]{7,16}$/
    const cleanPhone = phone.trim().replace(/[\s\-().]/g, "")

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (phone && !phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!role) {
      newErrors.role = "Please select a role"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Add this function to clear email error when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    // Clear the email error when user starts typing a new email
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isPending) return
    
    // Reset any existing errors before validation
    setErrors({})
    
    setIsPending(true)

    if (!validateForm()) {
      addToast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
      })
      setIsPending(false)
      return
    }

    try {
      const cleanPhone = phone ? phone.trim().replace(/[\s\-().]/g, "") : null

      const { error } = await supabase
        .from("waitlist")
        .insert([{
          email: email.toLowerCase().trim(),
          phone: cleanPhone,
          role: role.toLowerCase(),
        }])

      if (error) {
        if (error.code === "23505") {
          setErrors({ email: "Email already exists" })
          addToast({
            title: "Already Registered",
            description: "This email is already on our waitlist!",
          })
          setIsPending(false) // Make sure to set isPending to false here
          return
        } else {
          throw error
        }
      } else {
        // Only show success and reset form if no error
        addToast({
          title: "Success!",
          description: "You've been added to the waitlist.",
        })

        setEmail("")
        setPhone("")
        setRole("")
        setErrors({})
        setIsPending(false)
      }
    } catch (err) {
      console.error("Submission error:", err)
      addToast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
      setIsPending(false)
    }
  }

  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit} className="w-full transition duration-300 ease-in-out dark:text-white">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          radius="full"
          variant="bordered"
          color={errors.email ? "danger" : "default"}
          errorMessage={errors.email}
          isInvalid={!!errors.email}
          value={email}
          onChange={handleEmailChange}
          required
        />

        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
          radius="full"
          variant="bordered"
          color={errors.phone ? "danger" : "default"}
          errorMessage={errors.phone}
          isInvalid={!!errors.phone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Select
          name="role"
          label="Select your role"
          isRequired
          selectedKeys={role ? [role] : []}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0] as string;
            setRole(key || "");
            // Clear role error when user selects
            if (errors.role) {
              setErrors(prev => ({ ...prev, role: undefined }))
            }
          }}
          radius="full"
          variant="bordered"
          color={errors.role ? "danger" : "default"}
          errorMessage={errors.role}
          isInvalid={!!errors.role}
        >
          <SelectSection>
            <SelectItem key="provider" value="provider">
              Provider – Sell clothing & connect with buyers
            </SelectItem>
            <SelectItem key="explorer" value="explorer">
              Explorer – Discover unique clothing from sellers
            </SelectItem>
          </SelectSection>
        </Select>

        <Button
          type="submit"
          radius="full"
          className="bg-white w-fit mx-auto text-black"
          isLoading={isPending}
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Join Waitlist"}
        </Button>
      </Form>
    </div>
  )
}