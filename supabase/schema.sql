-- ============================================
-- SQL миграции для Supabase
-- Космический Туризм 2077
-- ============================================

-- Таблица направлений (destinations)
CREATE TABLE IF NOT EXISTS destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  duration TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  gradient TEXT,
  category TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица бронирований (bookings)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  destination_id TEXT NOT NULL,
  destination_name TEXT NOT NULL,
  travel_date DATE NOT NULL,
  travelers INTEGER NOT NULL DEFAULT 1,
  preparation BOOLEAN DEFAULT false,
  insurance BOOLEAN DEFAULT false,
  photo_session BOOLEAN DEFAULT false,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_destinations_category ON destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_available ON destinations(available);

-- RLS (Row Level Security) политики
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Разрешаем всем читать направления
CREATE POLICY "Destinations are viewable by everyone"
  ON destinations FOR SELECT
  USING (true);

-- Разрешаем всем создавать бронирования
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Разрешаем пользователям читать свои бронирования по email
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (true);

-- ============================================
-- Вставка данных (12 направлений)
-- ============================================

INSERT INTO destinations (name, emoji, duration, price, description, image_url, gradient, category, available) VALUES
-- Лунная серия
('Луна: Базовый тур', '🌙', '3 дня', 50000, 'Прогулки по лунной поверхности, вид на Землю и посещение лунных баз. Идеально для первого космического опыта.', 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800', 'from-gray-600 to-gray-800', 'Луна', true),
('Луна: VIP-экспедиция', '🌕', '7 дней', 120000, 'Полная программа: экскурсия по лунным пещерам, наблюдение за восходом Земли, ужин при свете звёзд.', 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', 'from-slate-500 to-slate-800', 'Луна', true),

-- Марс
('Марс: Исследователь', '🔴', '14 дней', 250000, 'Исследуйте каньоны Маринера и потухшие вулканы Красной планеты. Посещение колоний будущего.', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800', 'from-red-600 to-orange-800', 'Марс', true),
('Марс: Жизнь в колонии', '🏠', '30 дней', 500000, 'Полное погружение в жизнь марсианской колонии. Работа на гидропонных фермах, научные эксперименты.', 'https://images.unsplash.com/photo-1573588028698-f4759befb09a?w=800', 'from-red-700 to-red-900', 'Марс', true),

-- Орбитальные отели
('Орбитальный отель "Аврора"', '🏨', '7 дней', 150000, 'Роскошный отель на орбите Земли с панорамными видами и невесомостью. SPA, рестораны, развлечения.', 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800', 'from-purple-600 to-pink-800', 'Орбита', true),
('Станция "Галактика"', '🛰️', '14 дней', 300000, 'Научная станция с возможностью проведения экспериментов в невесомости. Для любителей науки.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'from-violet-600 to-purple-900', 'Орбита', true),

-- Внешние планеты
('Европа (спутник Юпитера)', '🪐', '45 дней', 800000, 'Подлёдные океаны и ледяные гейзеры самого загадочного спутника. Поиск внеземной жизни!', 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800', 'from-blue-600 to-indigo-800', 'Внешние планеты', true),
('Титан (спутник Сатурна)', '🟠', '60 дней', 1200000, 'Метановые озёра и плотная атмосфера крупнейшего спутника Сатурна. Полёт на дроне над поверхностью.', 'https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4?w=800', 'from-amber-600 to-yellow-800', 'Внешние планеты', true),

-- Экстремальные
('Пояс Койпера', '💫', '90 дней', 2500000, 'Экспедиция к границам Солнечной системы для самых отважных. Варп-двигатель нового поколения.', 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800', 'from-cyan-600 to-teal-800', 'Экстремальные', true),
('Наблюдение за чёрной дырой', '🕳️', '120 дней', 5000000, 'Уникальная возможность наблюдать за горизонтом событий с безопасного расстояния. Для истинных искателей.', 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800', 'from-gray-900 to-black', 'Экстремальные', true),

-- Специальные
('Круиз по Солнечной системе', '☀️', '180 дней', 3500000, 'Полный тур по всем планетам Солнечной системы. Посещение 8 планет и 3 карликовых планет.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'from-yellow-500 to-orange-700', 'Специальные', true),
('Вечеринка в невесомости', '🎉', '1 день', 25000, 'Однодневный тур на орбитальную станцию для вечеринки в невесомости. DJ, напитки, танцы!', 'https://images.unsplash.com/photo-1516956514602-b19ca189e07a?w=800', 'from-pink-500 to-rose-700', 'Специальные', true);
