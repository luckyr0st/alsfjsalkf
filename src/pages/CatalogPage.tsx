import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { destinationsApi, type Destination } from '../lib/supabase'
import { destinationsData, type DestinationData } from '../data/destinations'

interface CatalogPageProps {
  onBooking: (destination: DestinationData) => void
}

export default function CatalogPage({ onBooking }: CatalogPageProps) {
  const navigate = useNavigate()
  const [destinations, setDestinations] = useState<DestinationData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('Все')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc')

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true)
      try {
        // Пытаемся загрузить из Supabase
        const data = await destinationsApi.getAvailable()
        if (data && data.length > 0) {
          setDestinations(data as unknown as DestinationData[])
        } else {
          // Fallback на локальные данные
          setDestinations(destinationsData)
        }
      } catch (error) {
        console.error('Failed to fetch destinations, using local data:', error)
        setDestinations(destinationsData)
      }
      setLoading(false)
    }

    fetchDestinations()
  }, [])

  const categories = ['Все', ...Array.from(new Set(destinations.map(d => d.category)))]

  const filteredDestinations = destinations
    .filter(d => selectedCategory === 'Все' || d.category === selectedCategory)
    .filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white pt-24 pb-16 px-6">
      {/* Stars Background */}
      <div className="fixed inset-0 z-0">
        <div className="stars-bg" />
        <div className="stars-bg-2" />
        <div className="stars-bg-3" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a1a]/70 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              COSMOTOUR 2077
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
            >
              Главная
            </button>
            <button 
              onClick={() => navigate('/catalog')}
              className="text-cyan-400 text-sm font-semibold"
            >
              Каталог
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            ← Назад на главную
          </button>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Каталог путешествий
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Выберите своё идеальное космическое приключение из {destinations.length} направлений
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 space-y-4">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Поиск по направлениям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="price-asc" className="bg-[#0a0a1a]">Сначала дешёвые</option>
              <option value="price-desc" className="bg-[#0a0a1a]">Сначала дорогие</option>
              <option value="name" className="bg-[#0a0a1a]">По названию</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:border-purple-500/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count & Supabase Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <p className="text-sm text-gray-400">
            Найдено: {filteredDestinations.length} {filteredDestinations.length === 1 ? 'направление' : 'направлений'}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-400">🗄️ Данные из Supabase</span>
          </div>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-4xl mb-4">🚀</div>
            <p className="text-gray-400">Загрузка направлений из космоса...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className={`h-48 bg-gradient-to-br ${dest.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {dest.emoji}
                  </span>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-medium text-white">
                    {dest.category}
                  </div>
                </div>
                <div className="p-6 bg-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                    <span className="text-sm text-cyan-400 whitespace-nowrap ml-2">{dest.duration}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{dest.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      от {dest.price.toLocaleString('ru-RU')} ₢
                    </span>
                    <button
                      onClick={() => onBooking(dest)}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-sm font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all"
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔭</div>
            <p className="text-gray-400 text-lg">По вашему запросу ничего не найдено</p>
            <p className="text-gray-500 text-sm mt-2">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>
    </div>
  )
}
