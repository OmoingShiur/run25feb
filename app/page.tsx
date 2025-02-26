"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { ChampionGrid } from "@/components/champion-grid"
import { champions } from "@/data/champions"
//import { DndProvider, useDrag, useDrop } from "react-dnd" // Removed drag and drop
//import { HTML5Backend } from "react-dnd-html5-backend" // Removed drag and drop

type PickSlot = {
  position: string
  championId: string | null
}

type BanSlot = {
  side: "blue" | "red"
  championId: string | null
}

const initialPicks: PickSlot[] = [
  { position: "B1", championId: null },
  { position: "B2", championId: null },
  { position: "B3", championId: null },
  { position: "B4", championId: null },
  { position: "B5", championId: null },
  { position: "R1", championId: null },
  { position: "R2", championId: null },
  { position: "R3", championId: null },
  { position: "R4", championId: null },
  { position: "R5", championId: null },
]

const initialBans: BanSlot[] = [
  { side: "blue", championId: null },
  { side: "blue", championId: null },
  { side: "blue", championId: null },
  { side: "blue", championId: null },
  { side: "blue", championId: null },
  { side: "red", championId: null },
  { side: "red", championId: null },
  { side: "red", championId: null },
  { side: "red", championId: null },
  { side: "red", championId: null },
]

const draftOrder = [
  "blueBan1", // First ban phase (3 each)
  "redBan1",
  "blueBan2",
  "redBan2",
  "blueBan3",
  "redBan3",
  "B1", // First pick phase
  "R1",
  "R2",
  "B2",
  "B3",
  "R3",
  "redBan4", // Second ban phase
  "blueBan4",
  "redBan5",
  "blueBan5",
  "R4", // Final pick phase
  "B4",
  "B5",
  "R5",
]


const SelectableSlot = ({ slot, onSelect, children, isActive, isDraftMode, selectedChampion }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (slot.championId) {
      onSelect(slot.championId, e.button === 2);
    } else if (selectedChampion) {
      onSelect(slot, selectedChampion, e.button);
    }
  };

  const isSelected = selectedChampion === slot.championId;

  return (
    <div
      className={`w-20 h-20 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer ${
        isActive ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {children || <Shield className="w-10 h-10 text-gray-700" />}
    </div>
  )
}

export default function DraftingPage() {
  const [inviteLink, setInviteLink] = useState("")
  const [picks, setPicks] = useState<PickSlot[]>(initialPicks)
  const [bans, setBans] = useState<BanSlot[]>(initialBans)
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null)
  const [currentDraftIndex, setCurrentDraftIndex] = useState(0)
  const [isDraftMode, setIsDraftMode] = useState(false)
  const [showDraftModal, setShowDraftModal] = useState(false)
  const [showTimerSettings, setShowTimerSettings] = useState(false)
  const [draftMode, setDraftMode] = useState<'solo' | 'pvp' | null>(null)
  const [selectedSide, setSelectedSide] = useState<'blue' | 'red' | null>(null)

  const handleSelectSide = (side: 'blue' | 'red') => {
    setSelectedSide(side);
    handleGenerateInvite();
  };
  const [pickTimer, setPickTimer] = useState(30)
  const [banTimer, setBanTimer] = useState(20)
  const [currentTimer, setCurrentTimer] = useState(0)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartDraft = () => {
    setIsDraftMode(true)
    setShowDraftModal(false)
    setCurrentTimer(draftOrder[currentDraftIndex].includes('Ban') ? banTimer : pickTimer)
  }

  const handleLeaveDraft = () => {
    setIsDraftMode(false);
    setCurrentDraftIndex(0);
    setCurrentTimer(0);
    setPicks(initialPicks);
    setBans(initialBans);
    setSelectedChampion(null);
    setShowDraftModal(false);
    setShowTimerSettings(false);
    setDraftMode(null);
    setSelectedSide(null);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isDraftMode && currentTimer > 0) {
      timer = setInterval(() => {
        setCurrentTimer(prev => {
          if (prev <= 1) {
            // Auto-select if time runs out
            if (selectedChampion) {
              handleLockIn()
            }
            return draftOrder[currentDraftIndex + 1]?.includes('Ban') ? banTimer : pickTimer
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isDraftMode, currentTimer, currentDraftIndex])

  useEffect(() => {
    if (isDraftMode && currentDraftIndex < draftOrder.length) {
      setCurrentTimer(draftOrder[currentDraftIndex].includes('Ban') ? banTimer : pickTimer)
    }
  }, [currentDraftIndex])

  const handleDiscordClick = () => {
    window.open("https://discord.gg/your-invite-link", "_blank")
  }

  const handleGenerateInvite = () => {
    const newInviteLink = `https://yourdomain.com/invite/${Math.random().toString(36).substr(2, 9)}`
    setInviteLink(newInviteLink)
    navigator.clipboard.writeText(newInviteLink)
    alert(`Invite link generated and copied to clipboard: ${newInviteLink}`)
  }

  const handleChampionSelect = useCallback((championId: string) => {
    setSelectedChampion(prev => prev === championId ? null : championId)
  }, [])

  const getCurrentSlot = useCallback(() => {
    const currentAction = draftOrder[currentDraftIndex]
    if (currentAction.startsWith("blue") || currentAction.startsWith("red")) {
      return bans.find((ban) => ban.side === currentAction.slice(0, -4) && ban.championId === null)
    } else {
      return picks.find((pick) => pick.position === currentAction)
    }
  }, [currentDraftIndex, bans, picks])

  const getUsedChampions = useCallback(() => {
    const pickChamps = picks.map(p => p.championId).filter(Boolean);
    const banChamps = bans.map(b => b.championId).filter(Boolean);
    return [...pickChamps, ...banChamps];
  }, [picks, bans]);
  const lockInRandomChampion = () => {
    if (selectedChampion) return; // Prevent selecting another champion if one is already picked

    const availableChampions = champions
      .map(champ => champ.id)
      .filter(id => !getUsedChampions().includes(id)); // Exclude already picked/banned champions

    if (availableChampions.length === 0) return; // Safety check: No available champions left

    const randomChampion = availableChampions[Math.floor(Math.random() * availableChampions.length)];

    console.log("Auto-locking random champion:", randomChampion);

    setSelectedChampion(randomChampion); // Temporarily select it

    setTimeout(() => {
      if (selectedChampion === randomChampion || !selectedChampion) {
        handleLockIn(); // Ensure only one champion is locked
      }
    }, 50); // Delay ensures correct champion is locked
  };

  const handleLockIn = useCallback(() => {
    if (!selectedChampion || !isDraftMode) return; // Ensure a champion is selected

    const slot = draftOrder[currentDraftIndex];
    const usedChampions = getUsedChampions();

    // Prevent duplicate champion selection
    if (usedChampions.includes(selectedChampion)) {
      console.log("Champion already used, selecting another.");
      setSelectedChampion(null);
      return;
    }

    if (slot.includes('Ban')) {
      const side = slot.startsWith("blue") ? "blue" : "red"; // Determine side
      setBans(prev => {
        const newBans = [...prev];
        const banIndex = newBans.findIndex(ban => ban.side === side && ban.championId === null);

        if (banIndex !== -1) {
          newBans[banIndex] = { ...newBans[banIndex], championId: selectedChampion };
        }
        return newBans;
      });
    } else {
      setPicks(prev => prev.map(pick => 
        pick.position === slot ? { ...pick, championId: selectedChampion } : pick
      ));
    }

    console.log("Locked in champion:", selectedChampion, "for slot:", slot);

    setSelectedChampion(null); // Clear selection after locking in
    setCurrentDraftIndex(prev => prev + 1);
  }, [selectedChampion, currentDraftIndex, isDraftMode, draftOrder, picks, bans]);

  useEffect(() => {
    if (isDraftMode && currentTimer === 0) {
      setTimeout(() => {
        if (!selectedChampion) {
          lockInRandomChampion(); // If no champion is selected, auto-pick one
        } else {
          handleLockIn(); // Otherwise, lock in the selected one
        }
      }, 50); // Small delay ensures only one champion gets locked
    }
  }, [currentTimer, selectedChampion, isDraftMode]);



  const handleResetDraft = useCallback(() => {
    setPicks(initialPicks.map(pick => ({ ...pick, championId: null })))
    setBans(initialBans.map(ban => ({ ...ban, championId: null })))
    setSelectedChampion(null)
    setCurrentDraftIndex(0)
    setIsDraftMode(false)
  }, [initialPicks, initialBans])

  const toggleDraftMode = useCallback(() => {
    if (!isDraftMode) {
      setPicks(initialPicks)
      setCurrentDraftIndex(0)
    }
    setIsDraftMode((prev) => !prev)
  }, [isDraftMode])


  const handleSelect = useCallback((slot: PickSlot | BanSlot | string, championId: string | null, button?: number) => {
    const usedChampions = getUsedChampions();
    if (typeof slot === 'string') {
      // Only allow selecting from pool if champion isn't already picked/banned
      const usedChampions = getUsedChampions();
      if (!usedChampions.includes(slot)) {
        setSelectedChampion(prev => prev === slot ? null : slot);
      }
      return;
    }

    if (button === 2) { // Right click to clear slot
      if (!isDraftMode) {
        if ("position" in slot) {
          setPicks(prev => prev.map(pick => 
            pick.position === slot.position ? { ...pick, championId: null } : pick
          ));
        } else {
          setBans(prev => prev.map(ban => 
            ban === slot ? { ...ban, championId: null } : ban
          ));
        }
      }
      return;
    }

    // Clicking on a slot
    if ("position" in slot) {
      if (selectedChampion && !slot.championId) {
        // Place the selected champion
        setPicks(prev => prev.map(pick => 
          pick.position === slot.position ? { ...pick, championId: selectedChampion } : pick
        ));
        if (!isDraftMode) {
          setSelectedChampion(null);
        }
      }
    } else {
      if (selectedChampion && !slot.championId) {
        setBans(prev => prev.map(ban => 
          ban === slot ? { ...ban, championId: selectedChampion } : ban
        ));
        if (!isDraftMode) {
          setSelectedChampion(null);
        }
      }
    }
  }, [selectedChampion, isDraftMode, getUsedChampions]);

  const handleRemoveChampion = useCallback((event: React.MouseEvent, position: string) => {
    event.preventDefault();
    setPicks(prev => prev.map(pick => 
      pick.position === position ? { ...pick, championId: null } : pick
    ));
    setBans(prev => prev.map(ban => 
      ban.side === position ? { ...ban, championId: null } : ban
    ));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-800">
          <a
            href="https://discord.gg/your-invite-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
          <h1 className="text-2xl font-bold ml-8">Drafting Mobile Legends</h1>
          <div 
            className="w-24 text-center py-2 text-xl font-bold tracking-wider text-white cursor-pointer hover:text-blue-400"
            onClick={() => {
              //Add your login logic here.
            }}
          >
            LOG IN
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Team headers */}
          <div className="grid grid-cols-2 mb-8 text-center text-2xl font-bold">
            <div className="bg-blue-600 py-2">BLUE SIDE</div>
            <div className="bg-red-500 py-2">RED SIDE</div>
          </div>

          {/* Bans section with Tournament Draft button */}
          <div className="grid grid-cols-[1fr_auto_auto_1fr] gap-4 mb-8 items-center">
            {/* Blue side bans */}
            <div className="flex gap-2 justify-start">
              {bans
                .filter((ban) => ban.side === "blue")
                .map((ban, i) => (
                  <SelectableSlot
                    key={`blue-ban-${i}`}
                    slot={ban}
                    onSelect={handleSelect}
                    isActive={isDraftMode && draftOrder[currentDraftIndex] === `blueBan${i + 1}`}
                    isDraftMode={isDraftMode}
                    selectedChampion={selectedChampion}
                  >
                    {ban.championId && (
                      <div 
                        className="w-full h-full relative bg-zinc-900 rounded-lg overflow-hidden"
                        onContextMenu={(e) => handleRemoveChampion(e, ban.side)}
                      >
                        <Image
                          src={champions.find((c) => c.id === ban.championId)?.image || "/placeholder.svg"}
                          alt={champions.find((c) => c.id === ban.championId)?.name || ""}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </SelectableSlot>
                ))}
            </div>
            {/* Tournament Draft section with timer */}
            <div className="flex flex-col items-center gap-2">
              {isDraftMode && (
                <div className="text-2xl font-bold">
                  {formatTime(currentTimer)}
                </div>
              )}
              {(!isDraftMode || draftMode === 'solo') && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  onClick={() => !isDraftMode ? setShowDraftModal(true) : handleLeaveDraft()}
                >
                  {isDraftMode ? "Leave Draft" : "Versus Mode"}
                </Button>
              )}
            </div>
            {/* Draft Mode Modal */}
            {showDraftModal && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={(e) => e.target === e.currentTarget && setShowDraftModal(false)}
              >
                <div className="bg-zinc-800 p-6 rounded-lg w-80 relative">
                  <button 
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => setShowDraftModal(false)}
                  >
                    ✕
                  </button>
                  <h3 className="text-xl font-bold mb-4">Select Mode</h3>
                  {!showTimerSettings ? (
                    <div className="space-y-4">
                      <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={() => {
                          setDraftMode('solo');
                          setShowTimerSettings(true);
                        }}
                      >
                        Practice Mode
                      </button>
                      <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={() => {
                          setDraftMode('pvp');
                          setShowTimerSettings(true);
                        }}
                      >
                        Invite Opponent
                      </button>
                    </div>
                  ) : draftMode === 'pvp' ? (
                    <div className="space-y-4">
                      <div className="flex gap-2 mb-4">
                        <button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                          onClick={() => handleSelectSide('blue')}
                        >
                          Blue Side
                        </button>
                        <button 
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                          onClick={() => handleSelectSide('red')}
                        >
                          Red Side
                        </button>
                      </div>
                      <div className="relative">
                        <input 
                          type="text"
                          readOnly
                          value={inviteLink}
                          className="w-full p-2 bg-zinc-700 rounded pr-20"
                          placeholder="Generate invite link..."
                        />
                        <button 
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                          onClick={handleGenerateInvite}
                        >
                          Copy
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Pick Phase Time (seconds)</label>
                        <input 
                          type="number" 
                          className="w-full p-2 bg-zinc-700 rounded"
                          value={pickTimer}
                          onChange={(e) => setPickTimer(Number(e.target.value))}
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Ban Phase Time (seconds)</label>
                        <input 
                          type="number" 
                          className="w-full p-2 bg-zinc-700 rounded"
                          value={banTimer}
                          onChange={(e) => setBanTimer(Number(e.target.value))}
                          min="1"
                        />
                      </div>
                      <button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                        onClick={handleStartDraft}
                      >
                        Start Draft
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">Pick Phase Time (seconds)</label>
                        <input 
                          type="number" 
                          className="w-full p-2 bg-zinc-700 rounded"
                          value={pickTimer}
                          onChange={(e) => setPickTimer(Number(e.target.value))}
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Ban Phase Time (seconds)</label>
                        <input 
                          type="number" 
                          className="w-full p-2 bg-zinc-700 rounded"
                          value={banTimer}
                          onChange={(e) => setBanTimer(Number(e.target.value))}
                          min="1"
                        />
                      </div>
                      <button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                        onClick={handleStartDraft}
                      >
                        Start Draft
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Reset Draft button */}
            <button
              onClick={handleResetDraft}
              title="Reset Draft"
              className="p-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            {/* Red side bans */}
            <div className="flex gap-2 justify-end">
              {bans
                .filter((ban) => ban.side === "red")
                .map((ban, i) => (
                  <SelectableSlot
                    key={`red-ban-${i}`}
                    slot={ban}
                    onSelect={handleSelect}
                    isActive={isDraftMode && draftOrder[currentDraftIndex] === `redBan${i + 1}`}
                    isDraftMode={isDraftMode}
                    selectedChampion={selectedChampion}
                  >
                    {ban.championId && (
                      <div 
                        className="w-full h-full relative bg-zinc-900 rounded-lg overflow-hidden"
                        onContextMenu={(e) => handleRemoveChampion(e, ban.side)}
                      >
                        <Image
                          src={champions.find((c) => c.id === ban.championId)?.image || "/placeholder.svg"}
                          alt={champions.find((c) => c.id === ban.championId)?.name || ""}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </SelectableSlot>
                ))}
            </div>
          </div>

          {/* Draft grid */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-8">
            {/* Blue side */}
            <div className="space-y-4">
              {picks.slice(0, 5).map((pick) => (
                <div key={pick.position} className="flex items-center gap-4">
                  <div className="text-blue-400 font-bold text-3xl w-12 text-right">{pick.position}</div>
                  <SelectableSlot
                    slot={pick}
                    onSelect={handleSelect}
                    isActive={isDraftMode && draftOrder[currentDraftIndex] === pick.position}
                    isDraftMode={isDraftMode}
                    selectedChampion={selectedChampion}
                  >
                    {pick.championId && (
                      <div 
                        className="w-full h-full relative bg-zinc-900 rounded-lg overflow-hidden"
                        onContextMenu={(e) => handleRemoveChampion(e, pick.position)}
                      >
                        <Image
                          src={champions.find((c) => c.id === pick.championId)?.image || "/placeholder.svg"}
                          alt={champions.find((c) => c.id === pick.championId)?.name || ""}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </SelectableSlot>
                </div>
              ))}
            </div>

            {/* Center section */}
            <div className="w-[720px]">
              {/* Champion Pool */}
              <ChampionGrid 
                onChampionSelect={handleSelect} 
                selectedChampion={selectedChampion}
                usedChampions={getUsedChampions()}
              /> {/*Removed DraggableComponent*/}
              <div 
                onClick={handleLockIn} 
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleLockIn();
                  }
                }} 
                tabIndex={0} // Makes it focusable for keyboard events
                className={`mt-4 w-full text-center py-2 text-xl font-bold tracking-wider 
                  ${(!selectedChampion || !isDraftMode) ? 'text-gray-500 cursor-not-allowed' : 'text-white cursor-pointer hover:text-blue-400'}`}
              >            
                Lock In
              </div>
             
            </div>

            {/* Red side */}
            <div className="space-y-4">
              {picks.slice(5).map((pick) => (
                <div key={pick.position} className="flex items-center gap-4 justify-end">
                  <SelectableSlot
                    slot={pick}
                    onSelect={handleSelect}
                    isActive={isDraftMode && draftOrder[currentDraftIndex] === pick.position}
                    isDraftMode={isDraftMode}
                    selectedChampion={selectedChampion}
                  >
                    {pick.championId && (
                      <div 
                        className="w-full h-full relative bg-zinc-900 rounded-lg overflow-hidden"
                        onContextMenu={(e) => handleRemoveChampion(e, pick.position)}
                      >
                        <Image
                          src={champions.find((c) => c.id === pick.championId)?.image || "/placeholder.svg"}
                          alt={champions.find((c) => c.id === pick.championId)?.name || ""}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </SelectableSlot>
                  <div className="text-red-400 font-bold text-3xl w-12 text-left">{pick.position}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}