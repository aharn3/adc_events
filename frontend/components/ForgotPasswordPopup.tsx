import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ForgotPasswordPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordPopup({ isOpen, onClose }: ForgotPasswordPopupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Here you would typically send a request to your backend
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-6 rounded-lg w-full max-w-md">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Forgot Password</h2>
            <Input
              type="email"
              placeholder="Type in email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border rounded-lg px-4 py-3 w-full text-white placeholder:text-gray-400"
              required
            />
            <Button type="submit" className="w-full bg-[#01a3fe] text-white rounded-full py-3 hover:bg-[#01a3fe]/90">
              Submit
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-white mb-4">New password has been sent to your email. Check your spam folder.</p>
            <Button onClick={onClose} className="bg-[#01a3fe] text-white rounded-full py-3 px-6 hover:bg-[#01a3fe]/90">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

