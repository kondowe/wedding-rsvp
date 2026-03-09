'use client'

type RSVP = {
  id: string
  created_at: string
  name: string
  phone: string
  partner_name: string | null
  status: 'attending' | 'not_attending'
}

type Props = { rsvps: RSVP[] }

export default function AdminTable({ rsvps }: Props) {
  const attending = rsvps.filter((r) => r.status === 'attending')
  const notAttending = rsvps.filter((r) => r.status === 'not_attending')
  // Each couple counts as 2 (or 1 if no partner)
  const totalGuests = attending.reduce((sum, r) => sum + (r.partner_name ? 2 : 1), 0)

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Couples Attending', value: attending.length, color: '#4a7c59' },
          { label: 'Not Attending', value: notAttending.length, color: '#b91c1c' },
          { label: 'Total Guests', value: totalGuests, color: '#4a5240' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-5 text-center shadow-sm"
            style={{ backgroundColor: '#fdfaf2', border: '1px solid #ddd8be' }}
          >
            <p className="text-3xl font-serif font-bold" style={{ color }}>{value}</p>
            <p className="text-sm mt-1" style={{ color: '#7a7660' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden shadow-sm"
        style={{ border: '1px solid #ddd8be' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ backgroundColor: '#fdfaf2' }}>
            <thead style={{ backgroundColor: '#f0eddf', borderBottom: '1px solid #ddd8be' }}>
              <tr>
                {['Name', 'Partner', 'Phone', 'Status', 'RSVP Date'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs uppercase tracking-wider font-semibold"
                    style={{ color: '#6b6b5a' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r, i) => (
                <tr
                  key={r.id}
                  style={{
                    borderTop: i > 0 ? '1px solid #ede9d5' : undefined,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#f5f2e8')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent')}
                >
                  <td className="px-5 py-3 font-medium" style={{ color: '#3b3d2e' }}>{r.name}</td>
                  <td className="px-5 py-3" style={{ color: '#5c6348' }}>
                    {r.partner_name || <span style={{ color: '#b0aa8e' }}>—</span>}
                  </td>
                  <td className="px-5 py-3" style={{ color: '#6b6b5a' }}>{r.phone}</td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                      style={
                        r.status === 'attending'
                          ? { backgroundColor: '#e6f0e8', color: '#2d6a4f' }
                          : { backgroundColor: '#fde8e8', color: '#b91c1c' }
                      }
                    >
                      {r.status === 'attending' ? 'Attending' : 'Not Attending'}
                    </span>
                  </td>
                  <td className="px-5 py-3" style={{ color: '#b0aa8e' }}>
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
                  <td colSpan={5} className="px-5 py-10 text-center" style={{ color: '#b0aa8e' }}>
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
