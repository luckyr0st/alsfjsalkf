// Supabase Edge Function: send-booking-email
// Разместите в: supabase/functions/send-booking-email/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  destination_id: string
  destination_name: string
  travel_date: string
  travelers: number
  preparation: boolean
  insurance: boolean
  photo_session: boolean
  total_price: number
  status: string
  created_at: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { booking }: { booking: Booking } = await req.json()

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Формируем HTML письмо
    const extras = []
    if (booking.preparation) extras.push('🎓 Подготовка космонавтов')
    if (booking.insurance) extras.push('🛡️ Расширенная страховка')
    if (booking.photo_session) extras.push('📸 Фотосессия в космосе')

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #7c3aed; }
            .price { font-size: 24px; font-weight: bold; color: #7c3aed; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 COSMOTOUR 2077</h1>
              <p>Подтверждение бронирования</p>
            </div>
            <div class="content">
              <h2>Здравствуйте, ${booking.name}!</h2>
              <p>Спасибо за бронирование космического путешествия. Ваша заявка принята и будет обработана в течение 24 часов.</p>
              
              <div class="info-box">
                <h3>📋 Детали бронирования</h3>
                <p><strong>Номер заказа:</strong> ${booking.id}</p>
                <p><strong>Направление:</strong> ${booking.destination_name}</p>
                <p><strong>Дата вылета:</strong> ${new Date(booking.travel_date).toLocaleDateString('ru-RU')}</p>
                <p><strong>Путешественников:</strong> ${booking.travelers}</p>
                ${extras.length > 0 ? `<p><strong>Доп. услуги:</strong> ${extras.join(', ')}</p>` : ''}
                <p class="price">Итого: ${booking.total_price.toLocaleString('ru-RU')} ₢</p>
              </div>

              <div class="info-box">
                <h3>📞 Контакты</h3>
                <p>Email: ${booking.email}</p>
                <p>Телефон: ${booking.phone}</p>
              </div>

              <p>Наш менеджер свяжется с вами в ближайшее время для подтверждения бронирования и оплаты.</p>
              
              <p>С наилучшими пожеланиями,<br>Команда COSMOTOUR 2077 🌌</p>
            </div>
            <div class="footer">
              <p>© 2077 Cosmotour Inc. Все права защищены во всех известных измерениях.</p>
              <p>Космопорт «Восток-1», Земля</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Отправляем email через Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'COSMOTOUR 2077 <booking@cosmotour2077.com>',
        to: [booking.email],
        subject: `🚀 Подтверждение бронирования #${booking.id.slice(0, 8)}`,
        html: html,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend API error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await res.json()
    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
