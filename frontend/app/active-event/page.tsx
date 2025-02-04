import { Navigation } from "@/components/Navigation"
import { ActiveEventPage } from "@/components/ActiveEventPage"

export default function ActiveEvent() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col">
      <Navigation />
      <ActiveEventPage />
    </div>
  )
}

