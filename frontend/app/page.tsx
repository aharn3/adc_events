"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { ForgotPasswordPopup } from "@/components/ForgotPasswordPopup"
import { Navigation } from "@/components/Navigation"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the login credentials
    // For now, we'll just redirect to the Active Event page
    router.push("/active-event")
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-8">
        {/* Logo */}
        <div className="w-32 h-32 bg-[#01a3fe] rounded-2xl flex items-center justify-center mb-4">
          <div className="text-2xl font-mono text-white">&lt;ADC/&gt;</div>
        </div>

        <h1 className="text-2xl font-bold mb-12">ADC EVENTS LOGIN</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4 max-w-md">
          <div className="relative">
            <Input
              type="text"
              placeholder="Directory ID"
              className="bg-transparent border rounded-lg px-4 py-3 w-full text-white placeholder:text-gray-400"
              defaultValue="@terpmail.umd.edu"
            />
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              className="bg-transparent border rounded-lg px-4 py-3 w-full text-white placeholder:text-gray-400"
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70">
              <Eye className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-right">
            <button type="button" onClick={() => setIsPopupOpen(true)} className="text-[#01a3fe] text-sm">
              Forgot Password
            </button>
          </div>

          <Button type="submit" className="w-full bg-[#01a3fe] text-white rounded-full py-6 hover:bg-[#01a3fe]/90">
            Login
          </Button>
        </form>
      </main>

      {/* Decorative Lines */}
      <div className="h-40 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-[1px] bg-white/20" />
          <div className="w-32 h-[1px] bg-white/40 transform -rotate-45" />
          <div className="w-16 h-[1px] bg-white/60" />
        </div>
      </div>

      {/* Forgot Password Popup */}
      <ForgotPasswordPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  )
}

