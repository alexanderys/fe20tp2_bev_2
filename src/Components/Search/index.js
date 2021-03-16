import React from 'react';
import { withAuthorization } from '../Session';

function Search() {
    return (
        <div>
            Search
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Search);