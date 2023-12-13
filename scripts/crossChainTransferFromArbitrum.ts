// scripts/crossChainTransfer.ts

import { ethers, network } from "hardhat";
import { Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `arbitrumSepolia`) {
    console.error(`Must be called from Arbitrum Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ARBITRUM_SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressArbitrumSepolia = `0x77E8284BB6ffBC731bA8Cfe258974cdEE13d1453`;
  
  const from = `0xb825b68d921F889d47b634B1b67999a201d0CA90`;
  const to = `0xb825b68d921F889d47b634B1b67999a201d0CA90`;
  const tokenId = 0; // put NFT token id here
  const destinationChainSelector = `16015286601757825753`;
  const payFeesIn = 1; // 0 - Native, 1 - LINK

  const xNft: XNFT = XNFT__factory.connect(xNftAddressArbitrumSepolia, signer);

  const tx = await xNft.crossChainTransferFrom(
      from,
      to,
      tokenId,
      destinationChainSelector,
      payFeesIn
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
