"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Car,
  CheckCircle,
  GraduationCap,
  Home,
  MessageCircle,
  Shield,
  Sparkles,
} from "lucide-react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { ProductCartSheet } from "@/components/product-cart-sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { aboutIntro, aboutSections, aboutValues } from "@/lib/about-content"

const sectionIcons = [Car, GraduationCap, Home, Shield] as const

export default function AboutPage() {
  const cart = useCart()

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SiteNavbar
        currentPath="/a-propos"
        cartCount={cart.totalItems}
        onCartOpen={() => cart.setIsOpen(true)}
      />

      {/* Hero */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-accueil.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden className="text-primary-foreground/40">
                /
              </li>
              <li className="font-medium text-primary-foreground">À propos</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Award className="w-4 h-4 text-secondary" aria-hidden />
              <span className="text-sm font-medium text-primary-foreground">
                Distributeur exclusif Meguiar&apos;s
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight text-balance">
              {aboutIntro.title}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-medium text-secondary">{aboutIntro.subtitle}</p>
            <p className="mt-6 text-lg text-primary-foreground/85 leading-relaxed max-w-2xl">
              {aboutIntro.tagline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 h-14 shadow-xl shadow-secondary/30"
              >
                <a href="https://wa.me/221776211688" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Nous contacter
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full border border-white/50 bg-white px-8 h-14 font-semibold text-black hover:bg-white/90 hover:text-black shadow-lg"
              >
                <Link href="/#services">
                  Voir nos services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="border-b border-border bg-muted/30 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {aboutValues.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-background p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-primary sm:text-4xl">{item.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <article className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
              Qui sommes-nous ?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Une expertise complète au service de votre propreté
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              De l&apos;automobile au textile, en passant par la formation professionnelle, BS-Consulting
              accompagne particuliers et entreprises avec des solutions sur mesure.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {aboutSections.map((section, index) => {
              const Icon = sectionIcons[index] ?? Sparkles
              const reversed = index % 2 === 1

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className={`grid gap-8 lg:grid-cols-2 lg:gap-14 lg:items-center ${
                    reversed ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl bg-muted">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width:1024px) 100vw, 50vw"
                      quality={90}
                    />
                  </div>

                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md mb-5">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{section.title}</h3>
                    <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                      {section.content}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {section.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-foreground">
                          <CheckCircle
                            className="h-5 w-5 shrink-0 text-secondary mt-0.5"
                            aria-hidden
                          />
                          <span className="text-sm sm:text-base">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </article>

      {/* Engagement */}
      <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex items-center gap-2 text-secondary mb-4">
                    <Sparkles className="h-5 w-5" aria-hidden />
                    <span className="text-sm font-semibold uppercase tracking-widest">
                      Notre promesse
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    Propreté, hygiène et satisfaction à chaque prestation
                  </h2>
                  <p className="mt-4 text-primary-foreground/80 leading-relaxed max-w-2xl">
                    Techniques modernes, produits professionnels Meguiar&apos;s et une équipe formée
                    pour livrer un résultat haut de gamme — chez vous, à votre rythme.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8"
                  >
                    <Link href="/#contact">Demander un devis</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border bg-white text-black hover:bg-white/90 hover:text-black h-12 px-8"
                  >
                    <Link href="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour à l&apos;accueil
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />

      <ProductCartSheet
        items={cart.items}
        open={cart.isOpen}
        onOpenChange={cart.setIsOpen}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        onClearCart={cart.clearCart}
      />
    </div>
  )
}
