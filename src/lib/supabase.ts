import { createClient } from '@supabase/supabase-js'

// Замените на ваши реальные credentials из Supabase Dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы данных
export interface Destination {
  id: string
  name: string
  emoji: string
  duration: string
  price: number
  description: string
  image_url: string
  gradient: string
  category: string
  available: boolean
  created_at: string
}

export interface Booking {
  id?: string
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
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
}

// Функции для работы с БД
export const destinationsApi = {
  // Получить все направления
  getAll: async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('price', { ascending: true })
    
    if (error) {
      console.error('Error fetching destinations:', error)
      return null
    }
    return data as Destination[]
  },

  // Получить одно направление по ID
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching destination:', error)
      return null
    }
    return data as Destination
  },

  // Получить доступные направления
  getAvailable: async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('available', true)
      .order('price', { ascending: true })
    
    if (error) {
      console.error('Error fetching available destinations:', error)
      return null
    }
    return data as Destination[]
  }
}

export const bookingsApi = {
  // Создать новое бронирование
  create: async (booking: Omit<Booking, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating booking:', error)
      return null
    }
    return data as Booking
  },

  // Получить все бронирования
  getAll: async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching bookings:', error)
      return null
    }
    return data as Booking[]
  },

  // Получить бронирование по email
  getByEmail: async (email: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching bookings by email:', error)
      return null
    }
    return data as Booking[]
  }
}

// Email рассылка через Supabase Edge Function
export const sendBookingEmail = async (booking: Booking) => {
  try {
    const { error } = await supabase.functions.invoke('send-booking-email', {
      body: { booking }
    })
    
    if (error) {
      console.error('Error sending email:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Email sending failed:', err)
    return false
  }
}
