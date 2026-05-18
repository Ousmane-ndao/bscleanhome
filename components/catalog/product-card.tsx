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
        "product-card-enter group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card",
        "shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:border-secondary/30 hover:shadow-[0_20px_48px_-12px_rgba(15,23,42,0.18)] hover:shadow-secondary/10"
      )}
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-gradient-to-b from-muted/50 via-background to-muted/30 sm:aspect-square">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-secondary)/0.08,transparent_60%)]" />

        {product.badge && (
          <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
            <ProductBadge type={product.badge} />
          </div>
        )}

        <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
          <span className="inline-flex items-center rounded-full border border-border/80 bg-card/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        <div className="relative flex h-full w-full items-center justify-center p-5 sm:p-6">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="lazy"
            quality={75}
            className="object-contain object-center p-3 transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/15 ring-1 ring-border/60">
              <ProductIcon className="h-3.5 w-3.5 text-primary" strokeWidth={2} aria-hidden />
            </div>
            <span className="truncate text-[10px] font-bold uppercase tracking-widest text-secondary sm:text-[11px]">
              {product.brand}
            </span>
          </div>
          <span className="shrink-0 rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {product.size}
          </span>
        </div>

        <ProductRating rating={product.rating} reviewCount={product.reviewCount} className="mb-3" />

        <h3 className="line-clamp-2 min-h-[2.75rem] text-left text-[0.9375rem] font-bold leading-snug tracking-tight text-foreground sm:min-h-[3rem] sm:text-base">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-left text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem] sm:leading-relaxed">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-border/60 pt-4">
          <p className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {formatPrice(product.price)}
          </p>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            TTC
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/30 p-1 shadow-inner sm:justify-start">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground hover:text-background active:scale-95"
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground hover:text-background active:scale-95"
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleCommander}
            className={cn(
              "relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 sm:w-auto sm:min-w-[9.5rem]",
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
                <Check className="h-4 w-4" aria-hidden />
                Ajouté
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" aria-hidden />
                Commander
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
