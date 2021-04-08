//import { createGlobalStyle } from "styled-components"

//From darkest to brightest
const color1 = '#222222';
const color2 = '#343434';
const color3 = '#e6e6e6';
const color4 = 'white';

export const lightTheme = {
    primaryColor: color1,
    secondaryColor: color2,
    primaryBackground: color4,
    secondaryBackground: color3
}

export const darkTheme = {
    primaryColor: color4,
    secondaryColor: color3,
    primaryBackground: color1,
    secondaryBackground: color2
}
/*
export const GlobalStyles = createGlobalStyle`
    //These styles apply to all elements in the app
    body {
        background-color: ${props => props.theme.primaryBackground};
        color: ${props => props.theme.primaryColor};
    }
`; */