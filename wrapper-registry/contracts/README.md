# Wrapper Registry — contracts

This bounty track does **not** deploy custom production contracts. The dApp integrates with **official Zama protocol contracts** on Sepolia and Mainnet.

## What lives here

| Path | Purpose |
|------|---------|
| `interfaces/IConfidentialTokenWrappersRegistry.sol` | Registry read API used by the frontend |
| `interfaces/IERC7984.sol` | Confidential token interface for wrap/decrypt flows |

## Deployed contracts (external)

| Network | Wrappers Registry |
|---------|-------------------|
| Sepolia | `0x2f0750Bbb0A246059d80e94c454586a7F27a128e` |
| Mainnet | `0xeb5015fF021DB115aCe010f23F55C2591059bBA0` |

Wrap, unshield, and EIP-712 decrypt are executed via `@zama-fhe/sdk` against official ERC-7984 wrapper tokens listed in the registry.

Frontend code: [`../frontend/`](../frontend/)
