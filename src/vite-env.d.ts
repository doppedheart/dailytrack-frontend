/// <reference types="vite/client" />

import { BrowserProvider, Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}
