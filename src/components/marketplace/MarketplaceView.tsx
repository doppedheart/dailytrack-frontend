import { useEffect, useState } from "react";
import {
  NFTMarketplaceAbi,
  NFTMarketplaceContractAddress,
} from "../contracts/NFTMarketplaceAbi";
import { getListingCounter, getTokenContract, getWeb3 } from "@/utils/web3";
import { MarketplaceFilters, NFTListing, NFTMetadata } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/store";
import { FilterBar } from "./FilterBar";
import { NFTCard } from "./NFTCard";
import { ERC721_ABI } from "../contracts/NFTfactoryAbi";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { NFTCardSkeleton } from "./NFTCardSkelton";
import { ethers } from "ethers";

export function MarketplaceView() {
  const web3 = getWeb3();
  const [filters, setFilters] = useState<MarketplaceFilters>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const { address } = useSelector((state: RootState) => state.contract);
  const [listedNfts, setListedNfts] = useState<NFTMetadata[]>([]);
  const { toast } = useToast();
  const marketplace = new web3!.eth.Contract(
    NFTMarketplaceAbi,
    NFTMarketplaceContractAddress
  );
  async function getUserListedNft() {
    try {
      const listingCounter = await getListingCounter();
      let list: NFTMetadata[] = [];
      for (let i = 0; i < parseInt(listingCounter!); i++) {
        const listing: NFTListing = await marketplace.methods
          .listings(i)
          .call();
        if (listing.isActive) {
          const nftDetails = new web3.eth.Contract(
            ERC721_ABI,
            listing.nftContract
          );
          const tokenURI: string = await nftDetails.methods
            .tokenURI(listing.tokenId)
            .call();
          const metadata = await axios.get(tokenURI);

          list.push({ ...metadata.data, listingId: i, price: listing.price });
        }
      }
      setListedNfts(list);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const handlePurchase = async (nft: NFTMetadata) => {
    try {
      setIsPurchasing(true);
      const token = await getTokenContract();
      await token.methods
        .approve(
          NFTMarketplaceContractAddress,
          ethers.parseEther(nft.price!.toString())
        )
        .send({
          from: address,
        });
      const buyResponse = await marketplace.methods
        .purchaseNFT(nft.listingId)
        .send({
          from: address,
        });
      toast({
        title: "NFT purchased",
        description: buyResponse.transactionHash,
      });
      setIsPurchasing(false);
      setListedNfts((prev) =>
        prev.filter((item) => item.listingId !== nft.listingId)
      );
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
      setIsPurchasing(false);
    }
  };
  useEffect(() => {
    getUserListedNft();
  }, []);

  const filteredListings = listedNfts.filter((listing) => {
    if (
      filters.minPrice !== undefined &&
      listing.price &&
      listing.price < filters.minPrice
    ) {
      return false;
    }
    if (
      filters.maxPrice !== undefined &&
      listing.price &&
      listing.price > filters.maxPrice
    ) {
      return false;
    }
    if (
      filters.searchTerm &&
      !listing.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !listing.description
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <FilterBar filters={filters} onFilterChange={setFilters} />
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <NFTCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
            No NFTs Listed
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            There are currently no NFTs available for purchase.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <NFTCard
              key={index}
              listing={listing}
              onBuy={handlePurchase}
              isPurchasing={isPurchasing}
            />
          ))}
        </div>
      )}
    </div>
  );
}
