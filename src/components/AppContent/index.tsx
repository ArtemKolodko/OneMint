import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react";
import { Box, Text } from 'grommet';
import {CreateNftPage} from "../../pages/CreateNFT";
import ExplorePage from "../../pages/Explore";
import {menuItems} from "../../routes";

const TabContentWrapper = (props: any) => {
  return <Box direction={'row'} align={'center'} justify={'center'} pad={'56px 0 0 0'}>
    {props.children}
  </Box>
}

export const AppContent = observer(() => {
  let params = useLocation();

  const { pathname } = params

  const currentPath = pathname.split('/')[1] || 'explore'

  return <Box align='center'>
    <TabContentWrapper>
      {currentPath === 'explore' &&
          <ExplorePage />
      }
      {currentPath === 'create' &&
          <CreateNftPage />
      }
      {currentPath === 'stats' &&
          <Text size={'large'}>TODO: top collections, authors, etc</Text>
      }
    </TabContentWrapper>
  </Box>
})
