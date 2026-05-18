"use client"

import { useMemo } from "react"
import { ShoppingCart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/catalog/product-card"
import { products, type Product } from "@/lib/products"
import { enrichProduct } from "@/lib/product-display"

type ProductsCatalogProps = {
  onAddToCart: (product: Product, quantity: number) => void
  onOpenCart: () => void
  cartCount: number
}

export function ProductsCatalog({
  onAddToCart,
  onOpenCart,
  cartCount,
}: ProductsCatalogProps) {
  const displayProducts = useMemo(() => products.map(enrichProduct), [])

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-4 top-0 h-48 bg-gradient-to-b from-secondary/5 via-transparent to-transparent sm:-inset-x-8"
        aria-hidden
      />

      <div className="relative mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/50 bg-card/80 px-3 py-2.5 shadow-sm backdrop-blur-sm sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground sm:text-sm">BSClean Services</p>
            <p className="text-[10px] text-muted-foreground sm:text-xs">
              {displayProducts.length} produits professionnels · detailing & entretien auto
            </p>
          </div>
        </div>
        {cartCount > 0 && (
          <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">
            {cartCount} article{cartCount > 1 ? "s" : ""} au panier
          </span>
        )}
      </div>

      <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {displayProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {cartCount > 0 && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-full border-foreground/15 px-8 shadow-sm transition-all hover:border-secondary/40 hover:bg-secondary/5 sm:w-auto"
            onClick={onOpenCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Voir le panier ({cartCount})
          </Button>
        )}
        <Button
          type="button"
          size="lg"
          className="w-full rounded-full bg-gradient-to-r from-primary via-primary to-foreground px-8 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:brightness-110 sm:w-auto"
          onClick={onOpenCart}
        >
          {cartCount > 0 ? "Finaliser ma commande" : "Ouvrir le panier"}
        </Button>
      </div>
    </div>
  )
}
