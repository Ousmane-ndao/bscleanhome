"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  getCartItemLineTotal,
  getCartItemName,
  getCartSubtotal,
  sendWhatsAppOrder,
  type CartItem,
} from "@/lib/cart"
import { formatPrice } from "@/lib/format"
import {
  customerSchema,
  emptyCustomer,
  type CustomerInfo,
} from "@/lib/order"

type OrderCheckoutFormProps = {
  items: CartItem[]
  onSuccess?: () => void
  onBack?: () => void
}

export function OrderCheckoutForm({
  items,
  onSuccess,
  onBack,
}: OrderCheckoutFormProps) {
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer)
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  const subtotal = getCartSubtotal(items)

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = customerSchema.safeParse(customer)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CustomerInfo, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof CustomerInfo
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setSubmitting(true)
    sendWhatsAppOrder(items, result.data)
    onSuccess?.()
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Récapitulatif
        </p>
        <ul className="max-h-40 space-y-2 overflow-y-auto text-sm">
          {items.map((item) => {
            const id = item.kind === "product" ? item.product.id : item.id
            return (
              <li key={id} className="flex justify-between gap-2 border-b border-border/50 pb-2 last:border-0">
                <span className="min-w-0 flex-1 leading-snug text-foreground">
                  {getCartItemName(item)}{" "}
                  <span className="text-muted-foreground">×{item.quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-foreground">
                  {formatPrice(getCartItemLineTotal(item))}
                </span>
              </li>
            )
          })}
        </ul>
        <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
          <span>Total</span>
          <span className="text-secondary">{formatPrice(subtotal)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold text-foreground">
          Vos coordonnées <span className="text-destructive">*</span>
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={customer.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Ex. Amadou"
              aria-invalid={!!errors.firstName}
              autoComplete="given-name"
              required
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={customer.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Ex. Diallo"
              aria-invalid={!!errors.lastName}
              autoComplete="family-name"
              required
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <Input
            id="phone"
            type="tel"
            value={customer.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Ex. 77 621 16 88"
            aria-invalid={!!errors.phone}
            autoComplete="tel"
            required
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="address">Adresse</Label>
          <Textarea
            id="address"
            value={customer.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Quartier, ville, point de repère..."
            rows={3}
            aria-invalid={!!errors.address}
            autoComplete="street-address"
            required
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          disabled={items.length === 0 || submitting}
          className="h-12 w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
          Valider et envoyer sur WhatsApp
        </Button>
        {onBack && (
          <Button type="button" variant="ghost" className="w-full" onClick={onBack}>
            Retour au panier
          </Button>
        )}
      </div>
    </form>
  )
}
