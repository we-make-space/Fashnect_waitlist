"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner" // or from 'react-hot-toast'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

export function PhoneInput({ value, onChange, error, className }: PhoneInputProps) {
  const [focused, setFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value
    onChange(phone)

    // Example: toast when invalid length
    if (phone.length > 0 && phone.length < 10) {
      toast.error("Phone number seems too short")
    }
  }

  return (
    <div className="relative">
      <Input
        type="tel"
        placeholder={focused ? "000-000-0000" : "Phone number"}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${className} ${error ? "border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20" : ""}`}
        maxLength={14}
        required
      />
      {error && <p className="text-red-400 text-sm mt-1 ml-2">{error}</p>}
    </div>
  )
}
