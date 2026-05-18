import type { Product } from "@/lib/products"

export type ProductBadgeType = "top-vente" | "premium" | "nouveau"

export type ProductDisplay = Product & {
  badge?: ProductBadgeType
  rating: number
  reviewCount: number
}

const BADGE_BY_ID: Partial<Record<string, ProductBadgeType>> = {
  "hyper-wash-d11001": "top-vente",
  "creme-renovateur-ultimate": "top-vente",
  "apc-d10101": "top-vente",
  "ultimate-polish-lustrant": "premium",
  "hyper-dressing-d17001": "premium",
  "quik-interior-d14901": "premium",
  "stoner-pack-vitres-ultime": "nouveau",
  "fictech-pack-nettoyage-vitres": "nouveau",
  "spray-decontaminant-ferreux-g250524": "nouveau",
}

function hashSeed(id: string): number {
  return id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export function enrichProduct(product: Product): ProductDisplay {
  const seed = hashSeed(product.id)
  const rating = Math.min(5, 4.4 + (seed % 7) * 0.1)
  const reviewCount = 8 + (seed % 52)

  return {
    ...product,
    badge: BADGE_BY_ID[product.id],
    rating: Math.round(rating * 10) / 10,
    reviewCount,
  }
}

export const BADGE_LABELS: Record<ProductBadgeType, string> = {
  "top-vente": "Top Vente",
  premium: "Premium",
  nouveau: "Nouveau",
}
