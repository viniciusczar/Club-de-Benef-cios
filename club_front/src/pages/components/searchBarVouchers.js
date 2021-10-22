import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

import '../../styles/components/searchBarVouchers.css';

export default function SearchBarVouchers(props) {
    const {onChange, value} = props;

    return (
        <div className="searchBar" >
                <input onChange={onChange} type="search" value={value}/>
                <SearchIcon className="formatIcon" />
            </div>
    )
}