import { NFTListing } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OwnedNft } from "alchemy-sdk";

export interface MainState {
  address: string;
  isConnected: boolean;
  ownedNfts: OwnedNft[];
  listingNfts: NFTListing[];
}

const initialState: MainState = {
  address: "",
  isConnected: false,
  ownedNfts: [],
  listingNfts: [],
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    saveAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
      state.isConnected = true;
      state.ownedNfts = [];
    },
    disconnectWallet: (state) => {
      state.address = "";
      state.isConnected = false;
    },
    addOwnedNfts: (state, action) => {
      state.ownedNfts = action.payload;
    },
    addListingNfts: (state, action) => {
      state.listingNfts = action.payload;
    },
  },
});

export const { saveAddress, disconnectWallet, addOwnedNfts } =
  contractSlice.actions;

export default contractSlice.reducer;
