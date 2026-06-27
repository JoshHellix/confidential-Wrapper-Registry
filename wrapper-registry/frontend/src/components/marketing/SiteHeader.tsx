"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { ConnectButton } from "@zama-season3/shared";
import { FaIcon } from "@/components/FaIcon";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onApp = pathname.startsWith("/app");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`wr-site-header ${scrolled || onApp ? "wr-site-header-scrolled" : !onApp ? "wr-site-header-hero" : ""}`}
    >
      <div className="registry-container wr-site-header-row">
        <Link href="/" className="wr-brand">
          <span className="wr-brand-mark">
            <FaIcon icon={faLock} size="sm" />
          </span>
          <span className="wr-brand-name">Wrapper Registry</span>
        </Link>
        <nav className="wr-nav" aria-label="Sections">
          <Link href="/#how">How it works</Link>
          <Link href="/#privacy">Privacy</Link>
          <Link href="/app" className={onApp ? "wr-nav-active" : undefined}>
            App
          </Link>
        </nav>
        <div className="wr-header-actions">
          {onApp ? (
            <Link href="/" className="wr-btn wr-btn-outline wr-btn-sm">
              Overview
            </Link>
          ) : (
            <Link href="/app" className="wr-btn wr-btn-primary wr-btn-sm">
              Open Registry
            </Link>
          )}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
