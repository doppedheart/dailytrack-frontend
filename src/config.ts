import { Alchemy, Network } from "alchemy-sdk";

const alchemyConfig = {
  apiKey: import.meta.env.VITE_ALCHEMY_API,
  network: Network.ETH_SEPOLIA,
};
export const alchemy = new Alchemy(alchemyConfig);
