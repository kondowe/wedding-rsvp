'use client'

import { useState } from 'react'
import AdminTable from '@/components/AdminTable'

type RSVP = {
  id: string
  created_at: string
  name: string
  phone: string
  partner_name: string | null
  status: 'attending' | 'not_attending'
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
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#eae5d0' }}>
        <div className="rounded-2xl shadow-lg p-10 w-full max-w-sm" style={{ backgroundColor: '#fdfaf2', border: '1px solid #ddd8be' }}>
          <h1 className="text-2xl font-serif text-center mb-2" style={{ color: '#3b3d2e' }}>
            Admin Access
          </h1>
          <p className="text-sm text-center mb-8" style={{ color: '#9e9a82' }}>
            Enter the admin password to view RSVPs
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none transition bg-white"
              style={{ border: '1px solid #c8c4a8' }}
            />
            {error && <p className="text-sm" style={{ color: '#b91c1c' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-2.5 rounded-lg transition text-sm cursor-pointer"
              style={{ backgroundColor: loading ? '#a8af8e' : '#6b7355' }}
            >
              {loading ? 'Checking...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 px-4" style={{ backgroundColor: '#eae5d0' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif" style={{ color: '#3b3d2e' }}>RSVP Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: '#7a7660' }}>Leonard &amp; Minky &middot; March 20th, 2026</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-sm px-4 py-2 rounded-lg transition disabled:opacity-50 cursor-pointer"
            style={{ color: '#4a5240', border: '1px solid #c4bc96' }}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <AdminTable rsvps={rsvps} />
      </div>
    </main>
  )
}
