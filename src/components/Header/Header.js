import React from 'react';

import './header.css';

const Header = ({allPosts, liked}) => {
    return (
        <div className="app-header d-flex">
            <h1>Denis Preobrazhensky</h1>
            <h2>{allPosts} записей, из них понравилось {liked}</h2>
        </div>
    )
}

export default Header;