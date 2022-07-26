import React, {useEffect, useState} from 'react'
import {Box, Button, Spinner} from "grommet";
import {ICollection, getCollections} from "../../api/backend";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Token} from "./Token";
import {CollectionsList} from "./CollectionsList";

export default () => {
    let navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)
    const [loadingError, setError] = useState<any>(null)
    const [collections, setCollections] = useState<ICollection[]>([])

    const loadNFT = async () => {
        setLoading(true)
        try {
            const data = await getCollections()
            setCollections(data)
        } catch (e) {
            console.error('Cannot load collections', e)
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadNFT()
    }, [])

    const openCollection = (id: string) => {
        const nextPath = '/collection/' + id
        navigate(nextPath)
    }

    const collectionListProps = {
        isLoading,
        loadingError,
        collections,
        loadNFT,
        openCollection
    }

    return <Routes>
        <Route path="/explore" element={<CollectionsList {...collectionListProps} />} />
        <Route path="/collection/:id" element={<Token />} />
    </Routes>
}
