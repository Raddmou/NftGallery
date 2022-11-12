import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from "../components/nftCard";
import { Nft } from '../types/index';
import { nftAPI } from "../api/index";

const Home: NextPage = () => {

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState<Array<Nft>>([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);

  const fetchNFTs = async() => {
    try {
      const ntfs = await nftAPI.fetchNfts(collection.length != 0, wallet, collection);
      setNFTs(ntfs);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchNFTsForCollection = async () => {
    try {
      const ntfs = await nftAPI.fetchNftsByCollection(collection);
      setNFTs(ntfs);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            }else fetchNFTs()
          }
        }>Go! </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
