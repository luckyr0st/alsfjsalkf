// Тестовый скрипт для проверки подключения к Supabase
// Запустите в консоли браузера после загрузки страницы

import { supabase } from './lib/supabase'

export const testSupabaseConnection = async () => {
  console.log('🚀 Начинаем тестирование подключения к Supabase...\n')

  try {
    // Тест 1: Проверка подключения
    console.log('✅ Тест 1: Проверка подключения')
    const { data: testData, error: testError } = await supabase
      .from('destinations')
      .select('count', { count: 'exact', head: true })
    
    if (testError) {
      console.error('❌ Ошибка подключения:', testError)
      return false
    }
    console.log('✅ Подключение успешно!\n')

    // Тест 2: Загрузка всех направлений
    console.log('✅ Тест 2: Загрузка направлений')
    const { data: destinations, error: destError } = await supabase
      .from('destinations')
      .select('*')
      .order('price', { ascending: true })
    
    if (destError) {
      console.error('❌ Ошибка загрузки направлений:', destError)
      return false
    }
    console.log(`✅ Загружено ${destinations?.length || 0} направлений`)
    console.log('Пример:', destinations?.[0])
    console.log()

    // Тест 3: Загрузка по категориям
    console.log('✅ Тест 3: Загрузка по категориям')
    const categories = [...new Set(destinations?.map(d => d.category) || [])]
    console.log('Категории:', categories)
    console.log()

    // Тест 4: Проверка таблицы бронирований
    console.log('✅ Тест 4: Проверка таблицы бронирований')
    const { data: bookings, error: bookError } = await supabase
      .from('bookings')
      .select('count', { count: 'exact', head: true })
    
    if (bookError) {
      console.error('❌ Ошибка проверки таблицы бронирований:', bookError)
      return false
    }
    console.log(`✅ Таблица бронирований существует. Всего записей: ${bookings || 0}`)
    console.log()

    console.log('🎉 Все тесты пройдены успешно!')
    console.log('📊 Статистика:')
    console.log(`   - Направлений: ${destinations?.length || 0}`)
    console.log(`   - Категорий: ${categories.length}`)
    console.log(`   - Бронирований: ${bookings || 0}`)
    
    return true

  } catch (error) {
    console.error('❌ Критическая ошибка:', error)
    return false
  }
}

// Автоматический запуск при импорте
if (typeof window !== 'undefined') {
  (window as any).testSupabase = testSupabaseConnection
  console.log('💡 Для тестирования Supabase выполните в консоли: testSupabase()')
}
