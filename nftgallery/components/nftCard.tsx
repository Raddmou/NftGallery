import {FC} from 'react';
import { Nft } from '../types/index';

type NFTCardProps = {
    nft: Nft
};

export const NFTCard : FC<NFTCardProps> = ({nft}) => {

    const etherscanUrl = 'https://etherscan.io/token/' + nft.address;

    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nft.image} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className="">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600">Id: {nft.tokenId.substr(nft.tokenId.length - 4)}</p>
                <p className="text-gray-600" >{nft.address.substr(0, 4)}...{nft.address.substr(nft.address.length - 4)}</p>
            </div>

            <div className="flex-grow mt-2">
                <p className="text-gray-600">{nft.description.substr(0, 150)}</p>
            </div>
            <div className="flex justify-center mb-1">
                <a target={"_blank"} href={etherscanUrl} className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer">View on etherscan</a>
            </div >
        </div> 

    </div>
    )
}
