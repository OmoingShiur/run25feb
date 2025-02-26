export function DraftPositions() {
  const positions = [
    { blue: "B1", red: "R1" },
    { blue: "B2", red: "R2" },
    { blue: "B3", red: "R3" },
    { blue: "B4", red: "R4" },
    { blue: "B5", red: "R5" },
  ]

  return (
    <div className="flex justify-between px-4">
      <div className="space-y-4">
        {positions.map((pos) => (
          <div
            key={pos.blue}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-blue-400"
          >
            {pos.blue}
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {positions.map((pos) => (
          <div
            key={pos.red}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-red-400"
          >
            {pos.red}
          </div>
        ))}
      </div>
    </div>
  )
}

