"use client"

import { useActionState } from "react"
import { joinWaitlist, type FormState } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/phone-input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WaitlistForm() {
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const initialState: FormState = { success: false, message: "" }
  const [state, formAction, isPending] = useActionState(joinWaitlist, initialState)

  return (
    <form action={formAction} className="space-y-4 flex item-center flex-col">
      <Input
        type="email"
        name="email"
        placeholder="Enter email"
        className={`w-full px-6 py-4 bg-black/30 border ${
          state.errors?.email ? "border-red-400/50" : "border-white/20"
        } rounded-2xl text-white placeholder:text-white/50 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20`}
        required
      />
      {state.errors?.email && <p className="text-red-400 text-sm mt-1 ml-2">{state.errors.email}</p>}

      <PhoneInput
        value={phone}
        onChange={setPhone}
        error={state.errors?.phone}
        className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
      />
      <input type="hidden" name="phone" value={phone} />

      <Select name="role" required onValueChange={setRole}>
        <SelectTrigger className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20">
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent className="border border-white/20 backdrop-blur bg-black/30 rounded-2xl text-white">
          <SelectItem value="provider" className="">
            Provider (for sellers) - Sell clothing and connect with buyers
          </SelectItem>
          <SelectItem value="explorer" className="">
            Explorer (for buyers) - Discover unique clothing from sellers
          </SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className=" bg-white w-fit mx-auto rounded-full text-black" disabled={isPending}>
        {isPending ? "Joining..." : "Join Waitlist"}
      </Button>

      {state.message && (
        <div className="text-sm text-center mt-2 text-white">
          {state.message}
        </div>
      )}
    </form>
  )
}