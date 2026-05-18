import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type ProductRatingProps = {
  rating: number
  reviewCount: number
  className?: string
}

export function ProductRating({ rating, reviewCount, className }: ProductRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", className)}
      aria-label={`Note ${rating} sur 5, ${reviewCount} avis`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < fullStars || (i === fullStars && hasHalf)
          return (
            <Star
              key={i}
              className={cn(
                "h-3 w-3 sm:h-3.5 sm:w-3.5",
                filled
                  ? "fill-secondary text-secondary"
                  : "fill-muted text-muted-foreground/25"
              )}
              strokeWidth={filled ? 0 : 1.5}
              aria-hidden
            />
          )
        })}
      </div>
      <span className="text-xs font-semibold text-foreground tabular-nums">{rating.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">({reviewCount} avis)</span>
    </div>
  )
}
