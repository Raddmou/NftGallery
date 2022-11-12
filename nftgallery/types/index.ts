import { Address } from "cluster";

export type Nft = { 
    address: string, 
    title: string, 
    tokenId: string,
    description: string,
    image: string
};

export type FetchNftResponse = { 
    contract: {
        address: string, 
    }
    media: Array<{
        gateway: string,
    }>
    title: string, 
    tokenId: string,
    description: string,
    image: string,
    id: {
        tokenId: string
    }
};