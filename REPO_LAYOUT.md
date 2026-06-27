# Repository layout

This repo contains **one submission track** with smart contracts and frontend in the same repository:

```
wrapper-registry/
  contracts/   ← onchain interfaces + deployment references
  frontend/    ← Next.js dApp
packages/shared/   ← shared Zama UI + registry helpers
```

Vercel **Root Directory:** `wrapper-registry/frontend`

```bash
npm install
npm run dev -w wrapper-registry
```
