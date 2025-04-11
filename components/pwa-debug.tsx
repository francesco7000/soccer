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
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Diagnostica PWA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Modalità display:</strong> {displayMode}
        </div>
        <div>
          <strong>Modalità standalone:</strong> {isStandalone ? "Sì" : "No"}
        </div>
        <div>
          <strong>Installabile:</strong> {installable ? "Sì" : "No"}
        </div>
        <div className="text-xs break-all">
          <strong>User Agent:</strong> {userAgent}
        </div>
        {manifestInfo && (
          <div>
            <strong>Manifest:</strong> {manifestInfo.display}
            {manifestInfo.url && <span className="text-xs ml-2">({manifestInfo.url})</span>}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {installable && (
            <Button onClick={handleInstall} className="bg-green-600 hover:bg-green-700">
              Installa App
            </Button>
          )}
          <Button onClick={handleReload} variant="outline">
            Ricarica App
          </Button>
          <Button onClick={handleClearCache} variant="outline">
            Cancella Cache
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
