import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {createGlobalStyle} from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {darkTheme, lightTheme} from "./themes";
import AppHeader from "./components/AppHeader";
import {useStores} from "./use-stores";
import {observer} from "mobx-react";
import { Grommet } from 'grommet';
import {AppContent} from "./components/AppContent";
import './index.css'

const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme }>`
  body {
      background: ${props => props.theme.global.colors.background};
      transition: background 2500ms;
  }
`

const App = observer(() => {
    const { configStore } = useStores()
    return (
      <Grommet
        theme={configStore.themeMode === 'light' ? lightTheme : darkTheme}
        themeMode={configStore.themeMode}
        full
      >
          <BrowserRouter>
              <GlobalStyles />
              <AppHeader />
              <AppContent />
              <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
              />
          </BrowserRouter>
      </Grommet>
    );
})

const rootElement = document.getElementById("root");
render(<App />, rootElement);
