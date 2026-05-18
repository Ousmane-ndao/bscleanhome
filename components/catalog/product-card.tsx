"use client"

import { useState } from "react"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  AppWindow,
  Beaker,
  Check,
  Droplets,
  Flame,
  Minus,
  Plus,
  ScanLine,
  Shield,
  ShoppingCart,
  Sofa,
  Sparkles,
  SprayCan,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductDisplay } from "@/lib/product-display"
import type { Product } from "@/lib/products"
import { formatPrice } from "@/lib/format"
import { ProductBadge } from "@/components/catalog/product-badge"
import { ProductRating } from "@/components/catalog/product-rating"

const productCategoryIcons: Record<string, LucideIcon> = {
  Rénovation: Wrench,
  Polish: Sparkles,
  Correction: ScanLine,
  Lavage: Droplets,
  Nettoyant: Beaker,
  Vitres: AppWindow,
  Habillage: SprayCan,
  Intérieur: Sofa,
  Décontamination: Shield,
  Dégraissant: Flame,
  Shampoing: Droplets,
}

type ProductCardProps = {
  product: ProductDisplay
  index: number
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const ProductIcon = productCategoryIcons[product.category] ?? Sparkles

  const handleCommander = () => {
    onAddToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <article
      className={cn(
        "product-card-enter group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card",
        "shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:border-secondary/30 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.14)] hover:shadow-secondary/10"
      )}
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative aspect-[4/3] w-full min-h-[190px] shrink-0 overflow-hidden bg-gradient-to-b from-muted/40 via-white to-muted/20 sm:min-h-[200px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-secondary)/0.08,transparent_60%)]" />

        {product.badge && (
          <div className="absolute left-2 top-2 z-10">
            <ProductBadge type={product.badge} />
          </div>
        )}

        <div className="absolute right-2 top-2 z-10">
          <span className="inline-flex items-center rounded-full border border-border/80 bg-card/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        <div className="relative flex h-full w-full items-center justify-center p-1 sm:p-1.5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="lazy"
            quality={92}
            className="object-contain object-center scale-[1.22] transition-transform duration-500 ease-out group-hover:scale-[1.32]"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 320px"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary/10 to-secondary/15 ring-1 ring-border/60">
              <ProductIcon className="h-3 w-3 text-primary" strokeWidth={2} aria-hidden />
            </div>
            <span className="truncate text-[9px] font-bold uppercase tracking-widest text-secondary sm:text-[10px]">
              {product.brand}
            </span>
          </div>
          <span className="shrink-0 rounded-md bg-muted/80 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
            {product.size}
          </span>
        </div>

        <ProductRating rating={product.rating} reviewCount={product.reviewCount} className="mb-2" />

        <h3 className="line-clamp-2 min-h-[2.25rem] text-left text-sm font-bold leading-snug tracking-tight text-foreground">
          {product.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 flex-1 text-left text-[11px] leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-border/60 pt-3">
          <p className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            {formatPrice(product.price)}
          </p>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
            TTC
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-0.5 shadow-inner sm:justify-start">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-foreground hover:text-background active:scale-95"
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2rem] text-center text-xs font-semibold tabular-nums">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-foreground hover:text-background active:scale-95"
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleCommander}
            className={cn(
              "relative flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-lg px-4 py-2 text-xs font-bold transition-all duration-300 sm:w-auto sm:min-w-[8.5rem] sm:text-sm",
              "active:scale-[0.98]",
              added
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-gradient-to-r from-secondary via-amber-500 to-secondary text-secondary-foreground shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 hover:brightness-105"
            )}
          >
            {!added && (
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            )}
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden />
                Ajouté
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" aria-hidden />
                Commander
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
