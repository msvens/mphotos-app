import React from 'react';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';
//import '@material-ui/lab/themeAugmentation'
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import MPhotosApp from "./MPhotosApp"
import PhotosApi, {Guest, User, UXConfig} from "./common/api";
import {useGuest, useUser, useUXConfig} from "./common/hooks";

interface IMPContext {
    isGuest: boolean
    guest: Guest
    isGuestLoading: boolean
    checkGuest: () => void
    isUser: boolean
    user: User
    checkUser: () => void
    uxConfig: UXConfig
    checkUXConfig: () => void
}

const dummyContext: IMPContext = {
    isGuest: false,
    isGuestLoading: false,
    guest: {
        name: "",
        email: ""
    },
    checkGuest: () => {
        alert("dummy")
    },
    isUser: false,
    user: {
        name: "",
        bio: "",
        pic: ""
    },
    checkUser: () => {
        alert("dummy")
    },
    uxConfig: PhotosApi.defaultUxConfig,
    checkUXConfig: () => {
        alert("dummy")
    }
}

export const MPContext = React.createContext<IMPContext>(dummyContext)

function App() {

    const [isGuest, guest, isGuestLoading, checkGuest] = useGuest()
    const [isUser, user, checkUser] = useUser()
    const [uxConfig, checkUXConfig] = useUXConfig()

    const defaultContext: IMPContext = {
        isGuest: isGuest,
        guest: guest,
        isGuestLoading: isGuestLoading,
        checkGuest: checkGuest,
        isUser: isUser,
        user: user,
        checkUser: checkUser,
        uxConfig: uxConfig,
        checkUXConfig: checkUXConfig
    }

    let theme = React.useMemo(
        () => createMuiTheme({
            palette: {
                type: uxConfig.colorTheme === 'dark' ? 'dark' : 'light'
            },
            typography: {
                body1: {
                    lineHeight: '1.5em',
                },
                body2: {
                    lineHeight: '1.3em',
                },
                h4: {
                    marginTop: '2em',
                    textTransform: 'uppercase',
                },
                h5: {
                    marginTop: '2em',
                    textTransform: 'uppercase',
                },
                h6: {
                    fontWeight: 'normal'
                }
            },
        }), [uxConfig.colorTheme])

    /*  let theme = createMuiTheme({
        palette: {
          type: 'light'
        },
        typography: {
          body1: {
            lineHeight: '1.5em',
          },
          body2: {
            lineHeight: '1.3em',
          },
          h4: {
            marginTop: '2em',
            textTransform: 'uppercase',
          },
          h5: {
            marginTop: '2em',
            textTransform: 'uppercase',
          },
          h6: {
            fontWeight: 'normal'
          }
        },
      })*/

    theme = responsiveFontSizes(theme)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <MPContext.Provider value={defaultContext}>
                <MPhotosApp/>
            </MPContext.Provider>
        </ThemeProvider>
    );
}

export default App;
