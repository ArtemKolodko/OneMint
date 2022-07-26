import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from "react-router-dom";
import {observer} from "mobx-react";
import { Box, Tab, Tabs } from 'grommet';
import {CreateNftPage} from "../../pages/CreateNFT";
import ExplorePage from "../../pages/Explore";

const TabContentWrapper = (props: any) => {
  return <Box direction={'row'} align={'center'} pad={'56px 0 0 0'}>
    {props.children}
  </Box>
}

const routes = ['/explore', '/create', '/stats']

export const AppContent = observer(() => {
  const [activeIndex, setActiveIndex] = useState(0)

  let navigate = useNavigate();
  let params = useLocation();
  const { pathname } = params

  useEffect(() => {
    let pathNameIndex = routes.indexOf(pathname)
    const index = pathNameIndex >= 0 ? pathNameIndex : 0
    setActiveIndex(index)
  }, [pathname])

  const onActive = (nextIndex: number) => {
    const nextPath = routes[nextIndex] || '/'
    navigate(nextPath)
  };

  return <Box align='center' margin={{ top: '-36px' }}>
    <Tabs activeIndex={activeIndex} onActive={onActive}>
      <Tab title="Explore">
        <TabContentWrapper>
          <ExplorePage />
        </TabContentWrapper>
      </Tab>
      <Tab title="Create NFT">
        <TabContentWrapper>
          <CreateNftPage />
        </TabContentWrapper>
      </Tab>
      <Tab title="Stats">
        <TabContentWrapper>TODO: top NFTs, top authors, etc</TabContentWrapper>
      </Tab>
    </Tabs>
  </Box>
})
