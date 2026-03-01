'use client'

import { useState } from 'react'
import AdminTable from '@/components/AdminTable'

type RSVP = {
  id: string
  created_at: string
  name: string
  phone: string
  status: 'attending' | 'not_attending'
  guest_count: number
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [rsvps, setRsvps] = useState<RSVP[] | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/rsvps', {
      headers: { Authorization: `Bearer ${password}` },
    })

    if (!res.ok) {
      setError('Incorrect password.')
      setLoading(false)
      return
    }

    const json = await res.json()
    setRsvps(json.data)
    setLoading(false)
  }

  async function handleRefresh() {
    setLoading(true)
    const res = await fetch('/api/admin/rsvps', {
      headers: { Authorization: `Bearer ${password}` },
    })
    if (res.ok) {
      const json = await res.json()
      setRsvps(json.data)
    }
    setLoading(false)
  }

  if (rsvps === null) {
    return (
      <main className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-10 w-full max-w-sm">
          <h1 className="text-2xl font-serif text-stone-800 text-center mb-2">
            Admin Access
          </h1>
          <p className="text-stone-400 text-sm text-center mb-8">
            Enter the admin password to view RSVPs
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800
                         focus:outline-none focus:ring-2 focus:ring-rose-300 transition bg-white"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300
                         text-white font-semibold py-2.5 rounded-lg transition text-sm cursor-pointer"
            >
              {loading ? 'Checking...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-stone-800">RSVP Dashboard</h1>
            <p className="text-stone-500 text-sm mt-1">Emma &amp; James &middot; June 14th, 2026</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-sm text-rose-700 hover:text-rose-900 border border-rose-200 hover:border-rose-400
                       px-4 py-2 rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <AdminTable rsvps={rsvps} />
      </div>
    </main>
  )
}
