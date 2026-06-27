# Wrapper Registry — 3-Minute Bounty Video Pitch (Updated)

**Track:** Bounty · up to **3,000 cUSDT**  
**Target length:** **2:50 – 3:10** (hard stop at 3:15)  
**Live demo:** https://wrapper-registry.vercel.app  
**App URL:** https://wrapper-registry.vercel.app/app  
**Sepolia registry:** `0x2f0750Bbb0A246059d80e94c454586a7F27a128e`  
**Mainnet registry:** `0xeb5015fF021DB115aCe010f23F55C2591059bBA0`

---

## Timing guide (read this first)

| Rule | Value |
|------|--------|
| Comfortable speaking pace | **125–130 words per minute** |
| Max spoken words for 3:00 | **~340 words** if you demo while talking |
| This script spoken total | **~310 words** |
| Silent demo time baked in | **~70 seconds** (wallet popups, txs, scrolling) |

**How to use this doc:**  
- **SAY** = read aloud (word count in brackets).  
- **DO** = on-screen action — **stop talking** while the wallet or tx runs.  
- **PAUSE 3s** = let judges read the UI.

---

## Before you record

- [ ] MetaMask on **Sepolia** (flash **Mainnet** for 5 sec via network dropdown)  
- [ ] Sepolia test ETH  
- [ ] 1080p screen capture, mic tested  
- [ ] Rehearse once: landing → app → faucet → wrap → decrypt → unwrap → arbitrary decrypt  
- [ ] Optional: second ERC-7984 address to paste in “Decrypt any token”

**Judges must see on video:** registry browse · faucet · wrap · decrypt · unwrap · arbitrary decrypt · how to add a pair

---

## FULL SCRIPT

### [0:00 – 0:18] HOOK — landing page (~45 words)

**DO:** Open **https://wrapper-registry.vercel.app** — hero video playing, headline visible.

**SAY:**

> Hi, I'm **[your name]**. This is the **Confidential Wrapper Registry** — the official explorer for Zama's ERC-20 to ERC-7984 wrapper pairs. **[Season 3 Bounty submission.]**
>
> Every confidential app needs the same canonical tokens. This product turns the onchain registry into something anyone can use.

**[42 words]**

**DO:** Scroll **once** past “How it works” — don't linger. Click **Open Registry App** in the header.

---

### [0:18 – 0:35] LANDING → APP (~40 words + 5s silence)

**DO:** You land on **/app** — “Registry explorer” title, network dropdown top-right.

**SAY:**

> The marketing site explains the product. The **app** is where you work: browse pairs, shield tokens, decrypt balances, and use the Sepolia faucet.

**DO:** Click **Connect Wallet** → approve Sepolia. **PAUSE** for connection.

**SAY:**

> I connect on **Sepolia**.

**[38 words + wallet pause]**

---

### [0:35 – 0:55] BROWSE REGISTRY (~50 words + 8s silence)

**DO:** Point at stats strip (pair count, network, registry contract). Scroll to **Wrapper Registry** panel — collapsed preview shows ~8 pairs.

**SAY:**

> Pairs load from Zama's **official Wrappers Registry** — paginated onchain reads. The preview shows the first entries; I expand for the full table with metadata: symbol, decimals, and status.

**DO:** Click **View all N pairs** → expand table. Click **Select** on one pair (e.g. USDC wrapper). **PAUSE 3s.**

**SAY:**

> I **select** a pair — that drives wrap, unwrap, and decrypt below.

**[48 words]**

**DO:** Open **network dropdown** → choose **Ethereum Mainnet** for 3 seconds → switch back to **Sepolia**.

**SAY:**

> Same registry on **mainnet** — production wrappers; faucet stays on Sepolia only.

**[12 words]**

---

### [0:55 – 1:15] FAUCET (~35 words + 12s silence)

**DO:** Scroll right column or down to **Test token faucet** (Sepolia).

**SAY:**

> Judges need tokens without hunting faucets. The **test token faucet** mints official cTokenMocks on Sepolia.

**DO:** Pick underlying token → amount **10** → **Mint** (or equivalent faucet button) → **confirm wallet. SILENCE until tx confirms.**

**SAY:**

> Now I have public ERC-20 to shield.

**[32 words]**

---

### [1:15 – 1:35] WRAP (~30 words + 12s silence)

**DO:** **Shield & unshield** panel — amount e.g. **5** → **Shield (Wrap)** → confirm. **SILENCE.**

**SAY:**

> **Shield** uses the Zama SDK — approve, then wrap into confidential ERC-7984. My balance is now **encrypted onchain**.

**[22 words]**

---

### [1:35 – 1:55] DECRYPT (~40 words + 10s silence)

**DO:** Either **Decrypt** in shield panel **or** **My wrapped holdings** → batch decrypt. Sign EIP-712. **SILENCE.**

**SAY:**

> **Decrypt** via EIP-712 — one signature, relayer returns cleartext **only to me**. That number never appeared on Etherscan.

**DO:** Hold decrypted value on screen **3 seconds**.

**[28 words]**

---

### [1:55 – 2:10] UNSHIELD (~25 words + 10s silence)

**DO:** **Unshield (Unwrap)** → small amount → confirm. **SILENCE.**

**SAY:**

> Full round trip: mint, wrap, decrypt, unwrap.

**[10 words]**

---

### [2:10 – 2:28] DECRYPT ANY TOKEN (~45 words + 8s silence)

**DO:** Scroll to **Decrypt any token**. Paste a **different** ERC-7984 address OR pick from holdings dropdown → **Decrypt** → sign.

**SAY:**

> Bounty spec requires decrypting **any** ERC-7984 — not only registry selections. **Decrypt any token** accepts a pasted address or a holding from my wallet. Same EIP-712 flow; registry membership not required.

**[38 words]**

---

### [2:28 – 2:45] EXTENSIBILITY (~40 words)

**DO:** Optional: flash GitHub README `LOCAL_REGISTRY_PAIRS` for 5 sec.

**SAY:**

> **Hybrid registry:** onchain pairs are primary; dev pairs merge from **`LOCAL_REGISTRY_PAIRS`** in shared config — documented in our README with a **Local** badge in the UI.

**[28 words]**

---

### [2:45 – 3:05] CLOSE (~50 words)

**DO:** Back to **/** landing or end card.

**SAY:**

> **Wrapper Registry** — browse, shield, decrypt, and faucet on Sepolia and mainnet. Built with **FHEVM SDK v3**, Next.js, and the official Zama registry.

> Try it: **wrapper-registry.vercel.app**. Links below. Thanks — **#ZamaDeveloperProgram**.

**[42 words]**

**DO:** End card 3 seconds:

```
Confidential Wrapper Registry
https://wrapper-registry.vercel.app
Sepolia: 0x2f0750Bbb0A246059d80e94c454586a7F27a128e
```

---

## UI click map (2026 layout)

| Step | Where | What to click |
|------|--------|----------------|
| Enter app | Landing header or hero | **Open Registry App** |
| Network | App top bar dropdown | **Sepolia Testnet** / **Ethereum Mainnet** |
| Browse | Left column registry | Preview → **View all N pairs** → **Select** |
| Faucet | Right column (Sepolia) | **Test token faucet** → mint |
| Wrap | Right column | **Shield & unshield** → **Shield (Wrap)** |
| Decrypt | Holdings or shield panel | EIP-712 decrypt button |
| Unwrap | Shield panel | **Unshield (Unwrap)** |
| Any token | Right column | **Decrypt any token** |

---

## YouTube / Loom description

```
Confidential Wrapper Registry | Zama Season 3 Bounty

Official ERC-20 ↔ ERC-7984 explorer: marketing site + app console.
Browse registry, Sepolia faucet, wrap/unshield, EIP-712 decrypt, decrypt any ERC-7984.

🔗 https://wrapper-registry.vercel.app
📜 Sepolia: 0x2f0750Bbb0A246059d80e94c454586a7F27a128e

#ZamaDeveloperProgram #FHE #FHEVM #ERC7984
```

---

## If you're over 3:15 — cut these first

1. Mainnet network flash (save 8 sec)  
2. Extensibility README flash (save 12 sec)  
3. Shorten hook problem to: *"One canonical UI for every official wrapper pair."*
