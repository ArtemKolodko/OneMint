import React from 'react'
import {Box, Button, Spinner, Text, Image} from "grommet";
import {ICollection} from "../../api/backend";

export interface CollectionsListProps {
    isLoading: boolean
    loadingError: any
    collections: ICollection[]
    loadNFT: () => void
    openCollection: (id: string) => void
}

interface CollectionProps {
    data: ICollection,
    onClick?: (e) => void
}

export const Collection = (props: CollectionProps) => {
    const { data: { title, collectionImage }, onClick } = props

    return <Box width={'300px'} height={'150px'} onClick={onClick}>
        <Box height={'100px'}>
            <Image
                src={collectionImage}
                width={'100%'}
                height={'100%'}
                style={{ objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
            />
        </Box>
        <Box background={'white'} style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
            <Text size={'large'} weight={'bold'}>
                {title}
            </Text>
        </Box>
    </Box>
}

export const CollectionsList = (props: CollectionsListProps) => {
    const { isLoading, loadingError, collections, loadNFT, openCollection } = props
    return <Box align={'center'}>
        {isLoading &&
            <Spinner />
        }
        {!isLoading && loadingError &&
            <Box>
                Error on loading NFTs, try again later
                <Button primary alignSelf={'start'} onClick={loadNFT}>Reload</Button>
            </Box>
        }
        <Box direction={'row'} style={{ maxWidth: '1000px', flexWrap: 'wrap' }}>
            {collections.map(c => {
                return <Collection
                    key={c.uuid}
                    data={c}
                    onClick={() => openCollection(c.uuid)}
                />})
            }
        </Box>
    </Box>
}
