// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IConfidentialTokenWrappersRegistry
/// @notice Minimal interface for the official Zama Wrappers Registry (Sepolia + Mainnet).
/// @dev This app reads pairs onchain; we do not deploy a custom registry in this track.
interface IConfidentialTokenWrappersRegistry {
    struct TokenConfidentialTokenPair {
        address tokenAddress;
        address confidentialTokenAddress;
        bool isValid;
    }

    function getTokenConfidentialTokenPairsLength() external view returns (uint256);

    function getTokenConfidentialTokenPairsSlice(
        uint256 fromIndex,
        uint256 toIndex
    ) external view returns (TokenConfidentialTokenPair[] memory);

    function getConfidentialTokenAddress(address tokenAddress)
        external
        view
        returns (bool isValid, address confidentialTokenAddress);

    function isConfidentialTokenValid(address confidentialTokenAddress) external view returns (bool);
}
