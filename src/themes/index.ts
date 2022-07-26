import {deepMerge} from "grommet/utils";

export const palette = {
    LightGrey2: '#AAAAAA',
    LightGray: '#777777',
    Grey: '#313131',
    DarkGrey: '#292929',
    Blue: '#356AE5',
    BlueDark: '#1F5AE2'
}

export const lightTheme = {
    global: {
        palette,
        focus: {
            border: {
                color: "transparent",
            },
        },
        font: {
            family: "Nunito",
            size: "14px",
            height: "20px",
        },
        colors: {
            background: '#F2F3F7',
            borderBox: palette.LightGray,
            titleSecondary: palette.LightGray,
            border: palette.LightGray,
            modalBackground: 'white',
            modalBorder: palette.DarkGrey,
            secondary: '#777777',
            buttonBackground: palette.BlueDark
        }
    },
    text: {
        medium: {
            size: '14px'
        }
    },
    button: {
        primary: {
            background: {
                color: {
                    dark: 'white',
                    light: 'white'
                }
            }
        },
        border: {
            width: '1px',
            color: '#AAAAAA'
        },
        active: {
            border: {
                width: '1px'
            }
        }
    },
    tabs: {
        header: {
            extend: (props: any) => `
            button[role="tab"] div {
                color: white;
                padding-right: 8px;
                padding-left: 8px;
                border-color: transparent;
                
                span {
                   font-size: 18px;
                   color: #555555;
                   font-weight: bold;
                }
            }
            
            button[role="tab"][aria-selected="true"] div {
                border-color: ${palette.BlueDark};

                span {
                    color: #111111;
                    font-weight: bold;
                }
            }
        `,
        },
        panel: {
            extend: (props: any) => `
                
            `
        }
    },
    layer: {
        overlay: {
            background: 'rgba(0, 0, 0, 0.75)'
        }
    }
};

export const darkTheme = deepMerge(lightTheme, {
    global: {
        colors: {
            background: 'black',
            border: palette.Grey,
            modalBackground: '#1B1B1C'
        }
    },
    tabs: {
        header: {
            extend: (props: any) => `
                button[role="tab"] div {
                    color: white;
                    padding-right: 8px;
                    padding-left: 8px;
                    border-color: transparent;
                    
                    span {
                        color: #AAAAAA;
                    }
                }
                
                button[role="tab"][aria-selected="true"] div {
                    border-color: ${palette.BlueDark};
    
                    span {
                        color: white;
                        font-weight: bold;
                    }
                }
            `
        }
    }
})
