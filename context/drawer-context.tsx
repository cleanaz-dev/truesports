// components/drawer-context.tsx
"use client"

import React, { createContext, useContext, useState } from "react"

export type DrawerType = "partnership" | "promo" | null

interface DrawerContextProps {
  isOpen: boolean
  type: DrawerType
  openDrawer: (type: DrawerType) => void
  closeDrawer: () => void
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<DrawerType>(null)

  const openDrawer = (newType: DrawerType) => {
    setType(newType)
    setIsOpen(true)
  }

  const closeDrawer = () => {
    setIsOpen(false)
    // Delay resetting the type so the close animation doesn't pop suddenly
    setTimeout(() => setType(null), 300) 
  }

  return (
    <DrawerContext.Provider value={{ isOpen, type, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) throw new Error("useDrawer must be used within a DrawerProvider")
  return context
}