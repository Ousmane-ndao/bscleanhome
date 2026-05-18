"use client"

import { useCallback, useEffect, useState } from "react"
import type { CartItem, ServiceCartItem } from "@/lib/cart"
import { getCartSubtotal, getCartTotalQuantity } from "@/lib/cart"
import type { Product } from "@/lib/products"

const STORAGE_KEY = "bs-consulting-cart"

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(loadCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveCart(items)
  }, [items, hydrated])

  const addProduct = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.kind === "product" && item.product.id === product.id
      )
      if (existing && existing.kind === "product") {
        return prev.map((item) =>
          item.kind === "product" && item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { kind: "product" as const, product, quantity }]
    })
    setIsOpen(true)
  }, [])

  const addService = useCallback(
    (
      service: Omit<ServiceCartItem, "kind" | "quantity">,
      quantity = 1
    ) => {
      setItems((prev) => {
        const existing = prev.find(
          (item) => item.kind === "service" && item.id === service.id
        )
        if (existing && existing.kind === "service") {
          return prev.map((item) =>
            item.kind === "service" && item.id === service.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
        return [
          ...prev,
          { kind: "service" as const, ...service, quantity },
        ]
      })
      setIsOpen(true)
    },
    []
  )

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => {
      const id = item.kind === "product" ? item.product.id : item.id
      return id !== itemId
    }))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((item) => {
        const id = item.kind === "product" ? item.product.id : item.id
        return id !== itemId
      }))
      return
    }
    setItems((prev) =>
      prev.map((item) => {
        const id = item.kind === "product" ? item.product.id : item.id
        return id === itemId ? { ...item, quantity } : item
      })
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = getCartTotalQuantity(items)
  const subtotal = getCartSubtotal(items)

  return {
    items,
    isOpen,
    setIsOpen,
    addProduct,
    addService,
    addItem: addProduct,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    hydrated,
  }
}
