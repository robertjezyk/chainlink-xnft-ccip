// scripts/enableChain.ts

import { ethers, network } from "hardhat";
import { Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `ethereumSepolia`) {
    console.error(`Must be called from Ethereum Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressEthereumSepolia = `0x956019C04317E6832efC98dD332a02D936EE12cD`;
  const xNftAddressArbitrumSepolia = `0x77E8284BB6ffBC731bA8Cfe258974cdEE13d1453`;
  const chainSelectorArbitrumSepolia = `3478487238524512106`;
  const ccipExtraArgs = `0x97a657c90000000000000000000000000000000000000000000000000000000000030d40`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressEthereumSepolia, signer);

  const tx = await xNft.enableChain(
      chainSelectorArbitrumSepolia,
      xNftAddressArbitrumSepolia,
      ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});