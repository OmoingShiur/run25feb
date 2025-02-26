export interface Champion {
  id: string
  name: string
  class: string
  image: string
}

export type ChampionClass = "Fighter" | "Tank" | "Assassin" | "Mage" | "Support" | "Marksman"

