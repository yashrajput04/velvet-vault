import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Facebook,
  Headphones,
  Instagram,
  Linkedin,
  LockKeyhole,
  Menu,
  PackageCheck,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import heroImage from "@/assets/hero-luxury.jpg";
import bikesImage from "@/assets/category-bikes.jpg";
import clothesImage from "@/assets/category-clothes.jpg";
import perfumesImage from "@/assets/category-perfumes.jpg";
import watchesImage from "@/assets/category-watches.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUREL — Objects of Distinction" },
      {
        name: "description",
        content:
          "Discover AUREL's curated world of fine watches, motorcycles, fragrance, and fashion.",
      },
      { property: "og:title", content: "AUREL — Objects of Distinction" },
      {
        property: "og:description",
        content:
          "Exceptional objects for those who choose with intention. Explore the AUREL collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  {
    name: "Watches",
    label: "01 / Horology",
    tagline: "Time, made exceptional.",
    image: watchesImage,
  },
  {
    name: "Bikes",
    label: "02 / Motion",
    tagline: "Engineered for the uncommon road.",
    image: bikesImage,
  },
  {
    name: "Perfumes",
    label: "03 / Scent",
    tagline: "Leave an unforgettable impression.",
    image: perfumesImage,
  },
  {
    name: "Clothes",
    label: "04 / Atelier",
    tagline: "A study in modern form.",
    image: clothesImage,
  },
];

const trustItems = [
  { icon: PackageCheck, title: "Complimentary Delivery", note: "On every order" },
  { icon: LockKeyhole, title: "Secure Payment", note: "Protected checkout" },
  { icon: Headphones, title: "Private Assistance", note: "Available 24/7" },
  { icon: RotateCcw, title: "Considered Returns", note: "Within 30 days" },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
      <a href="#top" className="brand-mark" aria-label="AUREL home">
        AUREL<span>.</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#services">Services</a>
      </nav>

      <div className="header-actions">
        <a href="#login" className="login-button">
          Login
        </a>
        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>
            <span>01</span> About
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            <span>02</span> Services
          </a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>
            <span>03</span> Collection
          </a>
        </nav>
      </div>
    </header>
  );
}

function Index() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <Header />

      <section className="hero-section" aria-labelledby="hero-title">
        <img
          src={heroImage}
          alt="A model in black tailoring beside a sculptural black motorcycle"
          width={1920}
          height={1280}
          className="hero-image"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow hero-entrance">The new standard · Est. 2026</p>
          <h1 id="hero-title" className="hero-title hero-entrance">
            Redefine your
            <br />
            <em>everyday luxury.</em>
          </h1>
          <p className="hero-copy hero-entrance">
            Exceptional objects. Enduring design. A collection for those who choose with intention.
          </p>
          <a href="#collection" className="primary-cta hero-entrance">
            Shop the collection <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll to discover">
          <span>Discover</span>
          <ArrowDown size={16} aria-hidden="true" />
        </a>
        <p className="hero-index">Edition No. 01</p>
      </section>

      <section id="about" className="manifesto-section">
        <Reveal className="manifesto-inner">
          <p className="eyebrow">The AUREL philosophy</p>
          <p className="manifesto-copy">
            We seek the rare balance between <em>purpose</em> and presence—objects that do more than
            belong. They become part of your story.
          </p>
          <div className="manifesto-rule">
            <span>Curated globally</span>
            <span>Made to endure</span>
          </div>
        </Reveal>
      </section>

      <section id="collection" className="collection-section" aria-labelledby="collection-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Objects of distinction</p>
            <h2 id="collection-title">Shop by category</h2>
          </div>
          <p>Four worlds. One uncompromising point of view.</p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Reveal key={category.name} className="category-reveal">
              <article className="category-card">
                <img
                  src={category.image}
                  alt={`${category.name} collection`}
                  width={1200}
                  height={1504}
                  loading="lazy"
                />
                <div className="category-shade" />
                <div className="category-meta">
                  <p>{category.label}</p>
                  <div>
                    <h3>{category.name}</h3>
                    <span>{category.tagline}</span>
                  </div>
                  <a href={`#${category.name.toLowerCase()}`}>
                    Explore collection <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="trust-strip" aria-label="Our services">
        {trustItems.map(({ icon: Icon, title, note }) => (
          <div className="trust-item" key={title}>
            <Icon size={21} strokeWidth={1.4} aria-hidden="true" />
            <div>
              <strong>{title}</strong>
              <span>{note}</span>
            </div>
          </div>
        ))}
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand-mark" aria-label="AUREL home">
              AUREL<span>.</span>
            </a>
            <p>Objects of distinction for a life lived deliberately.</p>
          </div>
          <div className="footer-column">
            <p>Explore</p>
            <a href="#collection">Collections</a>
            <a href="#about">Our philosophy</a>
            <a href="#services">Client services</a>
          </div>
          <div className="footer-column">
            <p>Information</p>
            <a href="#shipping">Shipping & returns</a>
            <a href="#care">Care guide</a>
            <a href="#terms">Terms & conditions</a>
          </div>
          <div className="footer-social">
            <p>Follow AUREL</p>
            <div>
              <a href="#instagram" aria-label="Instagram"><Instagram /></a>
              <a href="#facebook" aria-label="Facebook"><Facebook /></a>
              <a href="#x" aria-label="X"><span aria-hidden="true">𝕏</span></a>
              <a href="#linkedin" aria-label="LinkedIn"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 AUREL. All rights reserved.</p>
          <p>Designed for the exceptional.</p>
        </div>
      </footer>
    </main>
  );
}