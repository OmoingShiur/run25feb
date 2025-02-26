"use client"

import { useState, useMemo } from "react"
import { champions, championClasses } from "@/data/champions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"

interface ChampionGridProps {
  onChampionSelect: (championId: string) => void;
  selectedChampion: string | null;
  usedChampions: string[];
}

interface SelectableChampionProps {
  champion: any;
  onSelect: (championId: string) => void;
  selectedChampion: string | null;
  usedChampions: string[];
}

const SelectableChampion: React.FC<SelectableChampionProps> = ({ champion, onSelect, selectedChampion, usedChampions }) => {
  const isSelected = selectedChampion === champion.id;
  const isUsed = usedChampions.includes(champion.id);

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-14 h-14 cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105 ${
          isSelected ? "ring-2 ring-yellow-400" : ""
        } ${isUsed ? "opacity-40 bg-gray-700" : "bg-zinc-900"}`}
        onClick={(e) => {
          e.preventDefault();
          if (!isUsed && selectedChampion !== champion.id) {
            onSelect(champion.id);
          }
        }}
      >
        <Image
          src={champion.image || "/placeholder.svg"}
          alt={champion.name}
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`mt-1 text-center text-xs font-medium ${isSelected ? "text-yellow-400" : isUsed ? "text-gray-500" : "text-white"}`}>
        {champion.name}
      </div>
    </div>
  );
};

export function ChampionGrid({ onChampionSelect, selectedChampion, usedChampions = [] }: ChampionGridProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChampions = useMemo(() => {
    return champions
      .filter(
        (champion) =>
          (selectedClass ? champion.class.includes(selectedClass) : true) &&
          champion.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const search = searchTerm.toLowerCase();

        const aStartsWith = aName.startsWith(search) ? -1 : 0;
        const bStartsWith = bName.startsWith(search) ? -1 : 0;

        // Prioritize champions that start with the search term
        return aStartsWith - bStartsWith || aName.indexOf(search) - bName.indexOf(search);
      });
  }, [selectedClass, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative w-[620px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search champions..."
            className="w-full pl-10 bg-gray-900 border-gray-700 h-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          {championClasses.map((classType) => (
            <button
              key={classType.name}
              onClick={() => setSelectedClass(classType.name === selectedClass ? null : classType.name)}
              className="p-0 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img 
                src={classType.name === selectedClass ? classType.icon.replace('.png', 'blue.png') : classType.icon || "/placeholder.svg"} 
                alt={classType.name} 
                className="w-8 h-8 transition-transform hover:scale-110" 
              />
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 h-[400px] overflow-y-auto">
        {filteredChampions.map((champion) => (
          <SelectableChampion 
            key={champion.id} 
            champion={champion} 
            onSelect={onChampionSelect}
            selectedChampion={selectedChampion}
            usedChampions={usedChampions}
          />
        ))}
      </div>
    </div>
  );
}