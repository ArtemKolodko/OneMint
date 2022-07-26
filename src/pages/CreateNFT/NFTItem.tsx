import React from 'react'
import {Box, Image} from "grommet";
import {IPFSResource} from "../../api/ipfs";

export interface NFTItemProps extends IPFSResource {

}

export const NFTItemPreview = (props: NFTItemProps) => {
    const { path, cid } = props

    return <Box key={path}>
        <Image src={`https://ipfs.infura.io/ipfs/${path}`} />
    </Box>
}