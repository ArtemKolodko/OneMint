import { CID } from 'ipfs-core'
import client from 'ipfs-http-client'

const ipfsClient = client({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https"
})

export interface IPFSResource {
    path: string
    cid: CID
    size: number
}

export interface IMeta {
    name: String,
    description: String,
    image: String,
    externalLink?: String,
    symbol?: String,
}

export const createCollectionMeta = (meta: IMeta) => {
    return {
        symbol: meta.symbol,
        name: meta.name,
        description: meta.description,
        image: meta.image,
        external_link: meta.externalLink || ''
    }
}

export const get = (hash: string) => {
    // todo
    return ''
}

export const add = async (data: any) => {
    const res = await ipfsClient.add(data);
    return res as unknown as IPFSResource
}

export const uploadCollectionMeta = async (data: IMeta): Promise<string> => {
    const meta = createCollectionMeta(data)
    const str = JSON.stringify(meta);
    const { path } = await ipfsClient.add(str);

    return path;
}

export const ipfsGateway = 'https://ipfs.io/ipfs/'
