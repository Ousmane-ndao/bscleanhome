export type ServiceEntry = {
  name: string
  price: number
  image: string
}

export function getServiceId(categoryId: string, serviceName: string): string {
  return `service-${categoryId}-${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
}

const serviceImages = {
  exterior: "/images/service-exterior.jpg",
  interior: "/images/service-interior.jpg",
  engine: "/images/service-engine.jpg",
  paint: "/images/service-paint.jpg",
  glass: "/images/service-glass.jpg",
  wax: "/images/service-wax.jpg",
  wheels: "/images/service-wheels.jpg",
  sofa: "/images/service-sofa.jpg",
  carpet: "/images/service-carpet.jpg",
  mattress: "/images/service-mattress.jpg",
  laundry: "/images/service-laundry.jpg",
  house: "/images/service-house.jpg",
  office: "/images/service-office.jpg",
  lavage: "/images/services/lavage.jpg",
  nettoyage: "/images/services/nettoyage.png",
  equipement: "/images/services/equipement-fictech.png",
} as const

export const serviceCatalog: Record<string, ServiceEntry[]> = {
  auto: [
    { name: "Lavage extérieur", price: 5_000, image: serviceImages.exterior },
    { name: "Lavage intérieur", price: 7_500, image: serviceImages.interior },
    { name: "Lavage complet", price: 12_000, image: serviceImages.lavage },
    { name: "Nettoyage moteur", price: 10_000, image: serviceImages.engine },
    { name: "Polish carrosserie", price: 25_000, image: serviceImages.paint },
    { name: "Traitement anti-pluie", price: 8_000, image: serviceImages.glass },
    { name: "Désinfection intérieure", price: 6_000, image: serviceImages.interior },
    { name: "Nettoyage sièges tissu/cuir", price: 15_000, image: serviceImages.interior },
  ],
  canape: [
    { name: "Nettoyage canapé tissu", price: 12_000, image: serviceImages.sofa },
    { name: "Nettoyage canapé cuir", price: 15_000, image: serviceImages.sofa },
    { name: "Shampoing canapé", price: 10_000, image: "/images/canape-1.jpg" },
    { name: "Désinfection canapé", price: 8_000, image: "/images/canape-2.jpg" },
    { name: "Élimination des taches", price: 7_000, image: "/images/canape-3.jpg" },
    { name: "Traitement anti-odeur", price: 6_000, image: serviceImages.nettoyage },
  ],
  tapis: [
    { name: "Lavage tapis moderne", price: 8_000, image: serviceImages.carpet },
    { name: "Lavage tapis traditionnel", price: 10_000, image: "/images/tapis-1.jpg" },
    { name: "Nettoyage tapis moquette", price: 7_000, image: "/images/tapis-2.jpg" },
    { name: "Désinfection tapis", price: 6_000, image: "/images/tapis-3.jpg" },
    { name: "Traitement anti-acariens", price: 8_000, image: serviceImages.nettoyage },
    { name: "Nettoyage tapis de bureau", price: 12_000, image: serviceImages.office },
  ],
  matelas: [
    { name: "Désinfection matelas", price: 10_000, image: serviceImages.mattress },
    { name: "Nettoyage anti-acariens", price: 12_000, image: "/images/matelas-1.jpg" },
    { name: "Élimination des taches", price: 7_000, image: "/images/matelas-2.jpg" },
    { name: "Traitement anti-odeur", price: 6_000, image: "/images/matelas-3.jpg" },
    { name: "Nettoyage vapeur", price: 15_000, image: serviceImages.nettoyage },
  ],
  blanchisserie: [
    { name: "Lavage vêtements", price: 2_000, image: serviceImages.laundry },
    { name: "Repassage", price: 1_500, image: "/images/blanchisserie-1.jpg" },
    { name: "Nettoyage à sec", price: 3_000, image: "/images/blanchisserie-2.jpg" },
    { name: "Lavage linge délicat", price: 2_500, image: "/images/blanchisserie-3.jpg" },
    { name: "Lavage couettes", price: 6_000, image: serviceImages.laundry },
    { name: "Lavage rideaux", price: 5_000, image: serviceImages.nettoyage },
    { name: "Pliage vêtements", price: 1_000, image: serviceImages.laundry },
  ],
  maison: [
    { name: "Nettoyage complet maison", price: 75_000, image: serviceImages.house },
    { name: "Nettoyage après chantier", price: 90_000, image: "/images/maison-1.jpg" },
    { name: "Nettoyage après déménagement", price: 85_000, image: "/images/maison-2.jpg" },
    { name: "Nettoyage cuisine", price: 25_000, image: "/images/maison-3.jpg" },
    { name: "Nettoyage salle de bain", price: 20_000, image: serviceImages.nettoyage },
    { name: "Nettoyage vitres", price: 18_000, image: serviceImages.glass },
    { name: "Désinfection maison", price: 35_000, image: serviceImages.nettoyage },
    { name: "Nettoyage bureaux", price: 40_000, image: serviceImages.office },
  ],
  pro: [
    { name: "Nettoyage bureaux", price: 50_000, image: serviceImages.office },
    { name: "Nettoyage commerces", price: 60_000, image: "/images/pro-1.jpg" },
    { name: "Nettoyage restaurants", price: 70_000, image: "/images/pro-2.jpg" },
    { name: "Nettoyage hôtels", price: 120_000, image: "/images/pro-3.jpg" },
    { name: "Nettoyage immeubles", price: 150_000, image: serviceImages.house },
    { name: "Entretien espaces professionnels", price: 80_000, image: serviceImages.equipement },
  ],
}

const categoryGalleryExtras: Record<string, string[]> = {
  auto: [
    "/images/atelier-consulting-auto.jpg",
    "/images/auto-1.jpg",
    "/images/auto-2.jpg",
    "/images/auto-3.jpg",
    serviceImages.wheels,
    serviceImages.wax,
  ],
  canape: ["/images/canape-1.jpg", "/images/canape-2.jpg", "/images/canape-3.jpg"],
  tapis: ["/images/tapis-1.jpg", "/images/tapis-2.jpg", "/images/tapis-3.jpg"],
  matelas: ["/images/matelas-1.jpg", "/images/matelas-2.jpg", "/images/matelas-3.jpg"],
  blanchisserie: [
    "/images/blanchisserie-1.jpg",
    "/images/blanchisserie-2.jpg",
    "/images/blanchisserie-3.jpg",
  ],
  maison: ["/images/maison-1.jpg", "/images/maison-2.jpg", "/images/maison-3.jpg", serviceImages.nettoyage],
  pro: ["/images/pro-1.jpg", "/images/pro-2.jpg", "/images/pro-3.jpg", serviceImages.equipement],
}

/** Images uniques pour la galerie d'une catégorie (prestations + visuels complémentaires). */
export function getCategoryGallery(categoryId: string): string[] {
  const fromServices = (serviceCatalog[categoryId] ?? []).map((s) => s.image)
  const extras = categoryGalleryExtras[categoryId] ?? []
  return [...new Set([...fromServices, ...extras])]
}

/** Image principale affichée sur la carte d'une catégorie. */
export function getCategoryCoverImage(categoryId: string): string {
  const gallery = getCategoryGallery(categoryId)
  return gallery[0] ?? serviceImages.lavage
}
