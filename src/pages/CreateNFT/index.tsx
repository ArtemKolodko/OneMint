import {Box, Button, FileInput, TextInput, Text, TextArea, Spinner} from 'grommet'
import React, {useEffect, useState} from 'react'
import {observer} from "mobx-react";
import { add } from "../../api/ipfs";
import { NFTItemPreview } from './NFTItem'
import {createCollection} from "../../api/backend";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const InputLabelDescription = styled(Text)`
  font-size: 80%;
  font-weight: 300;
`

const InputLabel = (props: { children, required?: boolean }) => {
    return <Box direction={'row'}>
        <Text>{props.children}</Text>
        {props.required
            ? <Text color={'red'} margin={{ left: 'xxsmall' }}>*</Text>
            : ''}
    </Box>
}

export const CreateNftPage = observer(() => {
    const [title, setTitle] = useState('Oscar NFT')
    const [name, setName] = useState('Oscar NFT')
    const [description, setDescription] = useState('Description text')
    const [link, setLink] = useState('')
    const [amount, setAmount] = useState(1)
    const [price, setPrice] = useState(0)
    const [selectedFile, setSelectedFile] = useState<any>()
    const [inProgress, setInProgress] = useState(false)
    let navigate = useNavigate();

    const create = async () => {
       try {
           setInProgress(true)
           const ipfsImg = await add(selectedFile)
           console.log('ipfs img', ipfsImg)
           const result = await createCollection({
               collectionImage: `https://ipfs.infura.io/ipfs/${ipfsImg.path}`,
               title,
               description,
               link,
               rate: amount,
               maxMint: price,
               userId: ''
           })
           console.log('result', result)
           navigate('/explore/collection/' + result.uuid)
       } catch (e) {
           console.log('Cannot create collection', e)
       } finally {
           setInProgress(false)
       }
    }

    return <Box margin={{ bottom: 'xlarge' }}>
        {/*<Box>*/}
        {/*    {uploadedFiles.map(file => <NFTItemPreview {...file} />)}*/}
        {/*</Box>*/}
        <FileInput
            name="file"
            onChange={event => {
                const fileList: any = event.target.files;
                console.log('fileList', fileList)
                setSelectedFile(fileList[0])
                for (let i = 0; i < fileList.length; i += 1) {
                    const file = fileList[i];
                }
            }}
        />
        <Box margin={{top: 'medium'}}>
            <InputLabel required>Name</InputLabel>
            <TextInput placeholder={'Item name'} onChange={e => setName(e.target.value)} />
        </Box>
        <Box margin={{top: 'medium'}}>
            <InputLabel>External link</InputLabel>
            <TextInput placeholder={'https://yoursite.io/item/123'} onChange={e => setLink(e.target.value)} />
        </Box>
        <Box margin={{top: 'medium'}}>
            <InputLabel>Description</InputLabel>
            <TextArea placeholder={'Provide a brief description'} onChange={e => setDescription(e.target.value)} />
        </Box>
        <Box margin={{top: 'medium'}}>
            <InputLabel>Supply</InputLabel>
            <InputLabelDescription>The number of items that can be minted. No gas cost to you!</InputLabelDescription>
            <TextInput placeholder={'1'} onChange={e => setAmount(parseInt(e.target.value))} />
        </Box>
        <Box margin={{top: 'medium'}}>
            <InputLabel>Price, USD</InputLabel>
            <TextInput placeholder={'1'} onChange={e => setPrice(parseInt(e.target.value))} />
        </Box>
        <Box margin={{top: 'medium'}} direction={'row'} gap={'32px'} align={'center'}>
            <Button primary disabled={inProgress} alignSelf={'start'} style={{ padding: '8px 12px' }} onClick={create}>
                Create
            </Button>
            {inProgress &&
                <Spinner size={'small'} />
            }
        </Box>
    </Box>
})
