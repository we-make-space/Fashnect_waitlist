  "use client"

import { useState } from "react"
import { Input } from "@heroui/input"
import { Form } from "@heroui/form"
import { Button } from "@heroui/button"
import { Select, SelectItem, SelectSection } from "@heroui/react"
import { addToast } from "@heroui/toast"
import { SuccessModal, type SuccessModalRole } from "@/components/SuccessModal"
import { WaitlistThankYou } from "@/components/WaitlistThankYou"

function mapFormRoleToApi(formRole: string): SuccessModalRole | null {
  if (formRole === "provider") return "seller"
  if (formRole === "explorer") return "buyer"
  return null
}

function deriveNameFromEmail(emailValue: string): string {
  const local = emailValue.split("@")[0] ?? ""
  return local.replace(/[._-]+/g, " ").trim()
}

export interface WaitlistFormProps {
  /** Fires when the user reaches the thank-you state (modal dismissed or WhatsApp CTA). */
  onThankYouView?: () => void
}

export function WaitlistForm({ onThankYouView }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [successRole, setSuccessRole] = useState<SuccessModalRole>("buyer")
  const [successJoinUrl, setSuccessJoinUrl] = useState("")
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

    const apiRole = mapFormRoleToApi(role)
    if (!apiRole) {
      setErrors({ role: "Please select a role" })
      addToast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
      })
      setIsPending(false)
      return
    }

    try {
      const name = deriveNameFromEmail(email.toLowerCase().trim())
      const payload = {
        name,
        email: email.toLowerCase().trim(),
        phone: phone.trim() || undefined,
        role: apiRole,
      }

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        message?: string
        joinUrl?: string
        role?: SuccessModalRole
      }

      const failMessage =
        data.message ||
        (typeof data.error === "string" ? data.error.replace(/_/g, " ") : "") ||
        "Something went wrong. Please try again."

      if (res.status === 409 || data.error === "duplicate") {
        setErrors({ email: "Email already exists" })
        addToast({
          title: "Already Registered",
          description: "This email is already on our waitlist!",
        })
        return
      }

      if (res.ok || res.status === 502) {
        const joinUrl = typeof data.joinUrl === "string" ? data.joinUrl : ""
        const returnedRole = data.role === "seller" || data.role === "buyer" ? data.role : apiRole

        if (joinUrl) {
          setSuccessRole(returnedRole)
          setSuccessJoinUrl(joinUrl)
          setShowSuccessModal(true)
        }

        if (res.status === 502) {
          addToast({
            title: "Almost there",
            description:
              data.message ||
              "You are on the list, but the welcome email could not be sent. Check your inbox later or use the community link.",
          })
        }

        setEmail("")
        setPhone("")
        setRole("")
        setErrors({})
        return
      }

      addToast({
        title: "Error",
        description: failMessage,
      })
    } catch (err) {
      console.error("Submission error:", err)
      addToast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
      setIsPending(false)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    setShowThankYou(true)
    onThankYouView?.()
  }

  return (
    <div className="w-full">
      {showThankYou && successJoinUrl ? (
        <WaitlistThankYou role={successRole} joinUrl={successJoinUrl} />
      ) : (
        <Form
          validationBehavior="aria"
          onSubmit={handleSubmit}
          autoComplete="on"
          className="w-full min-w-0 flex flex-col gap-4 transition duration-300 ease-in-out dark:text-white"
        >
          <Input
            id="waitlist-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
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
            id="waitlist-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
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
            placeholder="How will you use Fashnect?"
            isRequired
            selectedKeys={role ? [role] : []}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string
              setRole(key || "")
            }}
            radius="full"
            variant="bordered"
            color={errors.role ? "danger" : "default"}
            errorMessage={errors.role}
            isInvalid={!!errors.role}
          >
            <SelectSection>
              <SelectItem key="provider">
                Sell on Fashnect · Grow sales. Build your name.
              </SelectItem>
              <SelectItem key="explorer">
                Shop on Fashnect · Browse sellers. Buy direct.
              </SelectItem>
            </SelectSection>
          </Select>

          <Button
            type="submit"
            radius="full"
            className="bg-white w-full sm:w-fit mx-auto min-h-12 text-black touch-manipulation"
            isLoading={isPending}
            disabled={isPending}
          >
            {isPending ? "Just a second…" : "Join Waitlist"}
          </Button>
        </Form>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        role={successRole}
        joinUrl={successJoinUrl}
      />
    </div>
  )
}
