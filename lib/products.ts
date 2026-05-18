export type Product = {
  id: string
  name: string
  brand: string
  category: string
  size: string
  price: number
  image: string
  description: string
}

export const products: Product[] = [
  {
    id: "creme-renovateur-ultimate",
    name: "Crème Rénovateur Carrosserie Ultimate",
    brand: "Meguiar's",
    category: "Rénovation",
    size: "450ml",
    price: 22_000,
    image: "/images/products/creme-renovateur-ultimate.png",
    description:
      "Restaure une peinture abîmée ou négligée rapidement et sans efforts. Élimine les micro-rayures, l'oxydation, les traces d'eau ou un voile terne. S'adapte à tous les types de peinture.",
  },
  {
    id: "ultimate-polish-lustrant",
    name: "Ultimate Polish - Lustrant",
    brand: "Meguiar's",
    category: "Polish",
    size: "473ml",
    price: 24_000,
    image: "/images/products/ultimate-polish-lustrant.png",
    description:
      "Produit une brillance extrême avec une incroyable profondeur de couleur. Élimine les plus fines rayures tourbillonnantes et génère une finition sans défaut avant l'étape de vitrification.",
  },
  {
    id: "scratchx-efface-rayures",
    name: "Efface-Rayures - Liquide à Polir",
    brand: "Meguiar's",
    category: "Correction",
    size: "250ml",
    price: 18_000,
    image: "/images/products/scratchx-efface-rayures.png",
    description:
      "Élimine en toute sécurité les égratignures légères, les imperfections et les tourbillons sur toutes les finitions de peinture. Efface les défauts définitivement plutôt que de les cacher.",
  },
  {
    id: "shampoing-cire-sans-eau",
    name: "Shampoing & Cire sans eau",
    brand: "Meguiar's",
    category: "Lavage",
    size: "768ml",
    price: 20_000,
    image: "/images/products/shampoing-cire-sans-eau.png",
    description:
      "Solution idéale pour un nettoyage rapide et efficace sans eau. Double action : nettoie et cire en une seule étape avec protection longue durée contre la poussière et les UV.",
  },
  {
    id: "apc-d10101",
    name: "All Purpose Cleaner (APC)",
    brand: "Meguiar's",
    category: "Nettoyant",
    size: "D10101",
    price: 38_000,
    image: "/images/products/apc-d10101.png",
    description:
      "Produit indispensable pour nettoyer et décrasser tous les éléments intérieurs et extérieurs. Enlève délicatement la saleté avec un aspect glossy. Dilution 1:10 à 1:4 selon l'usage.",
  },
  {
    id: "iron-removing-d2002",
    name: "Iron Removing Spray Clay",
    brand: "Meguiar's",
    category: "Décontamination",
    size: "D2002",
    price: 42_000,
    image: "/images/products/iron-removing-d2002.png",
    description:
      "Argile chimique qui dissout la contamination incrustée par la rouille volante et les retombées industrielles. Élimine les contaminants sans abrasifs. Formule prête à l'emploi.",
  },
  {
    id: "spray-decontaminant-ferreux-g250524",
    name: "Spray Décontaminant Ferreux – Ultimate G250524",
    brand: "Meguiar's",
    category: "Décontamination",
    size: "G250524 · 710ml",
    price: 38_000,
    image: "/images/products/spray-decontaminant-ferreux-g250524.png",
    description:
      "Notre Décontaminant Ferreux le plus avancé. Élimine rapidement les contaminants ferreux incrustés provenant des plaquettes de frein et des retombées industrielles qui rendent les surfaces rugueuses, ternes ou opaques. Ce produit permet d'optimiser le résultat des rénovateurs, des lustrants et des traitements de protection appliqués ensuite.",
  },
  {
    id: "vitres-d12001",
    name: "Nettoyant pour Vitres Concentré",
    brand: "Meguiar's",
    category: "Vitres",
    size: "D12001 · 1 gallon",
    price: 45_000,
    image: "/images/products/vitres-d12001.png",
    description:
      "Élimine les résidus de brouillard de vinyle et les films de fumeur. Sûr et efficace sur les vitres teintées. Un gallon donne onze gallons prêts à l'emploi.",
  },
  {
    id: "hyper-dressing-d17001",
    name: "Hyper Dressing",
    brand: "Meguiar's",
    category: "Habillage",
    size: "D17001 · 1 gallon",
    price: 48_000,
    image: "/images/products/hyper-dressing-d17001.png",
    description:
      "Brillance réglable par dilution jusqu'à 4:1 sur les pièces en caoutchouc, plastique et vinyle. Formule à base d'eau sûre avec parfum agréable. Vaporiser et essuyer.",
  },
  {
    id: "quik-interior-d14901",
    name: "Quik Interior Detailer",
    brand: "Meguiar's",
    category: "Intérieur",
    size: "D14901 · 1 gallon",
    price: 46_000,
    image: "/images/products/quik-interior-d14901.png",
    description:
      "Nettoie et protège toutes les surfaces intérieures : plastiques, vinyle, cuir, caoutchouc, métal, fibre de carbone et bois. Protection UV non grasse et durable.",
  },
  {
    id: "super-degreaser-d10801",
    name: "Super Degreaser - Dégraissant",
    brand: "Meguiar's",
    category: "Dégraissant",
    size: "D10801",
    price: 40_000,
    image: "/images/products/super-degreaser-d10801.png",
    description:
      "Formule à action rapide et sans rinçage qui élimine la graisse la plus tenace. Prévient les taches de résidus blancs. Laisse un parfum agréable d'herbes.",
  },
  {
    id: "hyper-wash-d11001",
    name: "Hyper-Wash",
    brand: "Meguiar's",
    category: "Shampoing",
    size: "D11001 · 1 gallon",
    price: 44_000,
    image: "/images/products/hyper-wash-d11001.png",
    description:
      "Mousse riche et stable avec un rapport de dilution de 400:1. Élimine efficacement la saleté sans enlever la cire. Formule biodégradable sans danger pour l'environnement.",
  },
  {
    id: "stoner-pack-vitres-ultime",
    name: "Stoner – Pack Vitres Ultime",
    brand: "Stoner",
    category: "Vitres",
    size: "Kit complet",
    price: 52_000,
    image: "/images/products/stoner-pack-vitres-ultime.png",
    description:
      "Retrouvez les essentiels de la marque STONER pour une clarté absolue et durable. Le Pack Vitres Ultime regroupe les meilleurs produits et accessoires pour nettoyer, protéger et sublimer toutes les surfaces vitrées de votre véhicule. Conçu pour éliminer sans effort les saletés les plus tenaces, ce kit vous garantit une visibilité parfaite par tous les temps.",
  },
  {
    id: "fictech-pack-nettoyage-vitres",
    name: "Fictech – Pack Nettoyage Vitres",
    brand: "Fictech",
    category: "Vitres",
    size: "Kit 3 pièces",
    price: 45_000,
    image: "/images/products/fictech-pack-nettoyage-vitres.png",
    description:
      "Offrez à vos surfaces vitrées une transparence parfaite avec le savoir-faire Fictech. Le Pack Nettoyage Vitres combine l'efficacité d'un nettoyant haut de gamme, d'un flacon spray ergonomique et d'une microfibre technique. Spécialement conçu pour le detailing automobile et l'entretien exigeant, ce kit élimine instantanément tous les types de salissures sans laisser la moindre trace ni reflet gênant.",
  },
]
