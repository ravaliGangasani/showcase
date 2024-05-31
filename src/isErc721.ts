import * as ethers from "ethers";
import * as erc721 from "./abi/erc721";

/**
 * A rather crude test for whether a deployed contract implements ERC721. Limitations:
 * - will return a false negative on proxy contracts;
 * - will return a false positive on contracts deliberately pretending to comply to
 *   ERC721 using constants (see https://ethereum.stackexchange.com/questions/124084/).
 *
 * If your use case requires good performance on these types of contracts, consider
 * implementing solutions based on the estimateGas call or contract simulation
 * (e.g. https://ethereum.stackexchange.com/a/152147).
 */
export function isErc721(bytecode: string): boolean {
  for (let fname in erc721.functions) {
    let fsighash = erc721.functions[
      fname as keyof typeof erc721.functions
    ].selector.slice(2, 10);
    if (!bytecode.includes(fsighash)) {
      return false;
    }
  }
  return true;
}

export function isProxyContract(bytecode: string): boolean {
  // Check for delegatecall opcode
  const delegatecallOpcode = 'f4';

  // Check for storage slot used by EIP-1967
  const eip1967Slot = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';

  // Convert bytecode to lowercase to avoid case sensitivity issues
  const lowerCaseBytecode = bytecode.toLowerCase();

  // Check for delegatecall opcode
  if (lowerCaseBytecode.includes(delegatecallOpcode)) {
    return true;
  }

  // Check for EIP-1967 storage slot
  if (lowerCaseBytecode.includes(eip1967Slot)) {
    return true;
  }

  // Check for Minimal Proxy (EIP-1167) pattern
  const minimalProxyPattern = '363d3d373d3d3d363d73';
  if (lowerCaseBytecode.startsWith(minimalProxyPattern)) {
    return true;
  }

  return false;
}