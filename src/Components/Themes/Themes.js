import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    body: 'white',
    fontColor: 'black'
}

export const darkTheme = {
    body: 'black',
    fontColor: 'white'
}

export const GlobalStyles = createGlobalStyle`
    //These styles apply to all elements in the app
    body {
        background-color: ${props => props.theme.body};
        color: ${props => props.theme.fontColor};
    }
`;