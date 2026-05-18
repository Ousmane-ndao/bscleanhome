"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, MessageCircle, Phone, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mainNavLinks } from "@/lib/navigation"

type SiteNavbarProps = {
  cartCount?: number
  onCartOpen?: () => void
  currentPath?: string
}

export function SiteNavbar({ cartCount = 0, onCartOpen, currentPath }: SiteNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      currentPath === href
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`

  return (
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
            {mainNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {onCartOpen && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="relative rounded-full"
                onClick={onCartOpen}
                aria-label={`Panier${cartCount > 0 ? `, ${cartCount} article${cartCount > 1 ? "s" : ""}` : ""}`}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            )}
            <a
              href="tel:+221776211688"
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              77 621 16 88
            </a>
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6 shadow-lg shadow-secondary/20"
            >
              <a href="https://wa.me/221776211688" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            {onCartOpen && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="relative rounded-full"
                onClick={onCartOpen}
                aria-label={`Panier${cartCount > 0 ? `, ${cartCount} articles` : ""}`}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-0.5 text-[9px] font-bold text-secondary-foreground">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Button>
            )}
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={
                mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"
              }
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-4 py-6 space-y-4">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-lg font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              {onCartOpen && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => {
                    onCartOpen()
                    setMobileMenuOpen(false)
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Panier{cartCount > 0 ? ` (${cartCount})` : ""}
                </Button>
              )}
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
  )
}
