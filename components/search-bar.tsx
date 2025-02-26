import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="relative flex-1 mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input type="search" placeholder="Search champions..." className="w-full pl-10 bg-gray-900 border-gray-700" />
    </div>
  )
}

