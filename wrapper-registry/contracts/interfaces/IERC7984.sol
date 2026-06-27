// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title IERC7984
/// @notice Confidential fungible token (ERC-7984) — balance and transfer semantics used by wrap/unshield flows.
interface IERC7984 {
    function confidentialTotalSupply() external view returns (uint256);
    function confidentialBalanceOf(address account) external view returns (uint256);
    function isOperator(address holder, address spender) external view returns (bool);
    function setOperator(address operator, uint48 until) external;
}
