import React from 'react';
import * as FaIcons from 'react-icons/fa';

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className="search-bar-nb form-group has-search">
            <span className="form-control-feedback input-group-btn" id="search-bar"><FaIcons.FaSearch /></span>
            <input 
                className="form-control" 
                placeholder="Search" 
                aria-label="Search"
                value={filter || ''} 
                onChange={(e) => setFilter(e.target.value)} 
            />
        </div>
    )
}

export default GlobalFilter
