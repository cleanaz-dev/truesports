'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '@/lib/products'

export type CartItem = Product & { qty: number; size: string; key: string }

type CartState = {
  items: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size: string, qty?: number) => void
  removeItem: (key: string) => void
  updateQty: (key: string, qty: number) => void
}

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product: Product, size: string, qty = 1) => {
    const key = `${product.id}__${size}`
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...product, size, key, qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (key: string) => setItems((prev) => prev.filter((i) => i.key !== key))

  const updateQty = (key: string, qty: number) =>
    setItems((prev) =>
      prev.flatMap((i) => (i.key === key ? (qty <= 0 ? [] : [{ ...i, qty }]) : [i])),
    )

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        acc.count += i.qty
        acc.subtotal += i.qty * i.price
        return acc
      },
      { count: 0, subtotal: 0 },
    )
  }, [items])

  const value: CartState = {
    items,
    count,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQty,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
