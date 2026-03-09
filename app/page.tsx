import RSVPForm from '@/components/RSVPForm'

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center py-16 px-4 relative"
      style={{
        backgroundImage: 'url("/WhatsApp Image 2026-03-05 at 14.56.42.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay so card stays readable */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(30, 28, 20, 0.52)' }} />
      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] uppercase mb-3 font-light" style={{ color: '#d6cfa0' }}>
            Together with their families
          </p>
          <h1 className="text-5xl font-serif mb-2" style={{ color: '#fdfaf2' }}>
            Leonard &amp; Minky
          </h1>
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-16" style={{ backgroundColor: '#c4bc96' }} />
            <span className="text-lg" style={{ color: '#d6cfa0' }}>&#10047;</span>
            <div className="h-px w-16" style={{ backgroundColor: '#c4bc96' }} />
          </div>
          <p className="text-base" style={{ color: '#cec8a8' }}>
            Friday, March 20th, 2026
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(253, 250, 242, 0.18)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
        >
          <div
            className="px-8 py-5 text-center"
            style={{
              backgroundColor: 'rgba(107, 115, 85, 0.55)',
              borderBottom: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <h2 className="text-xl font-serif tracking-wide" style={{ color: '#fdfaf2' }}>RSVP</h2>
            <p className="text-sm mt-1" style={{ color: '#c8cdb4' }}>Kindly reply by couples</p>
          </div>
          <RSVPForm />
        </div>
      </div>
    </main>
  )
}
