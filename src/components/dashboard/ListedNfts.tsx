import { NFTListing, NFTMetadata } from "@/types";
import { getWeb3 } from "@/utils/web3";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  NFTMarketplaceAbi,
  NFTMarketplaceContractAddress,
} from "../contracts/NFTMarketplaceAbi";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/store";
import { useToast } from "@/hooks/use-toast";
import { ERC721_ABI } from "../contracts/NFTfactoryAbi";

interface ListedNftsProps {
  listedNFTs: NFTListing[];
}

export const ListedNfts: FC<ListedNftsProps> = ({ listedNFTs }) => {
  const { toast } = useToast();
  const { address } = useSelector((state: RootState) => state.contract);
  let web3 = getWeb3();
  const [loading, setLoading] = useState<boolean>(true);
  const [listedNfts, setListedNfts] = useState<NFTMetadata[]>([]);
  const fetchNFTMetadata = async () => {
    try {
      const nftDetails = await Promise.all(
        listedNFTs.map(async (nft) => {
          const nftContract = new web3.eth.Contract(
            ERC721_ABI,
            nft.nftContract
          );
          const tokenURI: string = await nftContract.methods
            .tokenURI(nft.tokenId)
            .call();
          const metadata = await axios.get(tokenURI);

          return metadata.data;
        })
      );

      setListedNfts(nftDetails);
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
      console.error("Error fetching NFT metadata:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNFTMetadata();
  }, [listedNFTs]);

  const handleCancelListing = async (nft: NFTListing) => {
    try {
      const marketplace = new web3.eth.Contract(
        NFTMarketplaceAbi,
        NFTMarketplaceContractAddress
      );
      await marketplace.methods
        .cancelListing(nft.listingId)
        .send({ from: address });
      toast({
        title: "Success",
        description: "Nft listing cancelled",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Your NFTs</h2>
      {loading ? (
        <p className="text-gray-500">Loading NFTs...</p>
      ) : listedNfts.length === 0 ? (
        <p className="text-gray-500">No NFTs owned</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          {listedNfts.map((nft, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={nft.image}
                alt={`NFT ${listedNFTs[index].tokenId}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <p className="font-semibold">
                  NFT #{listedNFTs[index].tokenId}
                </p>
                <p className="font-semibold">{nft.name}</p>
                <p className="text-gray-500">{nft.description}</p>
                <p className="text-gray-800 font-bold mt-2">
                  Price: {listedNFTs[index].price.toString()} HTO
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full bg-blue-500 te xt-white py-1 rounded mt-2">
                      Cancel Listing
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Cancel Listing ?</DialogTitle>
                      <DialogDescription>
                        Are you sure you wanted to cancel the listing?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <button
                          type="button"
                          className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
                          onClick={() => handleCancelListing(listedNFTs[index])}
                        >
                          List Nft
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
