import { useState, useRef, useEffect } from 'react'

const slides = [
  {
    emoji: '🎯',
    title: 'Welcome to Wheel of Life',
    text: 'A simple tool to visualize your life balance across 8 key areas — health, career, finances, relationships, and more.',
  },
  {
    emoji: '📊',
    title: 'How it works',
    text: 'Rate each area of your life from 1 to 10 using the slider. Your scores build a radar chart showing where you stand.',
  },
  {
    emoji: '📈',
    title: 'Track your progress',
    text: 'Check in regularly to see how your life balance evolves over time. Compare past check-ins and spot trends.',
  },
]

export default function Onboarding({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    function handleScroll() {
      const index = Math.round(container.scrollLeft / container.offsetWidth)
      setCurrent(index)
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  function goTo(index) {
    scrollRef.current?.scrollTo({ left: index * scrollRef.current.offsetWidth, behavior: 'smooth' })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        className="rounded-2xl shadow-xl border border-[var(--color-border)] mx-4 w-full max-w-sm overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {/* Skip button */}
        <div className="flex justify-end px-4 pt-3">
          <button
            onClick={onComplete}
            className="text-xs text-[var(--color-text-secondary)] cursor-pointer bg-transparent border-none"
          >
            Skip
          </button>
        </div>

        {/* Slides */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full px-8 pb-2 pt-4 text-center"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="text-5xl mb-4">{slide.emoji}</div>
              <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">
                {slide.title}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {slide.text}
              </p>
            </div>
          ))}
        </div>

        {/* Dots + action */}
        <div className="px-6 pb-5 pt-3">
          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mb-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full cursor-pointer border-none transition-all duration-200"
                style={{
                  backgroundColor: i === current ? 'var(--color-primary)' : 'var(--color-border)',
                  transform: i === current ? 'scale(1.3)' : 'scale(1)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {current === slides.length - 1 ? (
            <button
              onClick={onComplete}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
              }}
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => goTo(current + 1)}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm cursor-pointer border-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
