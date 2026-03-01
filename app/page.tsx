import RSVPForm from '@/components/RSVPForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-stone-100 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-3 font-light">
            Together with their families
          </p>
          <h1 className="text-5xl font-serif text-stone-800 mb-2">
            Leonard &amp; Minky
          </h1>
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-16 bg-rose-200" />
            <span className="text-rose-300 text-lg">&#10047;</span>
            <div className="h-px w-16 bg-rose-200" />
          </div>
          <p className="text-stone-500 text-base">
            Friday, March 20th, 2026
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden">
          <div className="bg-rose-700 px-8 py-5 text-center">
            <h2 className="text-white text-xl font-serif tracking-wide">RSVP</h2>
            <p className="text-rose-200 text-sm mt-1">Kindly reply</p>
          </div>
          <RSVPForm />
        </div>

        {/* Footer */}

      </div>
    </main>
  )
}
