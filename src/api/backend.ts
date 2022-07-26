import axios from "axios";
import config from "../config";

/*
* collections: Array(1)
0:
creator:
id: "0x12345"
name: "John Smith"
profileImage: "https://randomuser.me/api/portraits/men/75.jpg"
social: {twitter: 'https://twitter.com', instagram: 'https://instagram/com', website: 'https://random.john.smith.one', email: 'johnsmith@example.com', discord: 'https://discord.com'}
[[Prototype]]: Object
mintable: false
nftAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
nftType: 721
tokens: Array(2)
0:
metadata: {image: 'https://ipfs.io/ipfs/QmRgADRke5wfwzRpSveE7HNHnnS2dsDEBJXRSU9GmjD8SE', attributes: Array(6)}
nftAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
priceUSD: 10
stripePriceId: "price_1LHqc7KXnj3LtQdK9x2yqXqm"
stripeProductId: "prod_LzqIjVSB5nx2Mr"
tokenId: 400
[[Prototype]]: Object
1: {nftAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', stripeProductId: 'prod_LzqPobYzKtLYAF', stripePriceId: 'price_1LHqiiKXnj3LtQdKHgFCm2aW', priceUSD: 50, tokenId: 1400, …}
length: 2
[[Prototype]]: Array(0)
type: 0
* */

export interface Creator {
    id: string
    name: string
    profileImage: string
    social: {
        twitter: string
        instagram: string
        website: string
        email: string
        discord: string
    }
}

export interface TokensCollection {
    creator: Creator
    mintable: boolean
    nftAddress: string
    nftType: 721 | 1155
    type: number
    tokens: any
}

export interface ICollection {
    collectionAddress: string
    collectionImage: string
    description: string
    link: string
    maxMint: number
    priceId: string
    productId: string
    rate: number
    title: string
    uuid: string
}

export interface ICollectionCreate {
    collectionImage: string,
    title: string,
    description: string,
    link: string,
    rate: number, // price
    maxMint: number, // amount
    userId: string
}

export const getTokens = async (): Promise<{
    collections: TokensCollection[]
}> => {
    const {data} = await axios.get(`${config.apiUrl}/v0/tokens`)
    return data
}

export const getCollections = async (): Promise<ICollection[]> => {
    const {data} = await axios.get(`${config.apiUrl}/v0/collections/all`)
    return data
}

export const createCollection = async (params: ICollectionCreate) => {
    const body = JSON.stringify(params);
    const {data, status} = await axios.post(`${config.apiUrl}/v0/collections/all`, body, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return {
        data,
        status
    }
}