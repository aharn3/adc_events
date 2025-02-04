"use client"
import "tailwindcss";
import React from 'react';
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Event {
  id: string
  title: string
  date: string
  location: string
  description: string
  points: number
}

const allEvents: Event[] = [
  {
    id: "1",
    title: "Tech Talk: AI in Healthcare",
    date: "June 15, 2023",
    location: "Iribe Center 1122",
    description: "Join us for an insightful discussion on the applications of AI in modern healthcare.",
    points: 100,
  },
  {
    id: "2",
    title: "Hackathon: Sustainability Solutions",
    date: "July 1-2, 2023",
    location: "ESJ 1224",
    description: "A 24-hour hackathon focused on developing innovative solutions for environmental sustainability.",
    points: 200,
  },
  {
    id: "3",
    title: "Workshop: Intro to React",
    date: "July 10, 2023",
    location: "Online (Zoom)",
    description: "Learn the basics of React in this hands-on workshop. Perfect for beginners!",
    points: 150,
  },
]

export function ActiveEventPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [code, setCode] = useState("")
  const [availableEvents, setAvailableEvents] = useState<Event[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load attended events from localStorage
    const attendedEvents = JSON.parse(localStorage.getItem("attendedEvents") || "[]")

    // Filter out already attended events
    const filteredEvents = allEvents.filter(
      (event) => !attendedEvents.some((attendedEvent: Event) => attendedEvent.id === event.id),
    )

    setAvailableEvents(filteredEvents)
  }, [])

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setShowPopup(true)
  }

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code === "123456" && selectedEvent) {
      // Replace with actual code verification logic
      // In a real application, this would be an API call to update the user's attended events
      const attendedEvents = JSON.parse(localStorage.getItem("attendedEvents") || "[]")
      const newEvent = {
        ...selectedEvent,
        date: new Date().toLocaleDateString(), // Use current date as attendance date
      }

      // Check if event is already attended (shouldn't happen, but just in case)
      if (!attendedEvents.some((event: Event) => event.id === selectedEvent.id)) {
        attendedEvents.push(newEvent)
        localStorage.setItem("attendedEvents", JSON.stringify(attendedEvents))

        // Remove the registered event from available events
        setAvailableEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id))
      }

      setShowPopup(false)
      router.push("/points")
    } else {
      alert("Incorrect code. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Active Events</h1>
      {availableEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableEvents.map((event) => (
            <Card key={event.id} className="bg-gray-800 text-white">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {event.date} - {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{event.description}</p>
                <p className="mb-4 font-bold text-[#01a3fe]">{event.points} points</p>
                <Button className="w-full bg-[#01a3fe] hover:bg-[#01a3fe]/90" onClick={() => handleRegister(event)}>
                  Register
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No active events available. Check back later for new events!</div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Register for {selectedEvent?.title}</h2>
            <form onSubmit={handleSubmitCode} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-transparent border rounded-lg px-4 py-3 w-full text-white placeholder:text-gray-400"
                maxLength={6}
                required
              />
              <Button type="submit" className="w-full bg-[#01a3fe] text-white rounded-full py-3 hover:bg-[#01a3fe]/90">
                Submit
              </Button>
            </form>
            <Button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full bg-gray-600 text-white rounded-full py-3 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

