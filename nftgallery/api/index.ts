import { Address } from "cluster";
import { describe } from "node:test";
import { Nft, FetchNftResponse } from "../types";
import {mapper} from "../mappers";
import sanitizedConfig from "../common/config";

export const nftAPI = {

    fetchNfts: async (retreiveAllCollection: boolean, 
        walletAddress : string, 
        collectionAddress : string)
        : Promise<Nft[]> => {
        console.log("fetchNfts start");
        
        let nfts; 
        const api_key = sanitizedConfig.ALCHEMY_API_KEY;
        const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
        var requestOptions = {
            method: 'GET'
        };       
        
        if (!retreiveAllCollection) {
            const fetchURL = `${baseURL}?owner=${walletAddress}`;
            nfts = await fetch(fetchURL, requestOptions)
                        .then(data => data.json());
        } else {
            console.log("fetching nfts for collection owned by address")
            const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
            nfts = await fetch(fetchURL, requestOptions)
                                .then(data => data.json());
        }

        console.log("nfts: ", nfts)

        const response = nfts.nfts.map((nft: FetchNftResponse) =>
        {
            return mapper.mapToNft(nft)
        });
        
        return response;
    },

    fetchNftsByCollection: async (collectionAddress : string)
        : Promise<any[]> => {
        console.log("fetchNftsByCollection start");
        
        let nfts; 
        const api_key = "qPCQILIlqhvgkio2lAoouDHZkLQoAtN7"
        const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
        var requestOptions = {
            method: 'GET'
        };

        const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
        nfts = await fetch(fetchURL, requestOptions)
                    .then(data => data.json());
    
        console.log("nfts: ", nfts.nfts);

        const response = nfts.nfts.map((nft: FetchNftResponse) =>
        {
            return mapper.mapToNft(nft)
        });
        
        return response;
    },
}