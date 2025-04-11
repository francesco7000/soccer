"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches
    ) {
      setIsInstalled(true)
      return
    }

    // Capture install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    })

    // Listen for successful installs
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setShowPrompt(false)
    })
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
    }
  }

  if (!showPrompt || isInstalled) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50 flex items-center justify-between">
      <div>
        <h3 className="font-bold">Installa Calcetto App</h3>
        <p className="text-sm text-muted-foreground">
          Installa l'app per un'esperienza completa senza barra degli indirizzi
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => setShowPrompt(false)}>
          <X className="h-4 w-4" />
        </Button>
        <Button onClick={handleInstall} className="bg-green-600 hover:bg-green-700">
          Installa
        </Button>
      </div>
    </div>
  )
}
