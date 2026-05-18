import Link from "next/link"
import Image from "next/image"
import { Award, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { footerServiceLinks, mainNavLinks } from "@/lib/navigation"

const socialLinks = [
  {
    href: "https://facebook.com/bsconsultingvoyage",
    label: "Facebook",
    icon: (
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    ),
  },
  {
    href: "https://instagram.com/bsconsultingvoyage",
    label: "Instagram",
    icon: (
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
    ),
  },
  {
    href: "https://tiktok.com/@bsconsultingvoyage",
    label: "TikTok",
    icon: (
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    ),
  },
] as const

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-5">
      {children}
    </h4>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-sm text-primary-foreground/75 transition-colors hover:text-secondary hover:translate-x-0.5 inline-block"
    >
      {children}
    </Link>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-secondary/15 blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 blur-3xl" aria-hidden />

      {/* Bandeau CTA */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 backdrop-blur-sm">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-2">
                Besoin d&apos;un devis ?
              </p>
              <p className="text-xl font-bold leading-snug sm:text-2xl">
                Contactez-nous sur WhatsApp — réponse sous 24 h
              </p>
              <p className="mt-2 text-sm text-primary-foreground/70">
                Lavage à domicile, nettoyage pro et produits Meguiar&apos;s au Sénégal.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/25 h-12 px-8"
            >
              <a
                href="https://wa.me/221776211688?text=Bonjour%2C%20je%20souhaite%20un%20devis."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
                Discuter sur WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marque */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo-bs-consulting-transparent.png"
                alt="BS Consulting"
                width={200}
                height={64}
                className="h-11 w-auto object-contain sm:h-12"
              />
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/75 max-w-sm">
              BS-Consulting : excellence du nettoyage professionnel au Sénégal. Lavage auto à
              domicile, textile, formation detailing.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2">
              <Award className="h-4 w-4 text-secondary shrink-0" aria-hidden />
              <span className="text-xs font-semibold text-primary-foreground">
                Distributeur exclusif Meguiar&apos;s
              </span>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-primary-foreground transition-all hover:bg-secondary hover:text-secondary-foreground hover:scale-105"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-primary-foreground/50">@bsconsultingvoyage</p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <FooterHeading>Navigation</FooterHeading>
            <ul className="space-y-3">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <FooterHeading>Nos services</FooterHeading>
            <ul className="space-y-3">
              {footerServiceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Phone className="h-4 w-4 text-secondary" aria-hidden />
                </span>
                <div className="space-y-1 text-sm">
                  <a
                    href="tel:+221776211688"
                    className="block font-medium text-primary-foreground/90 hover:text-secondary transition-colors"
                  >
                    77 621 16 88
                  </a>
                  <a
                    href="tel:+221778784346"
                    className="block font-medium text-primary-foreground/90 hover:text-secondary transition-colors"
                  >
                    77 878 43 46
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Mail className="h-4 w-4 text-secondary" aria-hidden />
                </span>
                <a
                  href="mailto:agencebsconsulting@gmail.com"
                  className="text-sm font-medium text-primary-foreground/90 hover:text-secondary transition-colors break-all"
                >
                  agencebsconsulting@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-4 w-4 text-secondary" aria-hidden />
                </span>
                <p className="text-sm leading-relaxed text-primary-foreground/75">
                  Keur Massar, derrière Sedima
                  <br />
                  en face Djolof Chicken — Dakar
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-primary-foreground/50 text-center sm:text-left">
            &copy; {year} BS-Consulting. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/50">
            <Link href="/a-propos" className="hover:text-secondary transition-colors">
              À propos
            </Link>
            <Link href="/#contact" className="hover:text-secondary transition-colors">
              Contact
            </Link>
            <a
              href="https://wa.me/221776211688"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
