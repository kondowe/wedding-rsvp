import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, phone, partner_name, status } = body

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Valid name is required.' }, { status: 400 })
  }
  if (!phone || typeof phone !== 'string' || !/^\+?[\d\s\-().]{7,20}$/.test(phone.trim())) {
    return NextResponse.json({ error: 'Valid phone number is required.' }, { status: 400 })
  }
  if (!['attending', 'not_attending'].includes(status)) {
    return NextResponse.json({ error: 'Invalid RSVP status.' }, { status: 400 })
  }
  const partnerName = typeof partner_name === 'string' ? partner_name.trim() : ''

  const supabase = getSupabaseAdmin()

  // Check for duplicate phone number
  const { data: existing } = await supabase
    .from('rsvps')
    .select('id')
    .eq('phone', phone.trim())
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'An RSVP with this phone number already exists.' },
      { status: 409 }
    )
  }

  const { error } = await supabase.from('rsvps').insert({
    name: name.trim(),
    phone: phone.trim(),
    partner_name: partnerName || null,
    status,
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
