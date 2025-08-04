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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isPending) return
    setIsPending(true)

    if (!validateForm()) {
      addToast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
      // Add variant if required
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
          role: role.toLowerCase(), // Removed .value since role is just a string
        }])

      if (error) {
        if (error.code === "23505") {
          setErrors({ email: "Email already exists" })
          addToast({
            title: "Already Registered",
            description: "This email is already on our waitlist!",
         
          })
        } else {
          throw error
        }
        return
      }

      addToast({
        title: "Success!",
        description: "You've been added to the waitlist.",

      })

      setEmail("")
      setPhone("")
      setRole("")
      setErrors({})
    } catch (err) {
      console.error("Submission error:", err)
      addToast({
        title: "Error",
        description: "Something went wrong. Please try again.",
     
      })
    } finally {
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
          onChange={(e) => setEmail(e.target.value)}
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