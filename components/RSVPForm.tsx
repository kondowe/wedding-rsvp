'use client'

import { useState, FormEvent } from 'react'

type FormState = {
  name: string
  phone: string
  partner_name: string
  status: 'attending' | 'not_attending'
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    partner_name: '',
    status: 'attending',
  })
  const [plusOne, setPlusOne] = useState(false)
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
        <h2 className="text-3xl font-serif mb-3" style={{ color: '#fdfaf2' }}>Thank You!</h2>
        <p className="text-lg" style={{ color: '#d6cfa0' }}>
          Your RSVP has been received. We can&apos;t wait to celebrate with you!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8">
      {/* Your Name */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#eae5d0' }}>
          Your Name <span style={{ color: '#d6cfa0' }}>*</span>
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Jane Smith"
          className="w-full rounded-lg px-4 py-2.5 text-stone-800 transition bg-white
                     placeholder:text-stone-400 focus:outline-none"
          style={{
            border: '1px solid #c8c4a8',
            boxShadow: '0 0 0 0px #8a7d55',
          }}
          onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #b5a96a')}
          onBlur={(e) => (e.target.style.boxShadow = '0 0 0 0px #b5a96a')}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#eae5d0' }}>
          Phone Number <span style={{ color: '#d6cfa0' }}>*</span>
        </label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+1 555 000 0000"
          className="w-full rounded-lg px-4 py-2.5 text-stone-800 transition bg-white
                     placeholder:text-stone-400 focus:outline-none"
          style={{ border: '1px solid #c8c4a8' }}
          onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #b5a96a')}
          onBlur={(e) => (e.target.style.boxShadow = '0 0 0 0px #b5a96a')}
        />
      </div>

      {/* RSVP Status */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#eae5d0' }}>
          Will you be attending? <span style={{ color: '#d6cfa0' }}>*</span>
        </label>
        <div className="flex gap-4">
          {(['attending', 'not_attending'] as const).map((s) => (
            <label
              key={s}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 cursor-pointer
                         transition font-medium text-sm"
              style={{
                borderColor: form.status === s ? '#c4bc96' : 'rgba(255,255,255,0.3)',
                backgroundColor: form.status === s ? 'rgba(240,237,223,0.85)' : 'rgba(255,255,255,0.08)',
                color: form.status === s ? '#3b3d2e' : '#eae5d0',
              }}
            >
              <input
                type="radio"
                name="status"
                value={s}
                checked={form.status === s}
                onChange={() => {
                  setForm({ ...form, status: s, partner_name: '' })
                  setPlusOne(false)
                }}
                className="sr-only"
              />
              {s === 'attending' ? 'Joyfully Attending' : 'Regretfully Declining'}
            </label>
          ))}
        </div>
      </div>

      {/* +1 toggle — only when attending */}
      {form.status === 'attending' && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#eae5d0' }}>
            Bringing a partner?
          </label>
          <div className="flex gap-3">
            {([true, false] as const).map((val) => (
              <label
                key={String(val)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 cursor-pointer transition font-medium text-sm"
                style={{
                  borderColor: plusOne === val ? '#c4bc96' : 'rgba(255,255,255,0.3)',
                  backgroundColor: plusOne === val ? 'rgba(240,237,223,0.85)' : 'rgba(255,255,255,0.08)',
                  color: plusOne === val ? '#3b3d2e' : '#eae5d0',
                }}
              >
                <input
                  type="radio"
                  name="plusOne"
                  checked={plusOne === val}
                  onChange={() => {
                    setPlusOne(val)
                    if (!val) setForm({ ...form, partner_name: '' })
                  }}
                  className="sr-only"
                />
                {val ? '+1 Partner' : 'Just Me'}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Partner Name — only when +1 selected */}
      {form.status === 'attending' && plusOne && (
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#eae5d0' }}>
            Partner&apos;s Name <span style={{ color: '#d6cfa0' }}>*</span>
          </label>
          <input
            type="text"
            required
            value={form.partner_name}
            onChange={(e) => setForm({ ...form, partner_name: e.target.value })}
            placeholder="John Smith"
            className="w-full rounded-lg px-4 py-2.5 text-stone-800 transition bg-white
                       placeholder:text-stone-400 focus:outline-none"
            style={{ border: '1px solid #c8c4a8' }}
            onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #b5a96a')}
            onBlur={(e) => (e.target.style.boxShadow = '0 0 0 0px #b5a96a')}
          />
        </div>
      )}

      {/* Error */}
      {submitState === 'error' && (
        <div className="text-sm px-4 py-3 rounded-lg" style={{ background: '#fdf3f3', border: '1px solid #f5c6c6', color: '#b91c1c' }}>
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === 'loading'}
        className="w-full text-white font-semibold py-3 rounded-lg transition text-sm tracking-wide
                   focus:outline-none cursor-pointer"
        style={{ backgroundColor: submitState === 'loading' ? '#a8af8e' : '#6b7355' }}
        onMouseEnter={(e) => { if (submitState !== 'loading') (e.target as HTMLButtonElement).style.backgroundColor = '#4a5240' }}
        onMouseLeave={(e) => { if (submitState !== 'loading') (e.target as HTMLButtonElement).style.backgroundColor = '#6b7355' }}
      >
        {submitState === 'loading' ? 'Sending RSVP...' : 'Send My RSVP'}
      </button>
    </form>
  )
}
