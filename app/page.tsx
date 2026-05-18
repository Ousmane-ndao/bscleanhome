"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCartSheet } from "@/components/product-cart-sheet"
import { ServiceImageGallery, ServiceThumb } from "@/components/service-image-gallery"
import { SiteFooter } from "@/components/site-footer"
import dynamic from "next/dynamic"

const ProductsCatalog = dynamic(
  () => import("@/components/products-catalog").then((m) => m.ProductsCatalog),
  {
    loading: () => (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-[340px] animate-pulse rounded-xl bg-muted/80" />
        ))}
      </div>
    ),
  }
)
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/format"
import {
  getCategoryCoverImage,
  getCategoryGallery,
  getServiceId,
  serviceCatalog,
} from "@/lib/service-catalog"
import { 
  Car, 
  Sofa,
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Menu,
  X,
  GraduationCap,
  MessageCircle,
  Home,
  Building2,
  Shirt,
  BedDouble,
  Layers,
  Award,
  Clock,
  Shield,
  ShoppingCart,
} from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"

const serviceCategories = [
  {
    id: "auto",
    icon: Car,
    title: "Lavage automobile",
    description:
      "Lavage extérieur, intérieur, complet, moteur, polish et traitement de protection automobile.",
    services: serviceCatalog.auto,
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "canape",
    icon: Sofa,
    title: "Nettoyage canapé",
    description: "Nettoyage professionnel de canapés tissu et cuir avec traitement anti-taches.",
    services: serviceCatalog.canape,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "tapis",
    icon: Layers,
    title: "Lavage Tapis",
    description: "Nettoyage en profondeur de tapis modernes, traditionnels et moquettes.",
    services: serviceCatalog.tapis,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "matelas",
    icon: BedDouble,
    title: "Nettoyage Matelas",
    description: "Désinfection et nettoyage vapeur pour un sommeil sain.",
    services: serviceCatalog.matelas,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "blanchisserie",
    icon: Shirt,
    title: "Blanchisserie",
    description: "Lavage, repassage et nettoyage à sec de qualité professionnelle.",
    services: serviceCatalog.blanchisserie,
    color: "from-sky-500 to-cyan-600",
  },
  {
    id: "maison",
    icon: Home,
    title: "Nettoyage Maison",
    description: "Entretien complet de votre maison avec produits professionnels.",
    services: serviceCatalog.maison,
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "pro",
    icon: Building2,
    title: "Nettoyage Pro",
    description: "Solutions sur mesure pour entreprises et espaces commerciaux.",
    services: serviceCatalog.pro,
    color: "from-slate-600 to-slate-800",
  },
] as const

const featureHighlights = [
  {
    icon: Shield,
    label: "Qualité garantie",
    description:
      "Satisfaction 100 % sur nos prestations auto, maison et textile.",
    tone: "primary" as const,
  },
  {
    icon: Clock,
    label: "Service rapide",
    description:
      "Intervention sous 24 h à Dakar, planification simple par WhatsApp.",
    tone: "primary" as const,
  },
  {
    icon: Award,
    label: "Produits pro",
    description:
      "Gamme Meguiar's Professional — distributeur exclusif au Sénégal.",
    tone: "secondary" as const,
  },
  {
    icon: Phone,
    label: "Support 7j/7",
    description:
      "Devis et questions par téléphone ou WhatsApp, réponse sous 24 h.",
    tone: "secondary" as const,
  },
]

const trainingTopics = [
  "Techniques de lavage sans rayures (méthode 2 seaux)",
  "Polish et correction de peinture machine DA",
  "Nettoyage intérieur professionnel",
  "Application protection céramique",
  "Utilisation produits Meguiar's",
  "Gestion centre de lavage",
  "Lavage compartiment moteur"
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("auto")
  const [highlightedService, setHighlightedService] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const cart = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const activeService = serviceCategories.find((cat) => cat.id === activeCategory)

  const activeGalleryImages = useMemo(() => {
    if (!activeService) return []
    const gallery = getCategoryGallery(activeService.id)
    if (!highlightedService) return gallery
    const entry = activeService.services.find((s) => s.name === highlightedService)
    if (!entry?.image) return gallery
    return [entry.image, ...gallery.filter((src) => src !== entry.image)]
  }, [activeService, highlightedService])

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    setHighlightedService(null)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b transition-[box-shadow,border-color] duration-300 ${
          scrolled ? "border-border shadow-sm shadow-black/5" : "border-border/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/images/logo-bs-consulting-transparent.png"
                alt="BS Consulting"
                width={200}
                height={64}
                className="h-9 w-auto object-contain sm:h-11"
                priority
              />
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Accueil
              </Link>
              <Link href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="#produits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Produits
              </Link>
              <Link href="#formation" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Formation
              </Link>
              <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/a-propos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                À propos
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="relative rounded-full"
                onClick={() => cart.setIsOpen(true)}
                aria-label={`Panier${cart.totalItems > 0 ? `, ${cart.totalItems} article${cart.totalItems > 1 ? "s" : ""}` : ""}`}
              >
                <ShoppingCart className="h-4 w-4" />
                {cart.totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground">
                    {cart.totalItems > 99 ? "99+" : cart.totalItems}
                  </span>
                )}
              </Button>
              <a href="tel:+221776211688" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                77 621 16 88
              </a>
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 shadow-lg shadow-secondary/20">
                <a href="https://wa.me/221776211688" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="relative rounded-full"
                onClick={() => cart.setIsOpen(true)}
                aria-label={`Panier${cart.totalItems > 0 ? `, ${cart.totalItems} articles` : ""}`}
              >
                <ShoppingCart className="h-4 w-4" />
                {cart.totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-0.5 text-[9px] font-bold text-secondary-foreground">
                    {cart.totalItems > 99 ? "99+" : cart.totalItems}
                  </span>
                )}
              </Button>
            <button 
              type="button"
              className="p-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="px-4 py-6 space-y-4">
              <Link href="/" className="block text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Accueil</Link>
              <Link href="#services" className="block text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link href="#produits" className="block text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Produits</Link>
              <Link href="#formation" className="block text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Formation</Link>
              <Link href="#contact" className="block text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/a-propos" className="block text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>À propos</Link>
              <div className="pt-4 flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => {
                    cart.setIsOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Panier{cart.totalItems > 0 ? ` (${cart.totalItems})` : ""}
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <a href="tel:+221776211688">
                    <Phone className="w-4 h-4 mr-2" />
                    77 621 16 88
                  </a>
                </Button>
                <Button asChild className="w-full bg-secondary text-secondary-foreground rounded-full">
                  <a href="https://wa.me/221776211688" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 overflow-hidden">
        {/* Photo de formation + dégradés pour lisibilità du texte */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-accueil.png"
            alt="Formation professionnelle au polissage automobile — équipe BS Consulting"
            fill
            className="object-cover object-[center_40%] sm:object-center"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/35 lg:to-primary/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/25 to-transparent" />
        </div>
        
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-2xl py-20 w-full space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-primary-foreground">Distributeur Exclusif Meguiar&apos;s</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.05] tracking-tight">
                L&apos;Excellence du
                <span className="block text-secondary">Nettoyage Pro</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
                Auto, canap—, tapis, matelas, blanchisserie et entretien professionnel. 
                Une expertise reconnue au Sénégal depuis des années.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 h-14 text-base w-full sm:w-auto shadow-xl shadow-secondary/30">
                  <a href="https://wa.me/221776211688" target="_blank" rel="noopener noreferrer">
                    Demander un devis gratuit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full border border-white/50 bg-white px-8 h-14 text-base font-semibold text-black hover:bg-white/90 hover:text-black w-full sm:w-auto shadow-lg"
                >
                  <Link href="#services">Voir nos services</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-8">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary-foreground">5K+</p>
                  <p className="text-sm text-primary-foreground/60">Clients satisfaits</p>
                </div>
                <div className="hidden min-[360px]:block w-px h-14 bg-white/20 self-center" />
                <div>
                  <p className="text-3xl sm:text-4xl font-bold text-primary-foreground">7</p>
                  <p className="text-sm text-primary-foreground/60">Catégories</p>
                </div>
                <div className="hidden min-[360px]:block w-px h-14 bg-white/20 self-center" />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl sm:text-4xl font-bold text-primary-foreground">4,9</p>
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-secondary text-secondary" aria-hidden />
                  </div>
                  <p className="text-sm text-primary-foreground/60">Note moyenne</p>
                </div>
              </div>
            </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-primary-foreground/50">Découvrir</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Engagements — grille 2—2 (maquette) */}
      <section className="border-b border-border bg-muted/30 py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {featureHighlights.map((item, i) => {
              const isPrimary = item.tone === "primary"
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-2xl p-6 shadow-lg sm:gap-5 sm:p-7 ${
                    isPrimary
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <item.icon
                      className={`h-7 w-7 ${isPrimary ? "text-primary" : "text-secondary"}`}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center gap-1.5">
                    <p className="text-lg font-bold leading-snug sm:text-xl">{item.label}</p>
                    <p
                      className={`text-sm leading-relaxed sm:text-[0.9375rem] ${
                        isPrimary ? "text-primary-foreground/90" : "opacity-90"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="apropos" className="py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
            <div>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">À propos</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
                BS-Consulting
              </h2>
              <p className="mt-2 text-lg font-medium text-primary">
                Lavage automobile & nettoyage professionnel au Sénégal
              </p>
              <p className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
                BS-Consulting est spécialisé dans le lavage automobile à domicile, avec des prestations modernes
                adaptées aux particuliers et aux entreprises. Formations, detailing Meguiar&apos;s et services de
                nettoyage complets.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-full px-8 h-12">
                <Link href="/a-propos">
                  En savoir plus
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl bg-muted">
              <Image
                src="/images/products-meguiars.jpg"
                alt="—0quipe BS-Consulting — atelier de lavage et detailing automobile"
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 50vw"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-muted/30 pt-12 pb-8 lg:pt-14 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Nos Services</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
              7 catégories pour répondre à tous vos besoins
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Du lavage auto au nettoyage professionnel, nous offrons une gamme complète de services avec une qualité irréprochable.
            </p>
          </div>

          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => selectCategory("auto")}
              className={`group relative overflow-hidden rounded-2xl border-2 text-left shadow-md transition-all ${
                activeCategory === "auto"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src="/images/services/lavage.jpg"
                  alt="Lavage automobile — atelier professionnel BS Consulting"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 50vw"
                  quality={70}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Lavage</p>
                <h3 className="mt-1 text-xl font-bold text-white">Lavage automobile</h3>
                <p className="mt-1 text-sm text-white/85">8 prestations — extérieur, intérieur, polish & protection</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => selectCategory("maison")}
              className={`group relative overflow-hidden rounded-2xl border-2 text-left shadow-md transition-all ${
                activeCategory === "maison"
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src="/images/services/nettoyage.png"
                  alt="Nettoyage professionnel — matériel BS Consulting"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 50vw"
                  quality={70}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Nettoyage</p>
                <h3 className="mt-1 text-xl font-bold text-white">Nettoyage professionnel</h3>
                <p className="mt-1 text-sm text-white/85">Maison, textile & équipements pro</p>
              </div>
            </button>
          </div>

          {/* Service Category Tabs */}
          <div className="mb-8 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full flex-nowrap justify-start gap-2 lg:min-w-0 lg:w-auto lg:flex-wrap lg:justify-center">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className={`flex shrink-0 items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "bg-background text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                <cat.icon className="w-4 h-4 shrink-0" aria-hidden />
                <span className="text-sm font-medium whitespace-nowrap">{cat.title}</span>
              </button>
            ))}
            </div>
          </div>

          {/* Active Service Detail */}
          {activeService && (
            <div className="mb-8 grid gap-6 lg:grid-cols-2 lg:items-start">
              {/* Image Gallery */}
              <ServiceImageGallery
                key={`${activeService.id}-${highlightedService ?? "all"}`}
                images={activeGalleryImages}
                title={activeService.title}
              />
              
              {/* Service Info */}
              <div className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${activeService.color} shadow-md`}
                  >
                    <activeService.icon className="h-5 w-5 text-white" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
                        {activeService.title}
                      </h3>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {activeService.services.length} prestations
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {activeService.description}
                    </p>
                  </div>
                </div>
                
                <ul className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {activeService.services.map((service) => (
                    <li
                      key={service.name}
                      className={`flex flex-col gap-2 rounded-lg border p-2.5 text-sm transition-colors sm:flex-row sm:items-center ${
                        highlightedService === service.name
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border/60 bg-muted/30"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setHighlightedService(service.name)}
                        className="flex min-w-0 flex-1 items-start gap-2.5 text-left"
                      >
                        <ServiceThumb src={service.image} alt={service.name} />
                        <div className="min-w-0 flex-1">
                          <span className="block leading-snug text-foreground">{service.name}</span>
                          <span className="text-xs font-semibold text-secondary">{formatPrice(service.price)}</span>
                        </div>
                      </button>
                      <Button
                        type="button"
                        size="sm"
                        className="h-8 shrink-0 rounded-full bg-secondary px-3 text-xs text-secondary-foreground hover:bg-secondary/90"
                        onClick={() =>
                          cart.addService({
                            id: getServiceId(activeService.id, service.name),
                            name: service.name,
                            categoryId: activeService.id,
                            categoryTitle: activeService.title,
                            price: service.price,
                          })
                        }
                      >
                        <ShoppingCart className="mr-1 h-3 w-3" aria-hidden />
                        Commander
                      </Button>
                    </li>
                  ))}
                </ul>
                
                <Button
                  type="button"
                  className="h-11 w-full rounded-full bg-primary text-sm text-primary-foreground hover:bg-primary/90"
                  onClick={() => cart.setIsOpen(true)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" aria-hidden />
                  Voir le panier{cart.totalItems > 0 ? ` (${cart.totalItems})` : ""}
                </Button>
              </div>
            </div>
          )}

          {/* Grille services : photo nette, infos sous l'image */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceCategories.map((category) => (
              <Card 
                key={category.id} 
                className={`group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ${
                  activeCategory === category.id 
                    ? "ring-2 ring-primary shadow-xl" 
                    : "hover:shadow-lg"
                }`}
                onClick={() => selectCategory(category.id)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={getCategoryCoverImage(category.id)}
                    alt={category.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    quality={65}
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 border-t border-border bg-card p-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} shadow-sm`}
                  >
                    <category.icon className="h-5 w-5 text-white" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold leading-snug text-foreground sm:text-base">
                      {category.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {category.services.length} prestations
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Produits Meguiar's — cartes maquette */}
      <section id="produits" className="relative overflow-hidden bg-gradient-to-b from-muted/40 via-background to-muted/20 pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8 lg:mb-10">
            <div>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-4">Nos Produits</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
                Meguiar&apos;s Professional
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Leader mondial du soin automobile depuis 1901. Nous utilisons et distribuons exclusivement 
                leurs produits professionnels pour des résultats exceptionnels.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" aria-hidden />
                  <span className="text-foreground">Qualité pro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" aria-hidden />
                  <span className="text-foreground">Prix compétitifs</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden rounded-3xl shadow-2xl bg-muted">
              <Image
                src="/images/products-meguiars.jpg"
                alt="Atelier BS Consulting — équipe detailing, distributeur Meguiar's Professional au Sénégal"
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 50vw"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-2xl font-bold text-white">Distributeur Exclusif</p>
                <p className="text-white/80">Sénégal</p>
              </div>
            </div>
          </div>

          <ProductsCatalog
            onAddToCart={cart.addProduct}
            onOpenCart={() => cart.setIsOpen(true)}
            cartCount={cart.totalItems}
          />
        </div>
      </section>

      {/* Formation Section */}
      <section id="formation" className="py-12 lg:py-16 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <GraduationCap className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Formation Professionnelle</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
                Devenez Expert en
                <span className="text-secondary block">Detailing Auto</span>
              </h2>
              
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
                Programme complet de 2 à 4 semaines avec certification. 
                Apprenez les techniques professionnelles utilisées dans les meilleurs centres de detailing.
              </p>

              <div className="mt-10 space-y-4">
                {trainingTopics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary-foreground">{i + 1}</span>
                    </div>
                    <span className="text-primary-foreground">{topic}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 h-14 w-full sm:w-auto shadow-xl shadow-secondary/30">
                  <a href="https://wa.me/221776211688?text=Je%20souhaite%20m%27inscrire%20a%20la%20formation" target="_blank" rel="noopener noreferrer">
                    S&apos;inscrire maintenant
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-muted">
                <Image
                  src="/images/training-formation.jpg"
                  alt="Formation professionnelle au detailing automobile"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-background text-foreground p-6 rounded-3xl shadow-2xl">
                <p className="text-4xl font-bold text-secondary">2-4</p>
                <p className="text-sm text-muted-foreground">semaines</p>
                <p className="text-sm font-semibold text-foreground mt-1">+ Certificat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="scroll-mt-20 border-b border-border bg-muted/30 pt-8 pb-12 lg:pt-10 lg:pb-14"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 max-w-2xl text-center lg:mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary sm:text-sm">
              Contact
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
              Contactez-nous
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Notre équipe est disponible 7j/7 pour r—pondre à toutes vos questions.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <Card className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 p-5 sm:p-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/15"
                  aria-hidden
                >
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-sm font-bold text-primary sm:text-[0.9375rem]">
                    Téléphone
                  </h3>
                  <div className="mt-2 space-y-1">
                    <a
                      href="tel:+221776211688"
                      className="block text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
                    >
                      77 621 16 88
                    </a>
                    <a
                      href="tel:+221778784346"
                      className="block text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
                    >
                      77 878 43 46
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 p-5 sm:p-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/18 text-secondary ring-1 ring-secondary/25"
                  aria-hidden
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-sm font-bold text-primary sm:text-[0.9375rem]">
                    WhatsApp
                  </h3>
                  <div className="mt-2 space-y-1">
                    <a
                      href="https://wa.me/221776211688"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-medium text-foreground/75 transition-colors hover:text-secondary"
                    >
                      77 621 16 88
                    </a>
                    <a
                      href="https://wa.me/221778784346"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-medium text-foreground/75 transition-colors hover:text-secondary"
                    >
                      77 878 43 46
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 p-5 sm:p-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/15"
                  aria-hidden
                >
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-sm font-bold text-primary sm:text-[0.9375rem]">
                    E-mail
                  </h3>
                  <a
                    href="mailto:agencebsconsulting@gmail.com"
                    className="mt-2 block break-all text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
                  >
                    agencebsconsulting@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 p-5 sm:p-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/18 text-secondary ring-1 ring-secondary/25"
                  aria-hidden
                >
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-sm font-bold text-primary sm:text-[0.9375rem]">
                    Adresse
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-foreground/75">
                    Keur Massar, derrière Sedima
                    <br />
                    en face Djolof Chicken
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-center lg:mt-9">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-md shadow-secondary/25 hover:bg-secondary/90"
            >
              <a href="https://wa.me/221776211688" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
                Discuter sur WhatsApp
              </a>
            </Button>
          </div>
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
