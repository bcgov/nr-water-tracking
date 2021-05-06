import React, { useState, createContext } from 'react';

/* 
    Context API
    This enables data to be shared globally for the React components.
    This avoids having to manually pass props through intermediate elements.
    It makes the data accessible to components at different nesting levels. 
*/

export const TrackerContext = createContext();

export const TrackerContextProvider = props => {
    const [addFile, setAddFile] = useState({});
    const [tracker, setTracker] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);
    const [region, setRegion] = useState();
    const [waterOfficer, setWaterOfficer] = useState([]);

    const addTracker = (watertrack) => {
        setTracker([...tracker, watertrack]);
    }

    return (
        <TrackerContext.Provider 
            value={{
                addFile,
                setAddFile,
                tracker, 
                setTracker,
                selectedFile,
                setSelectedFile,
                region,
                setRegion,
                waterOfficer,
                setWaterOfficer, 
                addTracker}}>
            {props.children}
        </TrackerContext.Provider>
    )
};
