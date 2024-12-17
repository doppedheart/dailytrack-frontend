export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  price?: number;
  listingId?: number;
}

export interface FormErrors {
  name?: string;
  description?: string;
  image?: string;
}

export interface NFTListing {
  tokenId: string;
  price: number;
  seller: string;
  isActive: boolean;
  nftContract: string;
  listingId?: number;
}

export interface MarketplaceFilters {
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
}
