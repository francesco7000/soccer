"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CreateMatchButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // In a real app, this would open a form to create a new match
    alert("Funzionalità di creazione partita in arrivo!")
  }

  return (
    <Button 
      className="bg-primary hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" 
      onClick={handleClick}
    >
      <Plus className="mr-2 h-4 w-4 animate-pulse" /> Nuova Partita
    </Button>
  )
}
