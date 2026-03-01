'use client'

type RSVP = {
  id: string
  created_at: string
  name: string
  phone: string
  status: 'attending' | 'not_attending'
  guest_count: number
}

type Props = { rsvps: RSVP[] }

export default function AdminTable({ rsvps }: Props) {
  const attending = rsvps.filter((r) => r.status === 'attending')
  const notAttending = rsvps.filter((r) => r.status === 'not_attending')
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count + 1, 0)

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Attending', value: attending.length, color: 'text-emerald-700' },
          { label: 'Not Attending', value: notAttending.length, color: 'text-red-600' },
          { label: 'Total Guests', value: totalGuests, color: 'text-rose-700' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-stone-200 p-5 text-center shadow-sm"
          >
            <p className={`text-3xl font-serif font-bold ${color}`}>{value}</p>
            <p className="text-stone-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                {['Name', 'Phone', 'Status', 'Total Guests', 'RSVP Date'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-stone-600 font-semibold text-xs uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rsvps.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50 transition">
                  <td className="px-5 py-3 font-medium text-stone-800">{r.name}</td>
                  <td className="px-5 py-3 text-stone-600">{r.phone}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium
                        ${r.status === 'attending'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {r.status === 'attending' ? 'Attending' : 'Not Attending'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-stone-600">
                    {r.status === 'attending' ? r.guest_count + 1 : '—'}
                  </td>
                  <td className="px-5 py-3 text-stone-400">
                    {new Date(r.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
              {rsvps.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-stone-400">
                    No RSVPs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
