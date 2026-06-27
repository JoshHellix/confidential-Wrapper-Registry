"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { CopyIcon, EyeIcon, LockIcon, RefreshIcon, ZapIcon } from "@/components/icons";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import {
  ConnectButton,
  RegistryBrowser,
  WrapUnwrapPanel,
  WrappedHoldingsPanel,
  FaucetPanel,
  ArbitraryDecryptPanel,
  fetchEnrichedRegistryPairs,
  WRAPPERS_REGISTRY,
  CHAIN_IDS,
  shortenAddress,
  type DecryptTokenOption,
  type EnrichedTokenWrapperPair,
  type SupportedChainKey,
  type TokenWrapperPair,
} from "@zama-season3/shared";

const NETWORKS: { key: SupportedChainKey; label: string; hint: string }[] = [
  { key: "sepolia", label: "Sepolia Testnet", hint: "Faucet · test tokens" },
  { key: "mainnet", label: "Ethereum Mainnet", hint: "Official registry" },
];

function NetworkSelect({
  value,
  onChange,
}: {
  value: SupportedChainKey;
  onChange: (key: SupportedChainKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = NETWORKS.find((n) => n.key === value)!;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="wr-network" ref={ref}>
      <button
        type="button"
        className="wr-network-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="wr-network-label">{current.label}</span>
        <span className="wr-network-chevron" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <ul className="wr-network-menu" role="listbox">
          {NETWORKS.map((n) => (
            <li key={n.key}>
              <button
                type="button"
                role="option"
                aria-selected={n.key === value}
                className={n.key === value ? "is-active" : ""}
                onClick={() => {
                  onChange(n.key);
                  setOpen(false);
                }}
              >
                <span>{n.label}</span>
                <span className="wr-network-hint">{n.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RegistryApp() {
  const [chainKey, setChainKey] = useState<SupportedChainKey>("sepolia");
  const [selected, setSelected] = useState<TokenWrapperPair | null>(null);
  const [registryCopied, setRegistryCopied] = useState(false);
  const [walletTokens, setWalletTokens] = useState<DecryptTokenOption[]>([]);
  const queryClient = useQueryClient();
  const publicClient = usePublicClient({ chainId: CHAIN_IDS[chainKey] });

  const registryAddress = WRAPPERS_REGISTRY[chainKey];

  const { data: registryPairs = [], isFetching } = useQuery({
    queryKey: ["registry-pairs-enriched", chainKey],
    queryFn: async () => {
      if (!publicClient) return [];
      return fetchEnrichedRegistryPairs(publicClient, chainKey);
    },
    enabled: !!publicClient,
  });

  const registryTokenOptions = useMemo(
    () =>
      (registryPairs as EnrichedTokenWrapperPair[]).map((pair) => ({
        address: pair.confidentialTokenAddress,
        label: pair.symbol
          ? `${pair.symbol} (${shortenAddress(pair.confidentialTokenAddress, 6)})`
          : shortenAddress(pair.confidentialTokenAddress, 8),
        decimals: pair.decimals ?? 6,
      })),
    [registryPairs],
  );

  function switchNetwork(key: SupportedChainKey) {
    setChainKey(key);
    setSelected(null);
    setWalletTokens([]);
  }

  function copyRegistryAddress() {
    void navigator.clipboard.writeText(registryAddress);
    setRegistryCopied(true);
    setTimeout(() => setRegistryCopied(false), 2000);
  }

  return (
    <main className="registry-page registry-app-page">
      <SiteHeader />
      <div className="registry-app-bar">
        <div className="registry-container registry-app-bar-inner">
          <div>
            <h1 className="registry-app-title">Registry explorer</h1>
            <p className="registry-app-sub">Browse pairs, shield tokens, and decrypt balances.</p>
          </div>
          <div className="registry-header-actions">
            <NetworkSelect value={chainKey} onChange={switchNetwork} />
            <ConnectButton />
          </div>
        </div>
      </div>

      <div className="registry-container registry-body-pad">
        <div className="registry-stats">
          <div className="registry-stat">
            <span className="registry-stat-value">{registryPairs.length}</span>
            <span className="registry-stat-label">Token pairs</span>
          </div>
          <div className="registry-stat">
            <span className="registry-stat-value">{chainKey === "sepolia" ? "Testnet" : "Mainnet"}</span>
            <span className="registry-stat-label">Network</span>
          </div>
          <div className="registry-stat registry-stat-wide">
            <span className="registry-stat-label">Registry contract</span>
            <div className="registry-address-row">
              <code>{shortenAddress(registryAddress, 8)}</code>
              <button
                type="button"
                className="registry-icon-btn"
                onClick={copyRegistryAddress}
                title="Copy registry address"
                aria-label="Copy registry address"
              >
                <CopyIcon size={14} className={registryCopied ? "text-accent" : "text-muted"} />
              </button>
              {registryCopied && <span className="registry-copied">Copied</span>}
            </div>
          </div>
        </div>

        <div className="registry-main-grid registry-shell">
          <section className="registry-panel registry-panel-compact">
            <div className="registry-section-head">
              <button
                type="button"
                className="registry-icon-btn"
                aria-label="Refresh registry"
                disabled={isFetching}
                onClick={() => void queryClient.invalidateQueries({ queryKey: ["registry-pairs-enriched"] })}
              >
                <RefreshIcon size={16} className={isFetching ? "is-spinning text-muted" : "text-muted"} />
              </button>
            </div>
            <RegistryBrowser
              chainKey={chainKey}
              selected={selected}
              onSelect={setSelected}
              previewRows={8}
            />
          </section>

          <div className="registry-right-col">
            <section className="registry-panel">
              <h2 className="registry-section-title">
                <EyeIcon size={18} />
                My wrapped holdings
              </h2>
              <WrappedHoldingsPanel
                pairs={registryPairs}
                onSelect={setSelected}
                onWalletTokensChange={setWalletTokens}
              />
            </section>

            <section className="registry-panel">
              <h2 className="registry-section-title">
                <LockIcon size={18} />
                Shield &amp; unshield
              </h2>
              <WrapUnwrapPanel pair={selected} />
            </section>

            <section className="registry-panel">
              <h2 className="registry-section-title">
                <EyeIcon size={18} />
                Decrypt any token
              </h2>
              <ArbitraryDecryptPanel walletTokens={walletTokens} registryTokens={registryTokenOptions} />
            </section>

            {chainKey === "sepolia" ? (
              <section className="registry-panel">
                <h2 className="registry-section-title">
                  <ZapIcon size={18} />
                  Test token faucet
                </h2>
                <FaucetPanel pairs={registryPairs} />
              </section>
            ) : (
              <div className="registry-panel registry-panel-info">
                <p className="card-info-title">
                  <EyeIcon size={16} />
                  Mainnet registry
                </p>
                <p className="card-info-text">
                  Browse official token pairs on Ethereum Mainnet. Faucet is available on Sepolia only.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
