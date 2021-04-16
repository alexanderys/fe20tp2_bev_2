import { createGlobalStyle } from 'styled-components';

import Lato from './Lato-Regular.ttf';
import OverlockSC from './OverlockSC-Regular.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Lato';
        src: local('Lato'), local('Lato'),
        url(${Lato}) format("truetype")
    }
    @font-face {
        font-family: 'OverlockSC';
        src: local('OverlockSC'), local('OverlockSC-Regular'),
        url(${OverlockSC}) format('ttf')
    }
`;