import {
  NFTMarketplaceAbi,
  NFTMarketplaceContractAddress,
} from "@/components/contracts/NFTMarketplaceAbi";
import {
  TokenAbi,
  TokenContractAddress,
} from "@/components/contracts/TokenAbi";
import Web3 from "web3";

let web3Instance: Web3;
export const provider =
  typeof window !== "undefined" && window.ethereum ? window.ethereum : null;

export const getWeb3 = () => {
  if (!web3Instance) {
    if (provider) {
      web3Instance = new Web3(provider);
      console.log("using injected provider");
    }
  }
  return web3Instance;
};

export async function getListingCounter() {
  try {
    web3Instance = getWeb3();
    const marketplace = new web3Instance.eth.Contract(
      NFTMarketplaceAbi,
      NFTMarketplaceContractAddress
    );
    const listingCounter: string = await marketplace.methods
      .listingCounter()
      .call();
    return listingCounter;
  } catch (error) {
    throw error;
  }
}

export async function getTokenContract() {
  try {
    web3Instance = getWeb3();
    return new web3Instance.eth.Contract(TokenAbi, TokenContractAddress);
  } catch (error) {
    console.error("Error initializing web3 or fetching token contract", error);
    throw error;
  }
}
