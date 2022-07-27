import {Box, Image, Text} from "grommet";
import React from "react";
import {ICollection} from "../../api/backend";
import styled from "styled-components";

export interface CollectionProps {
    data: ICollection
    width?: string
    height?: string
    onClick?: (e) => void
}

const CollectionWrapper = styled(Box)`
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 8px;
`

const ImageContainer = styled(Box)`
  width: inherit;
  height: inherit;
  background-repeat: no-repeat;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: all .2s;
  background-size: cover;
  
  //&:hover {
  //  background-size: 110%;
  //}
`

export const CollectionPreview = (props: CollectionProps) => {
    const {
        data: {
            title,
            collectionImage
        },
        width = '300px',
        height = '150px',
        onClick
    } = props

    return <CollectionWrapper width={width} height={height} onClick={onClick}>
        <ImageContainer background={`url(${collectionImage})`} />
        <Box background={'white'} pad={'4px 8px'} style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
            <Text size={'medium'} weight={'bold'}>
                {title}
            </Text>
        </Box>
    </CollectionWrapper>
}

export const Collection = (props: CollectionProps) => {
    const {
        data: {
            title,
            rate,
            maxMint,
            description,
            collectionImage,
            link,
            collectionAddress = ''
        },
        width = '650px',
        height = '500px',
        onClick
    } = props

    const addressShort = `${collectionAddress.substring(0, 6)}...${collectionAddress.substr(-4, 4)}`

    return <CollectionWrapper width={width} height={height} onClick={onClick}>
        <ImageContainer background={`url(${collectionImage})`} />
        <Box
            background={'white'}
            style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
            gap={'8px'}
            pad={'16px'}
        >
            <Box>
                <Box direction={'row'} justify={'between'}>
                    <Box>
                        <Text size={'large'} weight={'bold'}>{title}</Text>
                    </Box>
                    <Box direction={'row'} gap={'16px'}>
                        <Box>
                            {addressShort && <Text>
                                <a href={`https://explorer.harmony.one/address/${collectionAddress}`} target={'_blank'}>{addressShort}</a>
                            </Text>}
                        </Box>
                        <Box>
                            {link && <Text>
                                <a href={link} target={'_blank'}>{link}</a>
                            </Text>}
                        </Box>
                    </Box>
                </Box>
                <Box margin={{ top: '32px' }}>
                    <Text size={'small'} weight={300}>{description}</Text>
                </Box>
            </Box>
            <Box direction={'row'} margin={{ top: '32px', bottom: '32px' }} gap={'64px'}>
                <Box>
                    <Text size={'xlarge'} weight={'bold'}>{rate}</Text>
                    <Text size={'small'} weight={300}>Items</Text>
                </Box>
                <Box>
                    <Text size={'xlarge'} weight={'bold'}>{maxMint}</Text>
                    <Text size={'small'} weight={300}>Price</Text>
                </Box>
                <Box>
                    <Text size={'xlarge'} weight={'bold'}>0</Text>
                    <Text size={'small'} weight={300}>Total volume</Text>
                </Box>
                <Box>
                    <Text size={'xlarge'} weight={'bold'}>0</Text>
                    <Text size={'small'} weight={300}>Floor price</Text>
                </Box>
            </Box>
        </Box>
    </CollectionWrapper>
}
