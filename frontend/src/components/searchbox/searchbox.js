import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchMovies } from '../../app/moveSearch';

function Searchbox() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    return(
        <>
            <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    dispatch(searchMovies(query));
                }
            }} />
        </>
    );
}

export default Searchbox;