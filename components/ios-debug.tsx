"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function IOSDebug() {
  const [isIOS, setIsIOS] = useState<boolean>(false)
  const [isSafari, setIsSafari] = useState<boolean>(false)
  const [isStandalone, setIsStandalone] = useState<boolean>(false)
  const [installedApps, setInstalledApps] = useState<string[]>([])

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)

    // Check if Safari
    const safari =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
      !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent)
    setIsSafari(safari)

    // Check if in standalone mode
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true
    setIsStandalone(standalone)

    // Safely check for installed related apps
    const checkInstalledApps = async () => {
      try {
        // Check if the API is available
        if (navigator.getInstalledRelatedApps && typeof navigator.getInstalledRelatedApps === "function") {
          // Only call in a secure context and top-level browsing context
          if (window.isSecureContext && window === window.top) {
            const relatedApps = await navigator.getInstalledRelatedApps()
            setInstalledApps(relatedApps.map((app) => app.id))
          }
        }
      } catch (error) {
        console.log("API getInstalledRelatedApps non supportata o non disponibile")
      }
    }

    checkInstalledApps()
  }, [])

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Diagnostica iOS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Dispositivo iOS:</strong> {isIOS ? "Sì" : "No"}
        </div>
        <div>
          <strong>Browser Safari:</strong> {isSafari ? "Sì" : "No"}
        </div>
        <div>
          <strong>Modalità standalone:</strong> {isStandalone ? "Sì" : "No"}
        </div>
        {installedApps.length > 0 && (
          <div>
            <strong>App installate correlate:</strong>
            <ul className="list-disc pl-5 mt-1">
              {installedApps.map((app, index) => (
                <li key={index}>{app}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200 text-yellow-800 text-sm">
          <p className="font-medium">Importante per iOS:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Su iOS, devi usare Safari per installare la PWA</li>
            <li>Usa il pulsante di condivisione e poi "Aggiungi a Home"</li>
            <li>Apri l'app SOLO dall'icona nella schermata Home</li>
            {!isStandalone && isIOS && (
              <li className="text-red-600 font-medium">
                Non sei in modalità standalone! Installa l'app dalla schermata Home.
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
