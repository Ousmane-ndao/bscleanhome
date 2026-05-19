"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

const AUTO_PLAY_MS = 4500
const MAX_GALLERY_IMAGES = 8

type ServiceImageGalleryProps = {
  images: string[]
  title: string
}

export function ServiceImageGallery({ images, title }: ServiceImageGalleryProps) {
  const slides = images.slice(0, MAX_GALLERY_IMAGES)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return
      setCurrentIndex(((index % slides.length) + slides.length) % slides.length)
    },
    [slides.length]
  )

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  const slideKey = slides.join("|")

  useEffect(() => {
    setCurrentIndex(0)
  }, [slideKey])

  useEffect(() => {
    if (slides.length <= 1 || isPaused || reduceMotion) return
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, AUTO_PLAY_MS)
    return () => window.clearInterval(id)
  }, [slideKey, slides.length, isPaused, reduceMotion])

  if (slides.length === 0) {
    return <div className="aspect-[4/3] rounded-2xl bg-muted animate-pulse" aria-hidden />
  }

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-muted aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        className={`flex h-full w-full ${reduceMotion ? "" : "transition-transform duration-700 ease-in-out"}`}
        style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        aria-live="polite"
      >
        {slides.map((src, i) => (
          <div key={`${src}-${i}`} className="relative h-full min-w-full shrink-0">
            <Image
              src={src}
              alt={`${title} — visuel ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              quality={i === 0 ? 72 : 60}
              priority={i === 0}
              loading={i <= 1 ? "eager" : "lazy"}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/35 active:scale-95 focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 z-[2] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/35 active:scale-95 focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>

          <div className="absolute bottom-4 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Image ${i + 1} sur ${slides.length}`}
                aria-current={i === currentIndex ? true : undefined}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ServiceThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="56px"
        quality={45}
        loading="lazy"
        className="object-cover object-center"
      />
    </div>
  )
}

export { ServiceThumb }
