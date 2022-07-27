import React, {useEffect, useState} from 'react'
import {Box, Spinner} from "grommet";
import {useParams} from "react-router-dom";
import {getCollectionById, ICollection} from "../../../api/backend";
import {Collection} from "../../../components/Collection";

export const Token = () => {
    const { id = '' } = useParams()
    const [isLoading, setLoading] = useState(false)
    const [collection, setCollection] = useState<ICollection>()

    useEffect(() => {
        const loadCollection = async () => {
            setLoading(true)
            try {
                const data = await getCollectionById(id)
                setCollection(data)
            } catch (e) {
                console.error('Cannot load collection')
            } finally {
                setLoading(false)
            }
        }
        loadCollection()
    }, [id])

    if(!id) {
        return <Box>
            Collection not found, try again later
        </Box>
    }

    return <Box>
        {isLoading &&
            <Spinner size={'large'} />
        }

        {!isLoading && collection &&
            <Collection data={collection} />
        }

    </Box>
}
