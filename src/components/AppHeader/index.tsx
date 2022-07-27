import React, {useEffect, useState} from 'react'
import darkModeIcon from '../../assets/icons/darkmode.svg'
import Icon, {HarmonyIcon} from "../Icon";
import {useStores} from "../../use-stores";
import {Box, Button, DropButton, Text} from "grommet";
import {observer} from "mobx-react";
import {breakpoints} from "../../utils";
import {useMediaQuery} from "react-responsive";
import {useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {IMenuItem, menuItems} from '../../routes'

const AccountButton = observer(() => {
    const { walletStore } = useStores()

    const { lastUsedAddress } = walletStore

    const onDisconnectClicked = () => {
        walletStore.disconnectWallet()
    }

    const address = `${lastUsedAddress.substr(0, 8)}...`

    return <DropButton
      label={address}
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
          <Box pad="medium" background={"modalBackground"}>
              <Button primary color={'buttonBackground'} label={'Disconnect'} onClick={onDisconnectClicked} />
          </Box>
      }
    />
})

const ActiveItemMark = styled(Box)<{ isActive: boolean }>`
  height: 4px;
  background-color: ${(props) => props.isActive ? '#1d5ae2' : 'transparent'};
  margin-top: 8px;
  border-radius: 4px;
  transition: background-color 0.15s;
`

const HeaderContainer = styled(Box)`
  box-shadow: rgb(4 17 29 / 25%) 0 0 8px 0;
  z-index: 100;
`

const MenuItem = (props: { text: string, isActive: boolean, onClick: (e) => void }) => {
    const {text, isActive, onClick} = props

    return <Box onClick={onClick}>
        <Text size={'large'} weight={'bold'}>
            {text}
        </Text>
        <ActiveItemMark isActive={isActive} />
    </Box>
}

const Menu = () => {
    let { pathname } = useLocation();
    const [activeItem, setActiveItem] = useState(menuItems[0])

    let navigate = useNavigate();

    useEffect(() => {
        const currentPath = pathname.split('/')[1] || 'explore'
        const nextItem = menuItems.find(i => i.route === currentPath) || menuItems[0]
        setActiveItem(nextItem)
    }, [pathname])

    const onClick = (item: IMenuItem) => {
        const nextItem = menuItems.find(i => i.text === item.text) || menuItems[0]
        navigate(nextItem.route)
    }

    return <Box direction={'row'} gap={'42px'}>
        {menuItems.map(item => <MenuItem
            key={item.route}
            text={item.text}
            isActive={activeItem.route === item.route}
            onClick={() => onClick(item)}
        />)}

    </Box>
}

const AppHeader = observer(() => {
    let navigate = useNavigate();
    const { configStore, walletStore } = useStores()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' })

    const toggleTheme = () => {
        configStore.setThemeMode(configStore.themeMode === 'dark' ? 'light' : 'dark')
    }

    const onConnectClicked = async () => {
        await walletStore.connectWallet()
    }

    return <HeaderContainer
      tag='header'
      align='center'
      height={'66px'}
      pad={'20px 0 12px 0'}
      border={{ side: 'bottom', color: 'border', size: '1px' }}
      background={'background'}
      style={{ position: 'sticky', top: '0px' }}
    >
        <Box
          direction={'row'}
          gap={'16px'}
          // pad={'0 24px 0 24px'}
          align='center'
          justify='between'
          width={{ width: '100%', max: breakpoints.desktop }}
        >
            <Box
                direction={'row'}
                gap={'28px'}
                justify={'center'}
                align={'center'}
                onClick={() => navigate("/explore")}
            >
                <Box>
                    <HarmonyIcon width={'30px'} />
                </Box>
                {!isTabletOrMobile && <Box>
                    <Text weight={'bold'} size={'large'}>ONE Mint</Text>
                    <Text weight={'bold'} size={'xsmall'} color={'titleSecondary'}>By Harmony</Text>
                </Box>}
            </Box>
            <Box margin={{ bottom: '-18px' }}>
                <Menu />
            </Box>
            <Box direction={'row'} gap={'32px'} width={'150px'}>
                <Icon src={darkModeIcon} onClick={toggleTheme} />
                {walletStore.lastUsedAddress &&
                  <AccountButton />
                }
                {!walletStore.lastUsedAddress &&
                  <Button primary color={'buttonBackground'} label={'Connect to a wallet'} onClick={onConnectClicked} />
                }
            </Box>
        </Box>
    </HeaderContainer>
})

export default AppHeader
