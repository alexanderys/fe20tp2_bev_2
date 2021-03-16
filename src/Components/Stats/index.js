import React from 'react';
import { withAuthorization } from '../Session';

function Stats() {
    return (
        <div>
            Stats
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Stats);
