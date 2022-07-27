import React from 'react'
import {Box, Button, Spinner, Text, Image} from "grommet";
import {ICollection} from "../../api/backend";
import {CollectionPreview} from "../../components/Collection";

export interface CollectionsListProps {
    isLoading: boolean
    loadingError: any
    collections: ICollection[]
    loadNFT: () => void
    openCollection: (id: string) => void
}

export const CollectionsList = (props: CollectionsListProps) => {
    const { isLoading, loadingError, collections, loadNFT, openCollection } = props

    return <Box>
        {isLoading &&
            <Spinner size={'large'} />
        }
        {!isLoading && loadingError &&
            <Box>
                Error on loading NFTs, try again later
                <Button primary alignSelf={'start'} onClick={loadNFT}>Reload</Button>
            </Box>
        }
        <Box
            direction={'row'}
            gap={'24px'}
            justify={'center'}
            style={{ maxWidth: '1000px', flexWrap: 'wrap', rowGap: '24px' }}
        >
            {collections.map(c => {
                return <CollectionPreview
                    key={c.uuid}
                    data={c}
                    onClick={() => openCollection(c.uuid)}
                />})
            }
        </Box>
    </Box>
}
