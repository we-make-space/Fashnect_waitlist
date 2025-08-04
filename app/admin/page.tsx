"use client"

import { useEffect, useState } from "react"
import { supabase, type WaitlistEntry } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setEntries(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch entries")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Waitlist Entries</h1>

        <div className="grid gap-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">{entry.email}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white/70 space-y-2">
                  {entry.phone && (
                    <p>
                      <strong>Phone:</strong> {entry.phone}
                    </p>
                  )}
                  <p>
                    <strong>Joined:</strong> {new Date(entry.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {entries.length === 0 && <div className="text-center text-white/70 mt-12">No waitlist entries yet.</div>}
      </div>
    </div>
  )
}
