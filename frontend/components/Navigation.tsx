"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLoginClick = () => {
    // Add any logout logic here (clear session, cookies, etc.)
    router.push("/")
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black/20 backdrop-blur-sm">
      <button
        onClick={handleLoginClick}
        className={`px-6 py-2 rounded-md text-sm font-medium ${pathname === "/" ? "bg-[#01a3fe]" : "text-white/70"}`}
      >
        LOG IN
      </button>
      <Link
        href="/active-event"
        className={`px-6 py-2 rounded-md text-sm font-medium ${pathname === "/active-event" ? "bg-[#01a3fe]" : "text-white/70"}`}
      >
        ACTIVE EVENT
      </Link>
      <Link
        href="/points"
        className={`px-6 py-2 rounded-md text-sm font-medium ${pathname === "/points" ? "bg-[#01a3fe]" : "text-white/70"}`}
      >
        POINTS
      </Link>
    </nav>
  )
}

