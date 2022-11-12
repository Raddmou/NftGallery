import { Nft, FetchNftResponse } from "../types";

export const mapper = {
    mapToNft: (nft: FetchNftResponse): Nft => {
        console.log("nft " +nft);
        return {
            address: nft.contract.address,
            title: nft.title,
            tokenId: nft.id.tokenId,
            description: nft.description,
            image: nft.media[0].gateway
        };
    }
}