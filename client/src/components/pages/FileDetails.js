import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TrackerContext } from '../context/TrackerContext';
import TrackerURL from '../apis/TrackerURL';
import AddNewFile from './AddNewFile';

const FileDetails = () => {

    const { regionID, id } = useParams();
    const { selectedFile, setSelectedFile } = useContext(TrackerContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await TrackerURL.get('/details-of-the-selected-file', {
                    params: {
                        regionID,
                        id
                    }
                });
                setSelectedFile(response.data.data.watertrack);
            } catch(err) {
                console.error(err);
            }
        }

        fetchData();
    }, [regionID, id, setSelectedFile])

    console.log(selectedFile);

    return selectedFile ? <AddNewFile fileDetails={selectedFile} /> : <div className="loading">Loading...</div>
}

export default FileDetails;
