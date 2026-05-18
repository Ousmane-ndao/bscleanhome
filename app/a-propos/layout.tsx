import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "À propos",
  description:
    "BS-Consulting : lavage automobile à domicile, detailing, formations Meguiar's, nettoyage canapé, tapis, matelas, blanchisserie et entretien professionnel au Sénégal.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
