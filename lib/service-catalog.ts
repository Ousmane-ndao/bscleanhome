export type ServiceEntry = {
  name: string
  price: number
}

export function getServiceId(categoryId: string, serviceName: string): string {
  return `service-${categoryId}-${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
}

export const serviceCatalog: Record<string, ServiceEntry[]> = {
  auto: [
    { name: "Lavage extérieur", price: 5_000 },
    { name: "Lavage intérieur", price: 7_500 },
    { name: "Lavage complet", price: 12_000 },
    { name: "Nettoyage moteur", price: 10_000 },
    { name: "Polish carrosserie", price: 25_000 },
    { name: "Traitement anti-pluie", price: 8_000 },
    { name: "Désinfection intérieure", price: 6_000 },
    { name: "Nettoyage sièges tissu/cuir", price: 15_000 },
  ],
  canape: [
    { name: "Nettoyage canapé tissu", price: 12_000 },
    { name: "Nettoyage canapé cuir", price: 15_000 },
    { name: "Shampoing canapé", price: 10_000 },
    { name: "Désinfection canapé", price: 8_000 },
    { name: "Élimination des taches", price: 7_000 },
    { name: "Traitement anti-odeur", price: 6_000 },
  ],
  tapis: [
    { name: "Lavage tapis moderne", price: 8_000 },
    { name: "Lavage tapis traditionnel", price: 10_000 },
    { name: "Nettoyage tapis moquette", price: 7_000 },
    { name: "Désinfection tapis", price: 6_000 },
    { name: "Traitement anti-acariens", price: 8_000 },
    { name: "Nettoyage tapis de bureau", price: 12_000 },
  ],
  matelas: [
    { name: "Désinfection matelas", price: 10_000 },
    { name: "Nettoyage anti-acariens", price: 12_000 },
    { name: "Élimination des taches", price: 7_000 },
    { name: "Traitement anti-odeur", price: 6_000 },
    { name: "Nettoyage vapeur", price: 15_000 },
  ],
  blanchisserie: [
    { name: "Lavage vêtements", price: 2_000 },
    { name: "Repassage", price: 1_500 },
    { name: "Nettoyage à sec", price: 3_000 },
    { name: "Lavage linge délicat", price: 2_500 },
    { name: "Lavage couettes", price: 6_000 },
    { name: "Lavage rideaux", price: 5_000 },
    { name: "Pliage vêtements", price: 1_000 },
  ],
  maison: [
    { name: "Nettoyage complet maison", price: 75_000 },
    { name: "Nettoyage après chantier", price: 90_000 },
    { name: "Nettoyage après déménagement", price: 85_000 },
    { name: "Nettoyage cuisine", price: 25_000 },
    { name: "Nettoyage salle de bain", price: 20_000 },
    { name: "Nettoyage vitres", price: 18_000 },
    { name: "Désinfection maison", price: 35_000 },
    { name: "Nettoyage bureaux", price: 40_000 },
  ],
  pro: [
    { name: "Nettoyage bureaux", price: 50_000 },
    { name: "Nettoyage commerces", price: 60_000 },
    { name: "Nettoyage restaurants", price: 70_000 },
    { name: "Nettoyage hôtels", price: 120_000 },
    { name: "Nettoyage immeubles", price: 150_000 },
    { name: "Entretien espaces professionnels", price: 80_000 },
  ],
}
