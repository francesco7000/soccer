"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PWADebug() {
  const [displayMode, setDisplayMode] = useState<string>("unknown")
  const [isStandalone, setIsStandalone] = useState<boolean>(false)
  const [installable, setInstallable] = useState<boolean>(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [userAgent, setUserAgent] = useState<string>("")
  const [manifestInfo, setManifestInfo] = useState<any>(null)

  useEffect(() => {
    // Check display mode
    if (window.matchMedia("(display-mode: fullscreen)").matches) {
      setDisplayMode("fullscreen")
    } else if (window.matchMedia("(display-mode: standalone)").matches) {
      setDisplayMode("standalone")
    } else if (window.matchMedia("(display-mode: minimal-ui)").matches) {
      setDisplayMode("minimal-ui")
    } else if (window.matchMedia("(display-mode: browser)").matches) {
      setDisplayMode("browser")
    }

    // Check if running as standalone
    setIsStandalone(window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches)

    // Capture install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setInstallable(true)
    })

    // Get user agent
    setUserAgent(window.navigator.userAgent)

    // Get manifest info from meta tag
    try {
      const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement
      if (manifestLink && manifestLink.href) {
        setManifestInfo({
          display: "fullscreen", // Valore predefinito
          url: manifestLink.href,
        })
      }
    } catch (error) {
      console.error("Error getting manifest info:", error)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setInstallable(false)
    }
  }

  const handleReload = () => {
    window.location.reload()
  }

  const handleClearCache = async () => {
    if ("caches" in window) {
      const cacheNames = await window.caches.keys()
      await Promise.all(cacheNames.map((name) => window.caches.delete(name)))
      alert("Cache cleared. The app will now reload.")
      window.location.reload()
    }
  }

  return (
    <Card className="mt-8 shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-primary">Diagnostica PWA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="p-3 bg-muted/30 rounded-md">
          <strong className="text-primary">Modalità display:</strong> {displayMode}
        </div>
        <div className="p-3 bg-muted/30 rounded-md">
          <strong className="text-primary">Modalità standalone:</strong> {isStandalone ? "Sì" : "No"}
        </div>
        <div className="p-3 bg-muted/30 rounded-md">
          <strong className="text-primary">Installabile:</strong> {installable ? "Sì" : "No"}
        </div>
        <div className="text-xs break-all p-3 bg-muted/30 rounded-md">
          <strong className="text-primary">User Agent:</strong> {userAgent}
        </div>
        {manifestInfo && (
          <div className="p-3 bg-muted/30 rounded-md">
            <strong className="text-primary">Manifest:</strong> {manifestInfo.display}
            {manifestInfo.url && <span className="text-xs ml-2">({manifestInfo.url})</span>}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {installable && (
            <Button onClick={handleInstall} className="bg-primary hover:bg-primary-dark transition-all duration-300 shadow-md">
              Installa App
            </Button>
          )}
          <Button onClick={handleReload} variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all duration-300">
            Ricarica App
          </Button>
          <Button onClick={handleClearCache} variant="outline" className="border-accent-color text-accent-color hover:bg-accent-color/10 transition-all duration-300">
            Cancella Cache
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
