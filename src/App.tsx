import { useState, useEffect } from 'react'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const isVisible = (id: string) => visibleSections.has(id)

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white font-sans overflow-x-hidden">
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
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">О проекте</a>
            <a href="#destinations" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Направления</a>
            <a href="#services" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Услуги</a>
            <a href="#idea" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Идея</a>
            <a
              href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
            >
              💬 Обратная связь
            </a>
            <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/25">
              Забронировать
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10 pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(88, 28, 135, 0.3) 0%, transparent 60%),
                         radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 40%)`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        {/* Planet decoration */}
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20 blur-sm"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #a855f7, #1e1b4b)',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm">
            ✨ Первый коммерческий рейс — 2077
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Космический
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Туризм 2077
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Откройте для себя бескрайние просторы Вселенной. Путешествия к Луне, Марсу и за пределы Солнечной системы — теперь доступны каждому.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-lg font-bold hover:from-purple-500 hover:to-cyan-500 transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105">
              Начать путешествие
            </button>
            <button className="px-8 py-4 border border-purple-500/50 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all">
              Узнать больше ↓
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '12+', label: 'Направлений' },
              { value: '50K+', label: 'Клиентов' },
              { value: '99.9%', label: 'Безопасность' },
              { value: '0.5c', label: 'Скорость' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  О проекте
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Мы делаем космос доступным. Наша миссия — открыть Вселенную для каждого человека на планете.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🛸',
                  title: 'Технологии будущего',
                  description: 'Используем квантовые двигатели и варп-технологии для безопасных и быстрых перелётов между планетами.',
                },
                {
                  icon: '🌌',
                  title: 'Незабываемые впечатления',
                  description: 'Наблюдайте закат на Марсе, прогуляйтесь по кольцам Сатурна и почувствуйте невесомость.',
                },
                {
                  icon: '🛡️',
                  title: 'Абсолютная безопасность',
                  description: 'Многоуровневые системы защиты и ИИ-навигация обеспечивают 99.9% безопасность полётов.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-purple-500/30 transition-all hover:transform hover:scale-105 duration-300"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible('destinations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Направления
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Выберите своё идеальное космическое приключение
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Луна',
                  emoji: '🌙',
                  duration: '3 дня',
                  price: '50 000 ₢',
                  description: 'Прогулки по лунной поверхности, вид на Землю и посещение лунных баз.',
                  gradient: 'from-gray-600 to-gray-800',
                },
                {
                  name: 'Марс',
                  emoji: '🔴',
                  duration: '14 дней',
                  price: '250 000 ₢',
                  description: 'Исследуйте каньоны Маринера и потухшие вулканы Красной планеты.',
                  gradient: 'from-red-600 to-orange-800',
                },
                {
                  name: 'Европа (спутник Юпитера)',
                  emoji: '🪐',
                  duration: '45 дней',
                  price: '800 000 ₢',
                  description: 'Подлёдные океаны и ледяные гейзеры самого загадочного спутника.',
                  gradient: 'from-blue-600 to-indigo-800',
                },
                {
                  name: 'Титан',
                  emoji: '🟠',
                  duration: '60 дней',
                  price: '1 200 000 ₢',
                  description: 'Метановые озёра и плотная атмосфера крупнейшего спутника Сатурна.',
                  gradient: 'from-amber-600 to-yellow-800',
                },
                {
                  name: 'Орбитальный отель',
                  emoji: '🏨',
                  duration: '7 дней',
                  price: '150 000 ₢',
                  description: 'Роскошный отель на орбите Земли с панорамными видами и невесомостью.',
                  gradient: 'from-purple-600 to-pink-800',
                },
                {
                  name: 'Пояс Койпера',
                  emoji: '💫',
                  duration: '90 дней',
                  price: '2 500 000 ₢',
                  description: 'Экспедиция к границам Солнечной системы для самых отважных.',
                  gradient: 'from-cyan-600 to-teal-800',
                },
              ].map((dest) => (
                <div
                  key={dest.name}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className={`h-40 bg-gradient-to-br ${dest.gradient} flex items-center justify-center`}>
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{dest.emoji}</span>
                  </div>
                  <div className="p-6 bg-white/5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{dest.name}</h3>
                      <span className="text-sm text-cyan-400">{dest.duration}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{dest.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        от {dest.price}
                      </span>
                      <button className="px-4 py-1.5 rounded-full bg-purple-600/30 border border-purple-500/30 text-sm hover:bg-purple-600/50 transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Наши услуги
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: '🎓',
                  title: 'Подготовка космонавтов',
                  description: '6-месячная программа подготовки с тренировками в невесомости, симуляциями и медицинской проверкой.',
                },
                {
                  icon: '🏠',
                  title: 'Жильё на станциях',
                  description: 'Комфортабельные каюты и люксы на космических станциях с панорамными иллюминаторами.',
                },
                {
                  icon: '🍽️',
                  title: 'Космическая кухня',
                  description: 'Мишленовские шеф-повара готовят блюда с использованием гидропонных ингредиентов прямо на станции.',
                },
                {
                  icon: '📸',
                  title: 'Фотосессии в космосе',
                  description: 'Профессиональные фотографы запечатлеют ваш выход в открытый космос на фоне Земли.',
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="flex gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all"
                >
                  <div className="text-4xl flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Idea Section */}
      <section id="idea" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible('idea') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/20 backdrop-blur-sm">
              <div className="text-center mb-8">
                <span className="text-5xl mb-4 block">💡</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  Идея проекта
                </h2>
              </div>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  <strong className="text-white">«Космический туризм 2077»</strong> — это концептуальный проект, 
                  представляющий видение индустрии космических путешествий будущего. Мы создали этот лендинг как 
                  прототип сервиса, который мог бы существовать через 50 лет.
                </p>

                <p>
                  Идея родилась из наблюдения за стремительным развитием частных космических компаний — 
                  SpaceX, Blue Origin, Virgin Galactic. Мы задались вопросом: <em className="text-cyan-300">как будет выглядеть 
                  космический туризм, когда он станет массовым?</em>
                </p>

                <div className="grid sm:grid-cols-2 gap-4 my-8">
                  {[
                    'Доступность космоса для каждого',
                    'Экологичные транспортные системы',
                    'Межпланетная инфраструктура',
                    'Новая экономика Солнечной системы',
                    'Культурный обмен между планетами',
                    'Научные открытия для туристов',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm">
                      <span className="text-cyan-400">◆</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <p>
                  Проект демонстрирует, как может выглядеть UX/UI космического туристического агентства: 
                  от выбора направления до бронирования. Мы использовали футуристический дизайн с 
                  элементами glassmorphism, градиентами и анимациями, чтобы передать атмосферу 2077 года.
                </p>

                <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400">
                    <span className="text-purple-400 font-semibold">Технологии:</span> React + TypeScript + Tailwind CSS. 
                    Адаптивный дизайн, анимации при скролле, glassmorphism-эффекты.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Готовы к приключению?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Оставьте заявку и станьте одним из первых космических туристов. Раннее бронирование — скидка 30%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-bold hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/25">
              Записаться
            </button>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-lg font-bold hover:from-green-500 hover:to-emerald-500 transition-all shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
          >
            <span>💬</span>
            <span>Обратная связь</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  COSMOTOUR 2077
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Ваш проводник в бескрайние просторы Вселенной.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-300">Направления</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Луна</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Марс</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Европа</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Титан</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-300">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Безопасность</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Карьера</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Контакты</li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors"
                  >
                    💬 Обратная связь
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-gray-300">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>📡 космопорт@cosmotour.2077</li>
                <li>📞 +7 (800) 2077-2077</li>
                <li>📍 Космопорт «Восток-1», Земля</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-600">
            <p>© 2077 Cosmotour Inc. Все права защищены во всех известных измерениях.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
