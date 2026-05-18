export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`
}

export function getLineTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity
}
