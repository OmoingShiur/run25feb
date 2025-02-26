import type { Champion, ChampionClass } from "@/types/champion"

export const champions: Champion[] = [
  // A
  { id: "hero1", name: "Aamon", class: ["Assassin"], image: "/images/champions/aamon.png" },
  { id: "hero3", name: "Akai", class: ["Tank"], image: "/images/champions/akai.png" },
  { id: "hero2", name: "Aldous", class: ["Fighter"], image: "/images/champions/aldous.png" },
  { id: "hero4", name: "Alice", class: ["Mage"], image: "/images/champions/alice.png" },
  { id: "hero5", name: "Alpha", class: ["Fighter"], image: "/images/champions/alpha.png" },
  { id: "hero6", name: "Alucard", class: ["Fighter"], image: "/images/champions/alucard.png" },
  { id: "hero7", name: "Angela", class: ["Support"], image: "/images/champions/angela.png" },
  { id: "hero10", name: "Argus", class: ["Fighter"], image: "/images/champions/argus.png" },
  { id: "hero9", name: "Arlott", class: ["Fighter"], image: "/images/champions/arlott.png" },
  { id: "hero11", name: "Atlas", class: ["Tank"], image: "/images/champions/atlas.png" },
  { id: "hero8", name: "Aulus", class: ["Fighter"], image: "/images/champions/aulus.png" },
  { id: "hero12", name: "Aurora", class: ["Mage"], image: "/images/champions/aurora.png" },

  // B
  { id: "hero14", name: "Badang", class: ["Fighter"], image: "/images/champions/badang.png" },
  { id: "hero13", name: "Balmond", class: ["Fighter"], image: "/images/champions/balmond.png" },
  { id: "hero15", name: "Bane", class: ["Fighter"], image: "/images/champions/bane.png" },
  { id: "hero17", name: "Barats", class: ["Tank"], image: "/images/champions/barats.png" },
  { id: "hero18", name: "Baxia", class: ["Tank"], image: "/images/champions/baxia.png" },
  { id: "hero19", name: "Beatrix", class: ["Marksman"], image: "/images/champions/beatrix.png" },
  { id: "hero20", name: "Belerick", class: ["Tank"], image: "/images/champions/belerick.png" },
  { id: "hero16", name: "Benedetta", class: ["Assassin"], image: "/images/champions/benedetta.png" },
  { id: "hero22", name: "Brody", class: ["Marksman"], image: "/images/champions/brody.png" },
  { id: "hero21", name: "Bruno", class: ["Marksman"], image: "/images/champions/bruno.png" },


  // C
  { id: "hero29", name: "Carmilla", class: ["Support"], image: "/images/champions/carmilla.png" },
  { id: "hero23", name: "Cecilion", class: ["Mage"], image: "/images/champions/cecilion.png" },
  { id: "hero26", name: "Chang'e", class: ["Mage"], image: "/images/champions/change.png" },
  { id: "hero25", name: "Chip", class: ["Support"], image: "/images/champions/chip.png" },
  { id: "hero27", name: "Chou", class: ["Fighter"], image: "/images/champions/chou.png" },
  { id: "hero24", name: "Cici", class: ["Fighter"], image: "/images/champions/cici.png" },
  { id: "hero28", name: "Claude", class: ["Marksman"], image: "/images/champions/claude.png" },
  { id: "hero119", name: "Clint", class: ["Marksman"], image: "/images/champions/clint.png" },
  { id: "hero30", name: "Cyclops", class: ["Mage"], image: "/images/champions/cyclops.png" },

  // D
  { id: "hero31", name: "Diggie", class: ["Support"], image: "/images/champions/diggie.png" },
  { id: "hero32", name: "Dyrroth", class: ["Fighter"], image: "/images/champions/dyrroth.png" },

  // E
  { id: "hero33", name: "Edith", class: ["Tank"], image: "/images/champions/edith.png" },
  { id: "hero125", name: "Esmeralda", class: ["Tank"], image: "/images/champions/esmeralda.png" },
  { id: "hero35", name: "Estes", class: ["Support"], image: "/images/champions/estes.png" },
   { id: "hero34", name: "Eudora", class: ["Mage"], image: "/images/champions/eudora.png" },

  // F
  { id: "hero36", name: "Fanny", class: ["Assassin"], image: "/images/champions/fanny.png" },
  { id: "hero124", name: "Faramis", class: ["Mage"], image: "/images/champions/faramis.png" },
  { id: "hero40", name: "Floryn", class: ["Support"], image: "/images/champions/floryn.png" },
  { id: "hero37", name: "Franco", class: ["Tank"], image: "/images/champions/franco.png" },
  { id: "hero39", name: "Fredrinn", class: ["Fighter"], image: "/images/champions/fredrinn.png" },
  { id: "hero38", name: "Freya", class: ["Fighter"], image: "/images/champions/freya.png" },

  // G
  { id: "hero41", name: "Gatotkaca", class: ["Tank"], image: "/images/champions/gatotkaca.png" },
  { id: "hero45", name: "Gloo", class: ["Tank"], image: "/images/champions/gloo.png" },
  { id: "hero42", name: "Gord", class: ["Mage"], image: "/images/champions/gord.png" },
  { id: "hero43", name: "Granger", class: ["Marksman"], image: "/images/champions/granger.png" },
  { id: "hero44", name: "Grock", class: ["Tank"], image: "/images/champions/grock.png" },
  { id: "hero46", name: "Guinevere", class: ["Fighter"], image: "/images/champions/guinevere.png" },
  { id: "hero47", name: "Gusion", class: ["Assassin"], image: "/images/champions/gusion.png" },

  // H
  { id: "hero48", name: "Hanabi", class: ["Marksman"], image: "/images/champions/hanabi.png" },
  { id: "hero49", name: "Hanzo", class: ["Assassin"], image: "/images/champions/hanzo.png" },
  { id: "hero51", name: "Harith", class: ["Mage"], image: "/images/champions/harith.png" },
  { id: "hero50", name: "Harley", class: ["Assassin"], image: "/images/champions/harley.png" },
  { id: "hero52", name: "Hayabusa", class: ["Assassin"], image: "/images/champions/hayabusa.png" },
  { id: "hero53", name: "Helcurt", class: ["Assassin"], image: "/images/champions/helcurt.png" },
  { id: "hero54", name: "Hilda", class: ["Fighter"], image: "/images/champions/hilda.png" },
  { id: "hero55", name: "Hylos", class: ["Tank"], image: "/images/champions/hylos.png" },

  // I
  { id: "hero56", name: "Irithel", class: ["Marksman"], image: "/images/champions/irithel.png" },
  { id: "hero57", name: "Ixia", class: ["Marksman"], image: "/images/champions/ixia.png" },

  // J
  { id: "hero58", name: "Jawhead", class: ["Fighter"], image: "/images/champions/jawhead.png" },
  { id: "hero59", name: "Johnson", class: ["Tank"], image: "/images/champions/johnson.png" },
  { id: "hero120", name: "Joy", class: ["Assassin"], image: "/images/champions/joy.png" },
  { id: "hero60", name: "Julian", class: ["Fighter"], image: "/images/champions/julian.png" },

  // K
  { id: "hero65", name: "Kadita", class: ["Mage"], image: "/images/champions/kadita.png" },
  { id: "hero61", name: "Kagura", class: ["Mage"], image: "/images/champions/kagura.png" },
  { id: "hero64", name: "Kaja", class: ["Support"], image: "/images/champions/kaja.png" },
  { id: "hero62", name: "Karina", class: ["Assassin"], image: "/images/champions/karina.png" },
  { id: "hero63", name: "Karrie", class: ["Marksman"], image: "/images/champions/karrie.png" },
  { id: "hero68", name: "Khaleed", class: ["Fighter"], image: "/images/champions/khaleed.png" },
  { id: "hero66", name: "Kimmy", class: ["Marksman"], image: "/images/champions/kimmy.png" },
  { id: "hero67", name: "Kalea", class: ["Support"], image: "/images/champions/kalea.png" },
  { id: "hero69", name: "Khufra", class: ["Tank"], image: "/images/champions/khufra.png" },

  // L
  { id: "hero70", name: "Lancelot", class: ["Assassin"], image: "/images/champions/lancelot.png" },
  { id: "hero71", name: "Lapu-Lapu", class: ["Fighter"], image: "/images/champions/lapulapu.png" },
  { id: "hero72", name: "Layla", class: ["Marksman"], image: "/images/champions/layla.png" },
  { id: "hero73", name: "Leomord", class: ["Fighter"], image: "/images/champions/leomord.png" },
  { id: "hero122", name: "Lesley", class: ["Marksman"], image: "/images/champions/lesley.png" },
  { id: "hero126", name: "Ling", class: ["Assassin"], image: "/images/champions/ling.png" },
  { id: "hero77", name: "Lolita", class: ["Support"], image: "/images/champions/lolita.png" },
  { id: "hero76", name: "Lukas", class: ["Fighter"], image: "/images/champions/lukas.png" },
  { id: "hero74", name: "Lunox", class: ["Mage"], image: "/images/champions/lunox.png" },
  { id: "hero127", name: "Luo yi", class: ["Mage"], image: "/images/champions/luoyi.png" },
  { id: "hero75", name: "Lylia", class: ["Mage"], image: "/images/champions/lylia.png" },

  // M
  { id: "hero79", name: "Martis", class: ["Fighter"], image: "/images/champions/martis.png" },
  { id: "hero78", name: "Masha", class: ["Fighter"], image: "/images/champions/masha.png" },
  { id: "hero80", name: "Mathilda", class: ["Support"], image: "/images/champions/mathilda.png" },
  { id: "hero81", name: "Melissa", class: ["Marksman"], image: "/images/champions/melissa.png" },
  { id: "hero82", name: "Miya", class: ["Marksman"], image: "/images/champions/miya.png" },
  { id: "hero83", name: "Minotaur", class: ["Tank"], image: "/images/champions/minotaur.png" },
  { id: "hero84", name: "Minsitthar", class: ["Fighter"], image: "/images/champions/minsitthar.png" },
  { id: "hero85", name: "Moskov", class: ["Marksman"], image: "/images/champions/moskov.png" },

  // N
  { id: "hero86", name: "Nana", class: ["Mage"], image: "/images/champions/nana.png" },
  { id: "hero87", name: "Natalia", class: ["Assassin"], image: "/images/champions/natalia.png" },
  { id: "hero88", name: "Natan", class: ["Marksman"], image: "/images/champions/natan.png" },
  { id: "hero90", name: "Nolan", class: ["Assassin"], image: "/images/champions/nolan.png" },
  { id: "hero89", name: "Novaria", class: ["Mage"], image: "/images/champions/novaria.png" },
  
  // O
  { id: "hero91", name: "Odette", class: ["Mage"], image: "/images/champions/odette.png" },

  // P
  { id: "hero92", name: "Paquito", class: ["Fighter"], image: "/images/champions/paquito.png" },
  { id: "hero93", name: "Pharsa", class: ["Mage"], image: "/images/champions/pharsa.png" },
  { id: "hero94", name: "Phoveus", class: ["Fighter"], image: "/images/champions/phoveus.png" },
  { id: "hero95", name: "Popol and Kupa", class: ["Marksman"], image: "/images/champions/popolandkupa.png" },

  // R
  { id: "hero96", name: "Rafaela", class: ["Support"], image: "/images/champions/rafaela.png" },
  { id: "hero97", name: "Roger", class: ["Fighter"], image: "/images/champions/roger.png" },
  { id: "hero98", name: "Ruby", class: ["Fighter"], image: "/images/champions/ruby.png" },

  // S
  { id: "hero99", name: "Saber", class: ["Assassin"], image: "/images/champions/saber.png" },
  { id: "hero100", name: "Selena", class: ["Assassin"], image: "/images/champions/selena.png" },
  { id: "hero101", name: "Silvanna", class: ["Fighter"], image: "/images/champions/silvanna.png" },
  { id: "hero102", name: "Sun", class: ["Fighter"], image: "/images/champions/sun.png" },
   { id: "hero128", name: "Suyou", class: ["Assassin"], image: "/images/champions/suyou.png" },

  // T
  { id: "hero103", name: "Tigreal", class: ["Tank"], image: "/images/champions/tigreal.png" },
  { id: "hero104", name: "Terizla", class: ["Fighter"], image: "/images/champions/terizla.png" },
  { id: "hero105", name: "Thamuz", class: ["Fighter"], image: "/images/champions/thamuz.png" },
  
  // U
  { id: "hero123", name: "Uranus", class: ["Tank"], image: "/images/champions/uranus.png" },

  // V
  { id: "hero121", name: "Vale", class: ["Mage"], image: "/images/champions/vale.png" },
  { id: "hero107", name: "Valentina", class: ["Mage"], image: "/images/champions/valentina.png" },
  { id: "hero106", name: "Valir", class: ["Mage"], image: "/images/champions/valir.png" },
  { id: "hero108", name: "Vexana", class: ["Mage"], image: "/images/champions/vexana.png" },

  // W
  { id: "hero109", name: "Wanwan", class: ["Marksman"], image: "/images/champions/wanwan.png" },

  // X
  { id: "hero114", name: "X.Borg", class: ["Fighter"], image: "/images/champions/xborg.png" },
  { id: "hero115", name: "Xavier", class: ["Mage"], image: "/images/champions/xavier.png" },

  // Y
  { id: "hero110", name: "Yi Sun-shin", class: ["Assassin"], image: "/images/champions/yisun-shin.png" },
  { id: "hero111", name: "Yin", class: ["Fighter"], image: "/images/champions/yin.png" },
  { id: "hero113", name: "Yu Zhong", class: ["Fighter"], image: "/images/champions/yuzhong.png" },
  { id: "hero112", name: "Yve", class: ["Mage"], image: "/images/champions/yve.png" },

  // Z
  { id: "hero116", name: "Zhask", class: ["Mage"], image: "/images/champions/zhask.png" },
  { id: "hero117", name: "Zhuxin", class: ["Mage"], image: "/images/champions/zhuxin.png" },
  { id: "hero118", name: "Zilong", class: ["Fighter"], image: "/images/champions/zilong.png" },

]

export const championClasses: { name: ChampionClass; icon: string }[] = [
  
  { name: "Tank", icon: "/images/roles/tank.png" },
   { name: "Fighter", icon: "/images/roles/fighter.png" },
  { name: "Assassin", icon: "/images/roles/assassin.png" },
  { name: "Mage", icon: "/images/roles/mage.png" },
   { name: "Marksman", icon: "/images/roles/marksman.png" },
  { name: "Support", icon: "/images/roles/support.png" },
 
]

