import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

let regionID = localStorage.getItem('region-b2u6y42')

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Regions',
        path: '/regions',
        icon: <FaIcons.FaMapMarkedAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Reports',
        path: `/reports/${regionID}`,
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    
    {
        title: 'Review',
        path: '/review',
        icon: <MdIcons.MdRateReview />,
        cName: 'nav-text'
    },
    {
        title: 'Water Officers',
        path: '/water-officers',
        icon: <IoIcons.IoMdPerson />,
        cName: 'nav-text'
    },
    {
        title: 'Add New File',
        path: `/add-new-file/${regionID}`,
        icon: <AiIcons.AiFillFileAdd />,
        cName: 'nav-text'
    }
];