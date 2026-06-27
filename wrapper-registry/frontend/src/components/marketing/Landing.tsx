"use client";

import Link from "next/link";
import {
  faArrowRight,
  faBook,
  faEye,
  faLock,
  faShieldHalved,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { SiteHeader } from "./SiteHeader";
import { ScrollReveal } from "./ScrollReveal";
import { FaIcon } from "@/components/FaIcon";

function HeroVideo() {
  return (
    <div className="wr-hero-media" aria-hidden>
      <div className="wr-hero-video-frame">
        <video className="wr-hero-video" autoPlay muted loop playsInline>
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="wr-hero-watermark-shield" />
      <div className="wr-hero-overlay" />
    </div>
  );
}

export function LandingPage() {
  const steps = [
    {
      n: "01",
      icon: faTableList,
      title: "Browse",
      desc: "Official ERC-20 ↔ ERC-7984 pairs from the onchain registry.",
    },
    {
      n: "02",
      icon: faShieldHalved,
      title: "Shield",
      desc: "Wrap public tokens into confidential balances your wallet controls.",
    },
    {
      n: "03",
      icon: faEye,
      title: "Decrypt",
      desc: "Reveal your balance via EIP-712 — cleartext never hits the chain.",
    },
  ];

  const features = [
    { icon: faBook, label: "Onchain registry", detail: "Sepolia & Mainnet" },
    { icon: faLock, label: "ERC-7984 wrappers", detail: "FHE-protected balances" },
    { icon: faShieldHalved, label: "Shield & unshield", detail: "One connected flow" },
  ];

  return (
    <main className="wr-landing">
      <SiteHeader />
      <section className="wr-hero">
        <HeroVideo />
        <div className="registry-container wr-hero-inner">
          <ScrollReveal>
            <p className="wr-eyebrow">
              <FaIcon icon={faLock} className="wr-eyebrow-icon" size="sm" />
              Zama FHEVM · Season 3 Bounty
            </p>
            <h1 className="wr-hero-title">Private balances. Public composability.</h1>
            <p className="wr-hero-lead">
              The official explorer for confidential ERC-7984 wrappers — shield, hold, and decrypt without exposing
              balances onchain.
            </p>
            <div className="wr-hero-cta">
              <Link href="/app" className="wr-btn wr-btn-primary wr-btn-lg wr-btn-icon">
                Open Registry App
                <FaIcon icon={faArrowRight} size="sm" />
              </Link>
              <a href="#how" className="wr-btn wr-btn-outline wr-btn-lg">
                How wrapping works
              </a>
            </div>
            <ul className="wr-hero-features">
              {features.map((f) => (
                <li key={f.label}>
                  <FaIcon icon={f.icon} className="wr-hero-feature-icon" />
                  <span>
                    <strong>{f.label}</strong>
                    <small>{f.detail}</small>
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section id="how" className="wr-section">
        <div className="registry-container">
          <ScrollReveal className="wr-section-head">
            <h2>How it works</h2>
            <p>Three steps from public ERC-20 to encrypted ERC-7984.</p>
          </ScrollReveal>
          <div className="row g-4 wr-steps-row">
            {steps.map((s) => (
              <div key={s.n} className="col-md-4">
                <ScrollReveal>
                  <article className="wr-step-card">
                    <div className="wr-step-icon-wrap">
                      <FaIcon icon={s.icon} />
                    </div>
                    <span className="wr-step-num">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </article>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="wr-section wr-section-alt">
        <div className="registry-container">
          <div className="row g-4 g-lg-5 align-items-center wr-split-row">
            <div className="col-lg-6">
              <ScrollReveal>
                <h2>Encrypted onchain, readable by you</h2>
                <p className="wr-split-lead">
                  Wrapped balances stay confidential on Ethereum. Apps can compose with ERC-7984 tokens while amounts
                  remain encrypted until you authorize decryption through the Zama relayer.
                </p>
                <ul className="wr-checklist">
                  <li>
                    <FaIcon icon={faTableList} className="wr-check-icon" />
                    Hybrid registry: onchain pairs + local test tokens
                  </li>
                  <li>
                    <FaIcon icon={faShieldHalved} className="wr-check-icon" />
                    Sepolia faucet for quick demos
                  </li>
                  <li>
                    <FaIcon icon={faEye} className="wr-check-icon" />
                    Decrypt any ERC-7984 you hold
                  </li>
                </ul>
              </ScrollReveal>
            </div>
            <div className="col-lg-6">
              <ScrollReveal>
                <div className="wr-mock-panel">
                  <p className="wr-mock-label">
                    <FaIcon icon={faLock} size="sm" /> Balance
                  </p>
                  <p className="wr-mock-value">●●●●●● USDC</p>
                  <p className="wr-mock-caption">Encrypted until EIP-712 decrypt</p>
                  <div className="wr-mock-bar" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="wr-section wr-cta-section">
        <div className="registry-container wr-cta-inner">
          <ScrollReveal>
            <h2>Ready to explore the registry?</h2>
            <p>The full app lives on a dedicated page — connect your wallet and browse official pairs.</p>
            <Link href="/app" className="wr-btn wr-btn-primary wr-btn-lg wr-btn-icon">
              Go to Registry App
              <FaIcon icon={faArrowRight} size="sm" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <footer className="wr-footer">
        <div className="registry-container">
          <p>Confidential Wrapper Registry · Zama Developer Program Season 3</p>
        </div>
      </footer>
    </main>
  );
}
