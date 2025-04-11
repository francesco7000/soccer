"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { X, Share2 } from "lucide-react"

export function IOSInstallGuide() {
  const [isVisible, setIsVisible] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(iOS)

    // Check if already in standalone mode
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true
    setIsStandalone(standalone)

    // Check if Safari
    const safari =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
      !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent)
    setIsSafari(safari)

    // Only show guide if on iOS, not in standalone mode
    setIsVisible(iOS && !standalone)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
          <CardTitle>Installa Calcetto App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSafari && (
            <div className="rounded-md bg-amber-50 p-4 text-amber-800 border border-amber-200">
              <p className="font-medium">Per installare questa app su iOS, devi usare Safari.</p>
              <p className="text-sm mt-1">
                Stai usando un altro browser. Per favore, copia questo URL e aprilo in Safari:
              </p>
              <div className="mt-2 p-2 bg-white rounded border border-amber-200 text-xs break-all">
                {window.location.href}
              </div>
            </div>
          )}

          {isSafari && (
            <>
              <p>Per installare questa app sul tuo iPhone e nascondere la barra degli indirizzi:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Tocca l'icona <Share2 className="inline h-4 w-4" /> in basso (o in alto) nella barra di Safari
                </li>
                <li>
                  Scorri verso il basso e tocca <strong>Aggiungi a Home</strong>
                </li>
                <li>
                  Tocca <strong>Aggiungi</strong> nell'angolo in alto a destra
                </li>
                <li>
                  <strong>Importante:</strong> Ora vai alla schermata Home e tocca l'icona "Calcetto App" appena creata
                </li>
              </ol>
              <div className="rounded-md bg-blue-50 p-4 text-blue-800 border border-blue-200 mt-4">
                <p className="font-medium">Attenzione!</p>
                <p className="text-sm mt-1">
                  Non aprire l'app tramite link o preferiti. Devi toccare l'icona nella schermata Home.
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsVisible(false)}>
            Ho capito
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
