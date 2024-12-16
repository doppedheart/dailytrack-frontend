import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../contexts/store";
import { useNavigate } from "react-router-dom";
import { Wallet, ListOrdered, CreditCard, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { OwnedNft } from "alchemy-sdk";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { addOwnedNfts } from "@/contexts/contractSlice";
import {
  NFTMarketplaceAbi,
  NFTMarketplaceContractAddress,
} from "../contracts/NFTMarketplaceAbi";
import { NFTListing } from "@/types";
import {
  getListingCounter,
  getTokenContract,
  getWeb3,
  provider,
} from "@/utils/web3";
import { ListedNfts } from "./ListedNfts";
import { alchemy } from "@/config";
import { useToast } from "@/hooks/use-toast";

export const DashboardView = () => {
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [ownedNFTs, setOwnedNFTs] = useState<OwnedNft[]>([]);
  const [listedNFTs, setListingNFTs] = useState<NFTListing[]>([]);
  const [price, setPrice] = useState<number>(5);
  const [showListedNfts, setShowListedNfts] = useState<boolean>(false);
  const toggleShowListedNfts = () => setShowListedNfts(!showListedNfts);
  const { isConnected, address, ownedNfts, listingNfts } = useSelector(
    (state: RootState) => state.contract
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  useEffect(() => {
    if (address) {
      fetchTokenBalance();
    }
    if (ownedNfts.length <= 0) {
      fetchNfts();
    } else {
      setOwnedNFTs(ownedNfts);
    }
    if (listingNfts.length <= 0) {
      getUserListedNft();
    } else {
      setListingNFTs(listingNfts);
    }
  }, [address]);

  let web3: Web3 | null = null;
  web3 = getWeb3();
  const marketplace = new web3.eth.Contract(
    NFTMarketplaceAbi,
    NFTMarketplaceContractAddress
  );

  async function getUserListedNft() {
    try {
      const listingCounter = await getListingCounter();
      let list: NFTListing[] = [];
      for (let i = 0; i < parseInt(listingCounter!); i++) {
        const listing: NFTListing = await marketplace.methods
          .listings(i)
          .call();
        if (
          listing.isActive &&
          listing.seller.toLowerCase() == address.toLowerCase()
        ) {
          list.push({ ...listing, listingId: i });
        }
      }
      setListingNFTs(list);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const fetchNfts = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(address);
    dispatch(addOwnedNfts(nfts.ownedNfts));
    setOwnedNFTs(nfts.ownedNfts);
  };

  const fetchTokenBalance = async () => {
    if (!provider || !address) return;

    try {
      const tokenContract = await getTokenContract();

      // Get token balance
      const balance: string = await tokenContract.methods
        .balanceOf(address)
        .call();
      const symbol: string = await tokenContract.methods.symbol().call();
      if (!balance) {
      }
      setTokenBalance(web3?.utils.fromWei(balance, "ether") ?? null); // Assumes 18 decimals
      setTokenSymbol(symbol);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  async function handleListNft(nft: OwnedNft, price: number) {
    try {
      web3 = getWeb3();
      const functionSignature = "approve(address,uint256)";
      const functionSelector = web3.utils
        .keccak256(functionSignature)
        .substring(0, 10);

      const spenderEncoded = web3.eth.abi
        .encodeParameter("address", NFTMarketplaceContractAddress)
        .slice(2);
      const tokenIdEncoded = web3.eth.abi
        .encodeParameter("uint256", nft.tokenId)
        .slice(2);

      const data = functionSelector + spenderEncoded + tokenIdEncoded;

      const tx = {
        from: address,
        to: nft.contract.address,
        data: data,
        gas: 100000,
      };
      await web3.eth.sendTransaction(tx);

      await marketplace.methods
        .listNFT(
          nft.contract.address,
          web3.utils.toBigInt(nft.tokenId),
          web3.utils.toBigInt(price)
        )
        .send({ from: address });
      await fetchNfts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const handleRefresh = async (type: string) => {
    if (type === "ownedNFTs") {
      await fetchNfts();
      toast({
        title: "success",
        description: "Nfts Refreshed",
      });
      console.log("Refreshing Owned NFTs...");
    } else if (type === "listedNFTs") {
      console.log("Refreshing Listed NFTs...");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          NFT Marketplace Dashboard
        </h1>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Token Balance Card */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CreditCard className="mr-2 text-blue-500" />
              <h2 className="text-xl font-semibold">Token Balance</h2>
            </div>
            <p className="text-2xl font-bold">
              {tokenBalance || "Loading..."} {tokenSymbol}
            </p>
          </div>

          {/* Owned NFTs Card */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Wallet className="mr-2 text-green-500" />
                <h2 className="text-xl font-semibold">Owned NFTs</h2>
              </div>
              <button
                onClick={() => handleRefresh("ownedNFTs")}
                className="text-gray-500 hover:text-gray-800 transition duration-200"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <p className="text-2xl font-bold">{ownedNFTs.length}</p>
          </div>

          {/* Listed NFTs Card */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ListOrdered className="mr-2 text-purple-500" />
                <h2 className="text-xl font-semibold">Listed NFTs</h2>
              </div>
              <button
                onClick={() => handleRefresh("listedNFTs")}
                className="text-gray-500 hover:text-gray-800 transition duration-200"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <p className="text-2xl font-bold">{listedNFTs.length}</p>
          </div>
        </div>

        {/* Owned NFTs Grid */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your NFTs</h2>
          {ownedNFTs.length === 0 ? (
            <p className="text-gray-500">No NFTs owned</p>
          ) : (
            <div className="grid md:grid-cols-4 gap-4">
              {ownedNFTs.map((nft) => (
                <div
                  key={nft.tokenId}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={nft.image.originalUrl}
                    alt={`NFT ${nft.tokenId}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-semibold">NFT #{nft.tokenId}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full bg-blue-500 text-white py-1 rounded mt-2">
                          List for Sale
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>List Nft</DialogTitle>
                          <DialogDescription>
                            Set price for you nft in Harto tokens.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                          <div className="grid flex-1 gap-2">
                            <label htmlFor="link" className="sr-only">
                              Price
                            </label>
                            <input
                              type="number"
                              defaultValue={price}
                              className="px-3 py-2"
                              onChange={(e) =>
                                setPrice(parseInt(e.target.value))
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <button
                              type="button"
                              className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
                              onClick={() => handleListNft(nft, price)}
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

        {/* Listed NFTs Grid */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Your Listed NFTs</h2>
          {listedNFTs.length === 0 ? (
            <p className="text-gray-500">No NFTs listed for sale</p>
          ) : (
            <div className="">
              <button
                className="bg-blue-400 text-white rounded-md py-2 px-4"
                onClick={toggleShowListedNfts}
              >
                Show Listed nfts
              </button>
              {showListedNfts ? <ListedNfts listedNFTs={listedNFTs} /> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
