'use client'

import { useState, FormEvent } from 'react'

type FormState = {
  name: string
  phone: string
  status: 'attending' | 'not_attending'
  guest_count: number
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    status: 'attending',
    guest_count: 0,
  })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrorMessage(json.error || 'Something went wrong.')
        setSubmitState('error')
        return
      }

      setSubmitState('success')
    } catch {
      setErrorMessage('Network error. Please try again.')
      setSubmitState('error')
    }
  }

  if (submitState === 'success') {
    return (
      <div className="text-center py-12 px-8">
        <div className="text-6xl mb-4">&#128141;</div>
        <h2 className="text-3xl font-serif text-rose-800 mb-3">Thank You!</h2>
        <p className="text-stone-600 text-lg">
          Your RSVP has been received. We can&apos;t wait to celebrate with you!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Jane Smith"
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800
                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400
                     placeholder:text-stone-400 transition bg-white"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+1 555 000 0000"
          className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800
                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400
                     placeholder:text-stone-400 transition bg-white"
        />
      </div>

      {/* RSVP Status */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Will you be attending? <span className="text-rose-500">*</span>
        </label>
        <div className="flex gap-4">
          {(['attending', 'not_attending'] as const).map((s) => (
            <label
              key={s}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 cursor-pointer
                          transition font-medium text-sm
                          ${form.status === s
                            ? 'border-rose-400 bg-rose-50 text-rose-800'
                            : 'border-stone-200 text-stone-600 hover:border-rose-200'
                          }`}
            >
              <input
                type="radio"
                name="status"
                value={s}
                checked={form.status === s}
                onChange={() => setForm({ ...form, status: s })}
                className="sr-only"
              />
              {s === 'attending' ? 'Joyfully Attending' : 'Regretfully Declining'}
            </label>
          ))}
        </div>
      </div>

      {/* Guest Count */}
      {form.status === 'attending' && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Number of Additional Guests
          </label>
          <input
            type="number"
            min={0}
            max={10}
            value={form.guest_count}
            onChange={(e) => setForm({ ...form, guest_count: parseInt(e.target.value) || 0 })}
            className="w-32 border border-stone-300 rounded-lg px-4 py-2.5 text-stone-800
                       focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400
                       transition bg-white"
          />
          <p className="text-xs text-stone-400 mt-1">Not counting yourself</p>
        </div>
      )}

      {/* Error */}
      {submitState === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === 'loading'}
        className="w-full bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300
                   text-white font-semibold py-3 rounded-lg transition text-sm tracking-wide
                   focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 cursor-pointer"
      >
        {submitState === 'loading' ? 'Sending RSVP...' : 'Send My RSVP'}
      </button>
    </form>
  )
}
