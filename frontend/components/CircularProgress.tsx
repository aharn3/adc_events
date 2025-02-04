interface CircularProgressProps {
    value: number
    maxValue: number
  }
  
  export function CircularProgress({ value, maxValue }: CircularProgressProps) {
    const percentage = (value / maxValue) * 100
    const circumference = 2 * Math.PI * 90 // radius is 90
    const strokeDashoffset = circumference - (percentage / 100) * circumference
  
    return (
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="transform -rotate-90 w-64 h-64">
          {/* Background circle */}
          <circle cx="128" cy="128" r="90" fill="transparent" stroke="#1e293b" strokeWidth="12" />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            fill="transparent"
            stroke="#01a3fe"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-bold">{value}</span>
          <span className="text-gray-400">/ {maxValue}</span>
          <span className="text-sm text-gray-400 mt-2">Total Points</span>
        </div>
      </div>
    )
  }
  
  