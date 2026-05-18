import { cn } from "@/lib/utils"
import { BADGE_LABELS, type ProductBadgeType } from "@/lib/product-display"

const badgeStyles: Record<ProductBadgeType, string> = {
  "top-vente":
    "bg-gradient-to-r from-secondary to-amber-500 text-secondary-foreground shadow-md shadow-secondary/25",
  premium:
    "bg-gradient-to-r from-foreground to-primary text-primary-foreground shadow-md shadow-foreground/20",
  nouveau:
    "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25",
}

type ProductBadgeProps = {
  type: ProductBadgeType
  className?: string
}

export function ProductBadge({ type, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-[11px]",
        badgeStyles[type],
        className
      )}
    >
      {BADGE_LABELS[type]}
    </span>
  )
}
