"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface Match {
  id: number
  date: Date
  organizer: string
  currentParticipants: number
  totalParticipants: number
  location: string
}

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const isFull = match.currentParticipants >= match.totalParticipants

  const handleParticipate = (e: React.MouseEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to join the match
    alert(`Hai partecipato alla partita del ${formatDate(match.date)}!`)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{formatDate(match.date)}</CardTitle>
          <Badge variant={isFull ? "destructive" : "secondary"} className="font-medium">
            {isFull ? "Completo" : "Posti disponibili"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-green-600" />
            <span className="font-medium">
              {match.currentParticipants}/{match.totalParticipants} partecipanti
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-green-600" />
            <span>{match.date.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-600" />
            <span>{match.location}</span>
          </div>
          <div className="text-sm mt-2">
            <span className="text-muted-foreground">Organizzatore:</span> {match.organizer}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <Button
          className="w-full"
          variant={isFull ? "outline" : "default"}
          disabled={isFull}
          onClick={handleParticipate}
        >
          {isFull ? "Partita completa" : "Partecipa"}
        </Button>
      </CardFooter>
    </Card>
  )
}
