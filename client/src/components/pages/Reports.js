import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut, Pie, Radar } from 'react-chartjs-2';
import TrackerURL from '../apis/TrackerURL';
import { chartTitle, mapAuthType, mapDaysOld, mapReportOne, mapReviewStage, randoColour } from '../functions/ReportFunctions';

const Reports = () => {

    const [authProgress, setAuthProgress] = useState([]);
    const [decisionsMonthly, setDecisionsMonthly] = useState([]);
    const [daysOld, setDaysOld] = useState([]);
    let year = 2019;
//===============//  Set the localStorage values for region id and region name//==============//
    let regionID = localStorage.getItem('region-b2u6y42');
    let regionName = localStorage.getItem('regionName-b2u6y42');
    
//===========================//to load the data from the server //===========================//
    let reportOneReq = '/report-charts/report-one';
    let reportTwoReq = '/report-charts/report-two';
    let reportThreeReq = '/report-charts/report-three';
//====================================// Server Call //====================================//    
    useEffect(() => {
        //  Get the data
        const fetchData = async () => {
            try {
                //response holds the data object in json format
                const response = await TrackerURL.get(reportOneReq, {
                    params: {
                                regionID,
                                year,
                            }
                });
                // setData extracts the data from the rows
                    setAuthProgress(response.data.data.auth_progress);
            } catch (err) {
                // If there is an error log message
                console.error(err.message);
            }
        };
        
        const fetchData2 = async () => {
            try {
                //response holds the data object in json format
                const response = await TrackerURL.get(reportTwoReq, {
                    params: {
                                regionID,
                                year,
                            }
                });
                // setData extracts the data from the rows
                setDecisionsMonthly(response.data.data.decisions_monthly);
            } catch (err) {
                // If there is an error log message
                console.error(err.message);
            }
        };

        const fetchData3 = async () => {
            try {
                //response holds the data object in json format
                const response = await TrackerURL.get(reportThreeReq, {
                    params: {
                                regionID,
                                year,
                            }
                });
                // setData extracts the data from the rows
                setDaysOld(response.data.data.days_old);
            } catch (err) {
                // If there is an error log message
                console.error(err.message);
            }
        };
        // call fetchData
        fetchData();
        fetchData2();
        fetchData3();
    }, [regionID]);   


//====================================// Load server data //====================================//

let decMadeMonthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let decMonthColour = [];
let authType = [0, 0, 0, 0, 0, 0, 0, 0];
let authTypeColour = [];
let daysOldObj = {};

mapReportOne(decisionsMonthly, decMadeMonthly);
mapAuthType(authProgress, authType);
mapDaysOld(daysOld, daysOldObj);

//=============================// Load data //============================//
    const reportOneData = {
        labels:[
            'January',
            'February', 
            'March', 
            'April', 
            'May', 
            'June', 
            'July', 
            'August', 
            'September', 
            'October', 
            'November', 
            'December'
        ],
        datasets: [
            {
                label: 'Total Decisions',
                data: decMadeMonthly,
                backgroundColor: randoColour(decMadeMonthly, decMonthColour),
                borderWidth: 1,
                borderColor: '#ccc',
                hoverBorderWidth: 3,
                hoverBorderColor: '#333',
                hoverOpacity: 1
            }
        ],
    }
    const reportTwoData = {
        labels:[
            'Abandonment',
            'Amendment', 
            'Apportionment',
            'Changes In and About',                                  
            'Existing Groundwater',
            'New Groundwater',
            'Short Term Use',            
            'Surface Water'
        ],
        datasets: [
            {
                label: 'Authorization Type: Total in Progress',
                data: authType,
                backgroundColor: randoColour(authType, authTypeColour),
                borderWidth: 1,
                borderColor: '#ccc',
                hoverBorderWidth: 3,
                hoverBorderColor: '#333',
                hoverOpacity: 1
            }
        ]
    }
    const reportThreeData = {
        labels:[
            'TO BE DETERMINED',
            'ASSIGNMENT',
            'PRELIMINARY REVIEW',
            'TECH ASSESMENT',
            'LEGAL REVIEW',
            'SDM DECISION',
            'DISTRIBUTE AND COMPLETE',
            'FIRST NATIONS CONSULTATION'
        ],
        datasets: [
          {
            label: "Under 140",
            data: daysOldObj.underCount,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Over 140",
            data: daysOldObj.overCount,
            fill: false,
            borderColor: "#742774"
          },
          {
            label: "Over",
            data: [32, 20, 10, 12, 15, 18, 50, 24],
            fill: false,
            borderColor: "#356866"
          }
        ]
    }
    const totalDecisionsOptions = {};
    const authProgressOptions = {};
    const totalDaysOld = {};

    return (
        <>
            <div className="report-header">
                <h1>Reports by region</h1>

                <h2>{regionName}</h2>
                <button className="print-button" onClick={() => window.print()}>Print this page</button>
            </div>
            <div className="reports-container">
                <div className="row">   
                    <div className="col-lg-12 text-center" id="bar-chart" >
                        <Bar
                            data={reportOneData}
                            options={chartTitle(totalDecisionsOptions, 'Decisions Made Monthly')}
                        />
                    </div>
                    <div className="col-lg-6 text-center" id="doughnut-chart">
                        <Doughnut
                            data={reportTwoData}
                            options={chartTitle(authProgressOptions, 'Authorizations In Progress', true)}
                        />
                    </div>
                    <div className="col-lg-6 text-center" id="doughnut-chart">
                        <Pie
                            data={reportOneData}
                            options={chartTitle(totalDecisionsOptions, 'Decisions Made Monthly', true)}
                        />
                    </div>
                    <div className="col-lg-12 text-center" id="bar-chart">
                        <Radar
                            data={reportOneData}
                            options={chartTitle(authProgressOptions, 'Authorizations In Progress')}
                        />
                    </div>
                </div> 
            </div>
            <div className="reports-container">
                <div className="row">   
                    <div className="col-lg-12 text-center" id="bar-chart" >
                        <Line
                            data={reportThreeData}
                            options={chartTitle(totalDaysOld, 'Days Over/Under 140', true)}
                        />
                    </div>
                    <div className="col-lg-6 text-center" id="doughnut-chart">
                        <Doughnut
                            data={reportTwoData}
                            options={chartTitle(authProgressOptions, 'Authorizations In Progress')}
                        />
                    </div>
                    <div className="col-lg-6 text-center" id="doughnut-chart">
                        <Doughnut
                            data={reportOneData}
                            options={chartTitle(totalDecisionsOptions, 'Decisions Made Monthly')}
                        />
                    </div>
                    <div className="col-lg-12 text-center" id="bar-chart">
                        <Line
                            data={reportTwoData}
                            options={chartTitle(authProgressOptions, 'Authorizations In Progress')}
                        />
                    </div>
                </div> 
            </div>
        </>
    )
}

export default Reports;