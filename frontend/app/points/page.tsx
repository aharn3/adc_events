"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { CircularProgress } from "@/components/CircularProgress"

interface Event {
  id: string
  title: string
  date: string
  points: number
}

export default function PointsPage() {
  const [totalPoints, setTotalPoints] = useState(0)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Load attended events from localStorage
    const attendedEvents = JSON.parse(localStorage.getItem("attendedEvents") || "[]")
    setEvents(attendedEvents)

    // Calculate total points from attended events only
    const calculatedTotal = attendedEvents.reduce((sum: number, event: Event) => sum + event.points, 0)
    setTotalPoints(calculatedTotal)
  }, [])

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-12">
          <CircularProgress value={totalPoints} maxValue={1000} />
        </div>

        <h2 className="text-2xl font-bold mb-6">Event Attendance History</h2>

        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="bg-gray-800 text-white">
                <CardContent className="flex justify-between items-center p-6">
                  <div>
                    <h3 className="font-semibold mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-400">{event.date}</p>
                  </div>
                  <span className="text-[#01a3fe] font-bold">+{event.points}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            No events attended yet. Register for an event to start earning points!
          </div>
        )}
      </div>
    </div>
  )
}

