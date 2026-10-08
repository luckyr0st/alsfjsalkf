export interface DestinationData {
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
}

export const destinationsData: DestinationData[] = [
  // === ЛУННАЯ СЕРИЯ ===
  {
    id: 'moon-tour',
    name: 'Луна: Базовый тур',
    emoji: '🌙',
    duration: '3 дня',
    price: 50000,
    description: 'Прогулки по лунной поверхности, вид на Землю и посещение лунных баз. Идеально для первого космического опыта.',
    image_url: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800',
    gradient: 'from-gray-600 to-gray-800',
    category: 'Луна',
    available: true
  },
  {
    id: 'moon-vip',
    name: 'Луна: VIP-экспедиция',
    emoji: '🌕',
    duration: '7 дней',
    price: 120000,
    description: 'Полная программа: экскурсия по лунным пещерам, наблюдение за восходом Земли, ужин при свете звёзд.',
    image_url: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
    gradient: 'from-slate-500 to-slate-800',
    category: 'Луна',
    available: true
  },

  // === МАРС ===
  {
    id: 'mars-explorer',
    name: 'Марс: Исследователь',
    emoji: '🔴',
    duration: '14 дней',
    price: 250000,
    description: 'Исследуйте каньоны Маринера и потухшие вулканы Красной планеты. Посещение колоний будущего.',
    image_url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800',
    gradient: 'from-red-600 to-orange-800',
    category: 'Марс',
    available: true
  },
  {
    id: 'mars-colony',
    name: 'Марс: Жизнь в колонии',
    emoji: '🏠',
    duration: '30 дней',
    price: 500000,
    description: 'Полное погружение в жизнь марсианской колонии. Работа на гидропонных фермах, научные эксперименты.',
    image_url: 'https://images.unsplash.com/photo-1573588028698-f4759befb09a?w=800',
    gradient: 'from-red-700 to-red-900',
    category: 'Марс',
    available: true
  },

  // === ОРБИТАЛЬНЫЕ ОТЕЛИ ===
  {
    id: 'orbit-hotel',
    name: 'Орбитальный отель "Аврора"',
    emoji: '🏨',
    duration: '7 дней',
    price: 150000,
    description: 'Роскошный отель на орбите Земли с панорамными видами и невесомостью. SPA, рестораны, развлечения.',
    image_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    gradient: 'from-purple-600 to-pink-800',
    category: 'Орбита',
    available: true
  },
  {
    id: 'orbit-station',
    name: 'Станция "Галактика"',
    emoji: '🛰️',
    duration: '14 дней',
    price: 300000,
    description: 'Научная станция с возможностью проведения экспериментов в невесомости. Для любителей науки.',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    gradient: 'from-violet-600 to-purple-900',
    category: 'Орбита',
    available: true
  },

  // === ВНЕШНИЕ ПЛАНЕТЫ ===
  {
    id: 'europa',
    name: 'Европа (спутник Юпитера)',
    emoji: '🪐',
    duration: '45 дней',
    price: 800000,
    description: 'Подлёдные океаны и ледяные гейзеры самого загадочного спутника. Поиск внеземной жизни!',
    image_url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800',
    gradient: 'from-blue-600 to-indigo-800',
    category: 'Внешние планеты',
    available: true
  },
  {
    id: 'titan',
    name: 'Титан (спутник Сатурна)',
    emoji: '🟠',
    duration: '60 дней',
    price: 1200000,
    description: 'Метановые озёра и плотная атмосфера крупнейшего спутника Сатурна. Полёт на дроне над поверхностью.',
    image_url: 'https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4?w=800',
    gradient: 'from-amber-600 to-yellow-800',
    category: 'Внешние планеты',
    available: true
  },

  // === ЭКСТРЕМАЛЬНЫЕ ===
  {
    id: 'kuiper',
    name: 'Пояс Койпера',
    emoji: '💫',
    duration: '90 дней',
    price: 2500000,
    description: 'Экспедиция к границам Солнечной системы для самых отважных. Варп-двигатель нового поколения.',
    image_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800',
    gradient: 'from-cyan-600 to-teal-800',
    category: 'Экстремальные',
    available: true
  },
  {
    id: 'black-hole',
    name: 'Наблюдение за чёрной дырой',
    emoji: '🕳️',
    duration: '120 дней',
    price: 5000000,
    description: 'Уникальная возможность наблюдать за горизонтом событий с безопасного расстояния. Для истинных искателей.',
    image_url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800',
    gradient: 'from-gray-900 to-black',
    category: 'Экстремальные',
    available: true
  },

  // === СПЕЦИАЛЬНЫЕ ===
  {
    id: 'solar-cruise',
    name: 'Круиз по Солнечной системе',
    emoji: '☀️',
    duration: '180 дней',
    price: 3500000,
    description: 'Полный тур по всем планетам Солнечной системы. Посещение 8 планет и 3 карликовых планет.',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    gradient: 'from-yellow-500 to-orange-700',
    category: 'Специальные',
    available: true
  },
  {
    id: 'zero-gravity-party',
    name: 'Вечеринка в невесомости',
    emoji: '🎉',
    duration: '1 день',
    price: 25000,
    description: 'Однодневный тур на орбитальную станцию для вечеринки в невесомости. DJ, напитки, танцы!',
    image_url: 'https://images.unsplash.com/photo-1516956514602-b19ca189e07a?w=800',
    gradient: 'from-pink-500 to-rose-700',
    category: 'Специальные',
    available: true
  }
]
