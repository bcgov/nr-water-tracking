import React, { useState, useEffect } from 'react';
import TrackerURL from "../apis/TrackerURL";

/* 
    List water officers from water_officer table in Master Tracker 
*/

const WaterOfficerData = ({ onWOChange }) => {

//============//  Get localStorage values for region id and region name  //============//

//  Get localStorage region id
    let regionID = localStorage.getItem('region-b2u6y42');
//  Set the local states
    const [loading, setLoading] = useState(true);
    const [value] = useState();
    const [waterOfficers, setWaterOfficers] = useState([
        {
            label: "Loading...", 
            value: ""
        }
    ]);
// Get the water officers for the selected region
    useEffect(() => {
        // Set unmounted to false 
        let unmounted = false;
        //  Get the data
        const getWaterOfficers = async () => {
            try {
                const response = await TrackerURL.get('/water-officer', {
                    params: {
                                regionID
                            }
                });
                const body = response.data.data.water_officers;
                console.log(body);
                if (!unmounted) {
                    setWaterOfficers(
                        body.map(({ water_officer_id, last_name }) => (
                            { 
                                key: water_officer_id, 
                                label: last_name, 
                                value: last_name
                            }
                        ))
                    );
                    setLoading(false);
                }
                console.log({waterOfficers})
            } catch (err) {
                // If there is an error log message
                console.error(err.message);               
            }
        }
        getWaterOfficers();
        return () => {
            unmounted = true;
        };
    },[regionID, setWaterOfficers]);

return (
    <select
        name="waterOfficer" 
        disabled={loading}
        value={value}
        onChange={onWOChange}
    >
        {waterOfficers.map(({ key, label, value }) => (
            <option name="waterOfficer" key={value} value={`${key}`}>
                {label}
            </option>
        ))}
    </select>
);
} 

export default WaterOfficerData;