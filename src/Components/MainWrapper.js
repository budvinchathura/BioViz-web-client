import React from 'react';
import MainDrawer from './Drawer/MainDrawer';

// Favicon attribution
// Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

export const MainWrapper = () =>{
    document.title = 'BioViz Web Client';
    return (
        <div>
            <MainDrawer/>
        </div>
    );
};
