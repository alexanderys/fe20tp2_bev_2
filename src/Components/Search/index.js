import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../Session';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');

    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }


    return (
        <div>
            <input
                name='search'
                type="text"
                value={searchTerm}
                onChange={onInputChange}
            />
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Search);