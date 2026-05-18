"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { OrderCheckoutForm } from "@/components/order-checkout-form"
import {
  getCartItemId,
  getCartItemLineTotal,
  getCartItemName,
  getCartItemUnitPrice,
  getCartSubtotal,
  getCartTotalQuantity,
  type CartItem,
} from "@/lib/cart"
import { formatPrice } from "@/lib/format"

type ProductCartSheetProps = {
  items: CartItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onClearCart: () => void
}

export function ProductCartSheet({
  items,
  open,
  onOpenChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: ProductCartSheetProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart")
  const totalItems = getCartTotalQuantity(items)
  const subtotal = getCartSubtotal(items)

  const handleOpenChange = (next: boolean) => {
    if (!next) setStep("cart")
    onOpenChange(next)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="flex items-center gap-2 text-lg">
            {step === "checkout" ? (
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="mr-1 flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
                aria-label="Retour au panier"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <ShoppingBag className="h-5 w-5 text-secondary" aria-hidden />
            )}
            {step === "checkout" ? "Finaliser la commande" : "Mon panier"}
          </SheetTitle>
          <SheetDescription>
            {step === "checkout"
              ? "Renseignez vos coordonnées pour envoyer la commande sur WhatsApp."
              : totalItems > 0
                ? `${totalItems} article${totalItems > 1 ? "s" : ""} · ${formatPrice(subtotal)}`
                : "Produits et prestations sélectionnés."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {step === "checkout" ? (
            <OrderCheckoutForm
              items={items}
              onBack={() => setStep("cart")}
              onSuccess={() => {
                onClearCart()
                setStep("cart")
                onOpenChange(false)
              }}
            />
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Panier vide. Ajoutez des produits ou prestations avec Commander.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const itemId = getCartItemId(item)
                const unitPrice = getCartItemUnitPrice(item)
                const lineTotal = getCartItemLineTotal(item)

                return (
                  <li
                    key={itemId}
                    className="flex gap-3 rounded-xl border border-border bg-muted/30 p-3"
                  >
                    {item.kind === "product" && (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                    )}
                    {item.kind === "service" && (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                        Svc
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-snug text-foreground">
                        {getCartItemName(item)}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.kind === "product"
                          ? `${item.product.category} · ${item.product.size}`
                          : item.categoryTitle}
                      </p>
                      <p className="mt-1 text-xs font-medium text-secondary">
                        {formatPrice(unitPrice)} / unité · {formatPrice(lineTotal)}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-full border border-border bg-background">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(itemId, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-l-full hover:bg-muted"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(itemId, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-r-full hover:bg-muted"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(itemId)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Retirer du panier"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {step === "cart" && (
          <SheetFooter className="border-t border-border px-5 py-4">
            {items.length > 0 && (
              <>
                <div className="mb-3 flex w-full items-center justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-secondary">{formatPrice(subtotal)}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mb-2 w-full text-muted-foreground"
                  onClick={onClearCart}
                >
                  Vider le panier
                </Button>
                <Button
                  type="button"
                  className="h-12 w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={() => setStep("checkout")}
                >
                  Valider la commande
                </Button>
              </>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
