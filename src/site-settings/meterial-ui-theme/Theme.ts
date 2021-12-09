import { createMuiTheme } from '@material-ui/core/styles';

let Palette;
const theme = createMuiTheme({
    palette:{
        primary: {
            main: "#37B063",
            light :"#b7dbdd",
            contrastText: "#fff"
        },
        secondary: {
            main:  "#ff5b60",
            dark: '#FF2121',
            light: "#fc5c63",
            contrastText: "#ffff"
        },
        background: {
            default: "#0000",
        },
        error:{
            main:'#FF3131',
            contrastText: "#fff"
        },
        success:{
            main:'#00B259'
        },
        // default:{
        //     main: "#BBCAD9",
        //     contrastText: "#0000"
        // },
    },
    props: {
        MuiButton: {
            disableRipple: true,
            disableFocusRipple : true,
        },
    },
    overrides: {
        // focused: {
        //     borderColor: "#fffff",
        //     color: "#19857b"
        // },
        // MuiOutlinedInput: {
        //     root: {
        //         border: '1px solid #6396fc',
        //         borderLeft: `8px solid  #6396fc`,
        //     },
        //     input: {
        //         color: 'black',
        //     },
        //     notchedOutline: {
        //         border: 'none',
        //     }
        // },
        // MuiInputBase: {
        //     input: {
        //         '&:-webkit-autofill': {
        //             transitionDelay: '9999s',
        //             transitionProperty: 'background-color, color',
        //         },
        //     },
        // },
        MuiButton: {
            root:{
                '&:hover':{
                    backgroundColor:"none"
                }
            },
            textPrimary:{
                "&:hover":{
                    backgroundColor:'none'
                }
            },
            containedSecondary:{
                "&:hover":{
                    backgroundColor: 'none',
                }
            }
        },
        MuiSelect:{
            select:{
                '&:focus':{
                    backgroundColor: 'none',
                }
            }
        },
        MuiPaper:{
            elevation1:{
                boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
            }
        },
        MuiIconButton:{
            root:{
                '&:hover':{
                    backgroundColor: 'none !important',
                }
            }
        }
    },
    // props: {
    //     // Name of the component ⚛️
    //     MuiButtonBase: {
    //         // The default props to change
    //         // disableRipple: true, // No more ripple, on the whole application 💣!
    //     },
    // },
});

export default theme