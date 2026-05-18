import { formatPrice, getLineTotal } from "@/lib/format"
import type { CustomerInfo } from "@/lib/order"
import type { Product } from "@/lib/products"

export type ServiceCartItem = {
  kind: "service"
  id: string
  name: string
  categoryId: string
  categoryTitle: string
  price: number
  quantity: number
}

export type ProductCartItem = {
  kind: "product"
  product: Product
  quantity: number
}

export type CartItem = ProductCartItem | ServiceCartItem

export const WHATSAPP_NUMBER = "221776211688"

export function getCartItemId(item: CartItem): string {
  return item.kind === "product" ? item.product.id : item.id
}

export function getCartItemName(item: CartItem): string {
  return item.kind === "product" ? item.product.name : item.name
}

export function getCartItemUnitPrice(item: CartItem): number {
  return item.kind === "product" ? item.product.price : item.price
}

export function getCartItemLineTotal(item: CartItem): number {
  return getLineTotal(getCartItemUnitPrice(item), item.quantity)
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + getCartItemLineTotal(item), 0)
}

export function getCartTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

function formatCartLine(item: CartItem, index: number): string {
  const unitPrice = getCartItemUnitPrice(item)
  const lineTotal = getCartItemLineTotal(item)
  const typeLabel = item.kind === "product" ? "Produit" : "Prestation"

  const details =
    item.kind === "product"
      ? [
          `   Type      : ${typeLabel} (${item.product.brand})`,
          `   Catégorie : ${item.product.category}`,
          `   Format    : ${item.product.size}`,
        ]
      : [
          `   Type      : ${typeLabel}`,
          `   Catégorie : ${item.categoryTitle}`,
        ]

  return [
    `${index + 1}. ${getCartItemName(item)}`,
    ...details,
    `   Quantité  : ${item.quantity}`,
    `   P.U.      : ${formatPrice(unitPrice)}`,
    `   Sous-total: ${formatPrice(lineTotal)}`,
  ].join("\n")
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  customer: CustomerInfo
): string {
  const subtotal = getCartSubtotal(items)
  const totalQty = getCartTotalQuantity(items)
  const productCount = items.filter((i) => i.kind === "product").length
  const serviceCount = items.filter((i) => i.kind === "service").length

  const summaryParts: string[] = []
  if (productCount > 0) summaryParts.push(`${productCount} produit${productCount > 1 ? "s" : ""}`)
  if (serviceCount > 0) summaryParts.push(`${serviceCount} prestation${serviceCount > 1 ? "s" : ""}`)

  return [
    "════════════════════════════════",
    "  NOUVELLE COMMANDE — BS CONSULTING",
    "════════════════════════════════",
    "",
    "📋 INFORMATIONS CLIENT",
    "────────────────────────────────",
    `Prénom     : ${customer.firstName}`,
    `Nom        : ${customer.lastName}`,
    `Téléphone  : ${customer.phone}`,
    `Adresse    : ${customer.address}`,
    "",
    "🛒 DÉTAIL DE LA COMMANDE",
    "────────────────────────────────",
    ...items.map((item, i) => formatCartLine(item, i)),
    "",
    "────────────────────────────────",
    `TOTAL GÉNÉRAL : ${formatPrice(subtotal)}`,
    `Articles      : ${totalQty} (${summaryParts.join(" · ")})`,
    "",
    "Merci pour votre confiance.",
    "Notre équipe traitera votre commande dans les plus brefs délais.",
  ].join("\n")
}

export function buildWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerInfo
): string {
  const message = buildWhatsAppOrderMessage(items, customer)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function sendWhatsAppOrder(items: CartItem[], customer: CustomerInfo): void {
  const url = buildWhatsAppOrderUrl(items, customer)
  window.open(url, "_blank", "noopener,noreferrer")
}
