# Confidential Wrapper Registry

Bounty-track submission for **Zama Developer Program — Season 3** (Composable Privacy).

Live app: **https://wrapper-registry.vercel.app**

Judges can connect a wallet on Sepolia, browse every official wrapper pair, mint test tokens, shield, decrypt balances, and unshield — without installing anything locally.

---

## What this app does

It is a front-end for the [official Zama Wrappers Registry](https://docs.zama.org/protocol/protocol-apps/confidential-tokens/wrapper-registry). You pick an ERC-20 ↔ ERC-7984 pair, mint underlying tokens from the Sepolia faucet (where available), wrap them into confidential form, decrypt your own balance with EIP-712, and unwrap back when you want.

Marketing landing page lives at `/`. The working console is at `/app`.

---

## Repository layout (contracts + frontend in one repo)

```
wrapper-registry/
  contracts/   ← Solidity interfaces + deployment notes (official Zama registry)
  frontend/    ← Next.js dApp (this is what runs on Vercel)
packages/shared/   ← shared registry UI, wrap/decrypt hooks (monorepo root)
```

This track does not deploy custom registry contracts — `contracts/` documents the onchain integration surface. The frontend calls the official Wrappers Registry and ERC-7984 wrappers via `@zama-fhe/sdk`.

---

## Supported networks

| Network | Registry contract | Faucet |
|---------|-------------------|--------|
| **Sepolia** (primary demo) | `0x2f0750Bbb0A246059d80e94c454586a7F27a128e` | Yes — official cTokenMocks |
| **Ethereum Mainnet** | `0xeb5015fF021DB115aCe010f23F55C2591059bBA0` | No (browse + wrap/unwrap only) |

Switch networks from the dropdown in the app header. Wagmi + the connect button handle wallet network prompts.

---

## How the registry is sourced (hybrid)

**1. Onchain (primary)**  
Pairs are read from the Wrappers Registry contract using paginated `getTokenConfidentialTokenPairsSlice` calls (50 pairs per page). Only pairs marked `isValid` are shown.

**2. Local config (secondary)**  
`packages/shared/src/constants.ts` → `LOCAL_REGISTRY_PAIRS` lets you declare dev-only or not-yet-indexed pairs. Local entries show a **Local** badge; onchain entries show **Registry**. If the same pair later appears onchain, the local duplicate is dropped automatically.

**3. Metadata**  
For each pair we read `name`, `symbol`, and `decimals` from the underlying ERC-20. Wrap, unwrap, faucet mint, and balance display all use the token's real decimals (6 for USDCMock-style mocks, 18 for WETHMock / tGBP / etc.).

---

## Official Sepolia cTokenMocks (all 8 pairs)

These are the valid pairs currently returned from the onchain registry on Sepolia:

| Symbol | Decimals | ERC-20 | ERC-7984 wrapper |
|--------|----------|--------|------------------|
| USDCMock | 6 | `0x9b5Cd13b8aDFfF` | `0x7c5BF43B223639` |
| USDTMock | 6 | `0xa7dA08Fa` | `0x4E7B06D7` |
| WETHMock | 18 | `0xff54739b` | `0x46208622` |
| BRONMock | 18 | `0xFf021fB1` | `0xaa5612FA` |
| ZAMAMock | 18 | `0x75355a85` | `0xf2D628d2` |
| tGBPMock | 18 | `0x93c93127` | `0xfCE5c706` |
| XAUtMock | 6 | `0x24377AE4` | `0xe4FcF848` |
| tGBP | 18 | `0xf6Ef9ADB` | `0x167DC962` |

Every pair above supports shield (wrap), unshield (unwrap), and EIP-712 balance decryption in the app.

---

## Feature walkthrough (what judges should try)

### Browse registry
Open `/app` → Sepolia → expand the registry panel. Each row shows symbol, both addresses, decimal count, and validity.

### Faucet (Sepolia only)
Select an underlying ERC-20 → enter amount → **Mint Test Tokens**. Public `mint` on cTokenMocks, capped at 1,000,000 whole tokens per call.

### Wrap (ERC-20 → ERC-7984)
Select a pair → enter amount → **Shield (Wrap)**. The Zama SDK handles ERC-20 approval and the shield transaction. Tx hash is shown on success.

### Decrypt
- **Per pair:** **Decrypt ERC-7984 Balance** in the wrap panel.
- **All holdings:** **Decrypt My Wrapped Holdings** batches every registry wrapper in one EIP-712 flow.
- **Any token:** **Decrypt Any ERC-7984 Token** — pick from holdings/registry or paste an address (no registry membership required). Set display decimals manually when pasting.

### Unwrap (ERC-7984 → ERC-20)
Same amount field → **Unshield (Unwrap)**. Pending unshields are tracked in IndexedDB per SDK guidance.

---

## Adding a new ERC-20 ↔ ERC-7984 pair

Edit `packages/shared/src/constants.ts`:

```typescript
export const LOCAL_REGISTRY_PAIRS: Record<SupportedChainKey, TokenWrapperPair[]> = {
  sepolia: [
    {
      tokenAddress: "0xYourErc20Address",
      confidentialTokenAddress: "0xYourErc7984Wrapper",
      isValid: true,
    },
  ],
  mainnet: [],
};
```

Rebuild and redeploy. The pair appears with a **Local** badge.

For production, register the pair onchain via [Zama's wrapper registration process](https://docs.zama.org/protocol/protocol-apps/confidential-tokens/wrapper-registry) so it is picked up automatically — local config is meant for dev/staging.

---

## Tech stack

- **Next.js 15** (App Router) — `wrapper-registry/`
- **Shared UI + registry logic** — `packages/shared/` (`@zama-season3/shared`)
- **wagmi / viem** — wallet + RPC
- **`@zama-fhe/sdk` v3 + `@zama-fhe/react-sdk` v3** — shield, unshield, EIP-712 decrypt, relayer encryption

---

## Run locally

From the monorepo root:

```bash
npm install
npm run dev:bounty    # http://localhost:3000
```

Optional env (copy `wrapper-registry/.env.example` → `wrapper-registry/.env.local`):

```env
NEXT_PUBLIC_SEPOLIA_RPC=https://ethereum-sepolia-rpc.publicnode.com
NEXT_PUBLIC_MAINNET_RPC=https://ethereum-rpc.publicnode.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_RELAYER_PROXY=
```

---

## Deploy to Vercel

1. Import this repo on [vercel.com/new](https://vercel.com/new).
2. **Root Directory:** `wrapper-registry/frontend`
3. Install command is already set in `vercel.json`: `cd ../.. && npm install`
4. Add the env vars above.
5. Deploy.

CLI (from monorepo root, with `.vercel/project.json` linked to the wrapper-registry project):

```bash
npx vercel@latest --prod --yes
```

---

## Error handling

The app surfaces readable errors for:

- Wallet not connected / wrong network
- Invalid amounts or addresses
- Faucet mint over cap
- Insufficient confidential balance on unwrap
- Tokens never shielded (`NoCiphertextError` → friendly empty state)
- Relayer / decrypt failures from the SDK

---

## Submission checklist

| Requirement | Status |
|-------------|--------|
| Public GitHub repo with full source | This repo |
| Live URL judges can use | https://wrapper-registry.vercel.app |
| Sepolia wrap / unwrap / decrypt | Yes |
| Hybrid onchain + local registry | Yes |
| All official Sepolia cTokenMocks | 8/8 |
| Arbitrary ERC-7984 decrypt | Yes (paste or pick) |
| README: URL, networks, registry, add-pair, deploy | This file |
| Demo video (real person) | Recorded (~4 min — over the 3 min guideline; kept as-is) |
| X thread / article | Publish separately before deadline |

Submit via [Zama Developer Hub](https://www.zama.org/developer-hub#developer-program) · **Deadline:** July 7, 2026, 23:59 AOE

Demo script reference: [`docs/VIDEO_SCRIPT_TRACK1.md`](../docs/VIDEO_SCRIPT_TRACK1.md)

---

## Repo layout (monorepo note)

This GitHub repo is a small monorepo. The bounty submission lives in `wrapper-registry/` plus shared code in `packages/shared/`. The same repo also contains my other Season 3 tracks (`factor/`, `confidential-distribute/`) — those are separate submissions and not required to run the Wrapper Registry app.
