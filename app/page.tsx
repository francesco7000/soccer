"use client"

import { useEffect } from "react"
import { MatchCard } from "@/components/match-card"
import { CreateMatchButton } from "@/components/create-match-button"
import { InstallPrompt } from "@/components/install-prompt"
import { IOSInstallGuide } from "@/components/ios-install-guide"
import { WaveBackground } from "@/components/ui/wave-background"

export default function Home() {
  // Hide splash screen after page loads
  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen")
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.style.opacity = "0"
        setTimeout(() => {
          splashScreen.style.display = "none"
        }, 500)
      }, 1000)
    }

    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope)

            // Check if there's an update and activate it
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    // New service worker is installed but waiting
                    newWorker.postMessage({ type: "SKIP_WAITING" })
                  }
                })
              }
            })
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err)
          },
        )

        // Handle service worker updates
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.location.reload()
        })
      })
    }

    // Prevent opening links in external browsers
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        e.preventDefault()
        window.location.href = link.href
      }
    })
  }, [])

  return (
    <div id="app-container" className="bg-background-light dark:bg-background-dark relative">
      <WaveBackground />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-color bg-clip-text text-transparent">Le Tue Partite</h1>
          <CreateMatchButton />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, index) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </main>
      <InstallPrompt />
      <IOSInstallGuide />
    </div>
  )
}

// Sample data - in a real app this would come from a database
const matches = [
  {
    id: 1,
    date: new Date(2025, 3, 15, 18, 0),
    organizer: "Marco Rossi",
    currentParticipants: 8,
    totalParticipants: 10,
    location: "Campo Sportivo Roma Nord",
  },
  {
    id: 2,
    date: new Date(2025, 3, 18, 20, 30),
    organizer: "Luigi Verdi",
    currentParticipants: 6,
    totalParticipants: 10,
    location: "Centro Sportivo Milano",
  },
  {
    id: 3,
    date: new Date(2025, 3, 20, 19, 0),
    organizer: "Giovanni Bianchi",
    currentParticipants: 10,
    totalParticipants: 10,
    location: "Stadio Comunale Napoli",
  },
  {
    id: 4,
    date: new Date(2025, 3, 22, 17, 30),
    organizer: "Paolo Neri",
    currentParticipants: 4,
    totalParticipants: 10,
    location: "Campo Sportivo Torino",
  },
]
