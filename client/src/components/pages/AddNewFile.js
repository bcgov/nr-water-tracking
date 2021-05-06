import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthorizationSelect, PurposeSelect, ReviewStageSelect } from '../dropdowns/Dropdown'
import { TrackerContext }from '../context/TrackerContext'
import TrackerURL from '../apis/TrackerURL'
import DatesForm from './DatesForm'
import WaterOfficerData from '../dropdowns/WaterOfficerData'

const AddNewFile = ({ fileDetails }) => {

//==================================//  States  //==================================//
/* 
    Set the initial state of the file and dates. 
*/
    const [addFile, setAddFile] = useState({
        vfcbc: '',
        fileNumber: '',
        agencyAuthorization: false,
        applicantName: '',
        sourceName: '',
        authorizationSelected: '',
        purposeSelected: '',
        reviewSelected: '',
        parked: false,
        commentsSection: ''
    })
/* 
    Initial state left empty as it consistently caused errors and warnings 
*/ 
    const [dates, setDates] = useState({})
/* 
    CONTEXT: Import the states of addTracker, and region. 
    Region holds the selected region so that all nav items
    accessed, like addNewFile, will use the appropriate 
    CRUD operations to view and update data. 
*/
    const { addTracker } = useContext(TrackerContext);
    //const [waterOfficer] = useState();
    const [purposeSelected, setPurposeSelected] = useState();
    const [reviewSelected, setReviewSelected] = useState();
    const [authorizationSelected, setAuthorizationSelected] = useState();  
    

    if(fileDetails) {
        addFile.vfcbc = fileDetails.vfcbc;
        addFile.fileNumber = fileDetails.file_number;
        addFile.agencyAuthorization = fileDetails.authorization_type;
        addFile.applicantName = fileDetails.applicant_name;
        addFile.sourceName = fileDetails.source_name;
        addFile.authorizationSelected = fileDetails.authorization_type; 
        addFile.reviewSelected = fileDetails.review_stage; 
        addFile.parked = fileDetails.parked; 
        addFile.commentsSection = fileDetails.comment_section;
    };

//============//  Get localStorage values for region id and region name  //============//
//  Get the history variable
//    let history = useHistory();
//  Get the localStorage with the region id
    let { regionID } = useParams();
    let regionName = localStorage.getItem('regionName-b2u6y42');

//====================// Add the input values to the addFile state //====================//
    const handleFile = (e) => {
        let value = e.target.value;
        // if(e.target.name === "waterOfficer") {
        //     console.log('Glory to Glorzo!');
        //     let num = parseInt(value);
        //     value = num;
        // }
        setAddFile({
            ...addFile,
            [e.target.name]: value 
        });
        console.log(e.target.name + ' ' + value + ' ' + typeof(value))
    }

//=====================// Add the date values to the dates state //=====================//
    const handleDates = (e) => {
        let value = e.target.value;
        setDates({
            ...dates,
            [e.target.name]: value 
        });
    }
 
//==================// Validate switch and show/hide start/end dates //==================//
    const handleCheck = (e) => {
       
        let slider = document.getElementById("parkedSlider");
        let dateStartEnd = document.getElementById("parkedDates");
    
        if (slider.checked === true) {
            dateStartEnd.style.display = "block";
        } else if(slider.checked === false) {
            dateStartEnd.style.display = "none";
        }
        handleFile(e);
    }

//========================// On submit redirect to refresh form //========================//
    // const handleRefresh = (id) => {
    //     history.push(`/anf-redirect/${regionID}`);
    // };

//====================// This is to handle the form submit actions. //====================//
    const handleSubmit = async (e) => {
    // Prevents html page reload and preserves state
        e.preventDefault();
        window.scrollTo(0, 0);
        e.target.className += " was-validated"
    // Get purpose object array and convert to string
        const purposeArr = (arr) => {
            let thisShouldWork = '';
            if(!Array.isArray(arr) || !arr.length) {
                return arr;
            } else {
                if(arr.length === 1) {
                    thisShouldWork = `${arr[0].label}`
                } else {
                for(let i = 0; i < arr.length; i++) {
                    thisShouldWork += `${arr[i].label}, `;
                    }
                }
            }
            String(thisShouldWork);
            console.log(thisShouldWork);
            return thisShouldWork;
        }
        let blar = purposeArr(purposeSelected);
    // Submit form logic
        try {
            const response = await TrackerURL.post("/new-file-track", {
                vfcbc: addFile.vfcbc,
                file_number: addFile.fileNumber,
                agency_authorization: addFile.agencyAuthorization,
                applicant_name: addFile.applicantName,
                source_name: addFile.sourceName,
                authorization_type: authorizationSelected.label,
                purpose: blar,
                review_stage: reviewSelected.label,
                parked: addFile.parked,
                comment_section: addFile.commentsSection,
                water_officer_id: addFile.waterOfficer,
                fcbc_wit_start: dates.fcbcToWitStart,
                fcbc_wit_end: dates.fcbcToWitEnd,
                application_wsd_start: dates.applicationReady,
                application_wsd_end: dates.wsdInitiation,
                date_parked_start: dates.dateParkedStart,
                date_parked_end: dates.dateParkedEnd,
                preliminary_start: dates.preliminaryStart,
                preliminary_end: dates.preliminaryEnd,
                tech_assessment_start: dates.techAssessmentStart,
                tech_assessment_end: dates.techAssessmentEnd,
                legal_review_start: dates.legalReviewStart,
                legal_review_end: dates.legalReviewEnd,
                sdm_start: dates.sdmStart,
                sdm_end: dates.sdmEnd,
                distribute_complete_start: dates.distStart,
                distribute_complete_end: dates.distEnd,
                fcbc_completed_end: dates.fcbcCompletedEnd,
                on_hold_total: dates.onHoldTotal,
            },
                {params: {
                    regionID
                }
            });
            console.log(response);
            addTracker(response.data.watertrack);
        } catch(err) {
            console.log(err.message);
        }
    }
    
    return (
        <>
            <div className="form-container">
                <form 
                    method="post"
                    className="needs-validation" 
                    onSubmit={handleSubmit} 
                    noValidate
                >
                    <h1>Water File Basic Information</h1>
                    <h3>{regionName}</h3>
                        {/* ========================/ ROW 1 /======================== */}
                    <div className="row-nb">
                            {/* Row 1 Column 1 */}
                        <div className="nbcol-3">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="vfcbc">vFCBC</label>
                                <input 
                                    name="vfcbc"
                                    value={addFile.vfcbc}
                                    onChange={handleFile}
                                    type="text" 
                                    className="form-control" 
                                    placeholder='123456'
                                    id="vfcbc" 
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please provide a vFCBC file number!
                                </div>
                            </div>
                        </div>
                            {/* Row 1 Column 2 */}        
                        <div className="nbcol-1">
                        <legend className="col-form-label">MULTIAGENCY</legend>
                        <label className="switch">
                            <input
                                name="agencyAuthorization" 
                                value={addFile.agencyAuthorization}
                                onChange={handleFile}
                                className="form-check-input" 
                                type="checkbox" 
                                id="multiagency" 
                            />
                            <div className="slider round">
                                <span className="on">YES</span>
                                <span className="off">NO</span>
                            </div>
                        </label>
                        </div>
                            {/* Row 1 Column 4 */}
                        <div className="nbcol-1">
                        <legend className="col-form-label">PARKED</legend>
                        <label className="switch">
                            <input 
                                name="parked"
                                value={addFile.parked}
                                onChange={handleCheck}
                                className="form-check-input parked-toggle" 
                                type="checkbox" 
                                id="parkedSlider" 
                            />
                            <div className="slider round">
                                <span className="on">YES</span>
                                <span className="off">NO</span>
                            </div>
                        </label>
                        </div>
                            {/* Row 1 Column 5 */}
                        <div id="parkedDates">
                            <div className="nbcol-2">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="fcbc-rec-date">PARKED START DATE</label>
                                    <input
                                        name="dateParkedStart" 
                                        value={dates.dateParkedStart} 
                                        onChange={handleDates}
                                        min={dates.fcbcToWitStart} 
                                        type="date" 
                                        className="form-control" 
                                        id="parked-start"
                                    />
                                </div>
                            </div>
                                {/* Row 1 Column 6 */}
                            <div className="nbcol-2">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="fcbc-rec-date">PARKED END DATE</label>
                                    <input 
                                        name="dateParkedEnd"
                                        value={dates.dateParkedEnd} 
                                        onChange={handleDates} 
                                        min={dates.dateParkedStart}
                                        type="date" 
                                        className="form-control" 
                                        id="parked-end" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* ========================/ ROW 2 /======================== */}
                    <div className="row-nb">
                {/* Row 2 Column 1 */}
                        <div className="nbcol-4">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="file-number">FILE NUMBER</label>
                                <input 
                                    name="fileNumber"
                                    value={addFile.fileNumber}
                                    onChange={handleFile}
                                    type="text" 
                                    className="form-control" 
                                    placeholder='123456'
                                    id="file-number" 
                                    required={true} 
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please provide a file number!
                                </div>
                            </div>
                        </div>
                            {/* Row 2 Column 2 */}
                        <div className="nbcol-8">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="applicant-name">APPLICANT NAME</label>
                                <input 
                                    name="applicantName"
                                    value={addFile.applicantName}
                                    onChange={handleFile}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="" 
                                    id="applicant-name" 
                                    required={true} 
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please provide an applicant name!
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* ========================/ ROW 3 /======================== */}   
                    <div className="row-nb">
                {/* Row 3 Column 1 */}
                        <div className="nbcol-4">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="water-officer">WATER OFFICER</label>
                                    <WaterOfficerData addFile={addFile} onWOChange={handleFile}/>
                            </div>
                        </div>
                {/* Row 3 Column 2 */}
                        <div className="nbcol-8">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="source-name">SOURCE NAME</label>
                                    <input
                                        name="sourceName"
                                        value={addFile.sourceName}
                                        onChange={handleFile} 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Enter multiple source names seperated by (,)" 
                                        id="source-name" 
                                        required={true} 
                                    />
                                    <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please provide a source name!
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* ========================/ ROW 4 /======================== */}
                    <div className="row-nb">
                {/* Row 4 Column 1 */}
                        <div className="nbcol-4">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="purpose">PURPOSE</label>
                                <PurposeSelect {...{ fileDetails, setPurposeSelected }} />
                            </div>
                        </div>
                {/* Row 4 Column 2 */}
                        <div className="nbcol-4">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="auth-type">AUTHORIZATION TYPE</label>
                                <AuthorizationSelect {...{ fileDetails, setAuthorizationSelected }} />
                            </div>
                        </div>
                {/* Row 4 Column 3 */}
                        <div className="nbcol-4">
                            <div className="form-group">
                                <label htmlFor="review-stage">REVIEW STAGE</label>
                                <ReviewStageSelect {...{ fileDetails, setReviewSelected }} />
                            </div>
                        </div>
                    </div> 
                        {/* ========================/ ROW 5 /======================== */}  
                    <div className="row-nb">
                {/* Row 5 Column 1 */}
                        <div className="nbcol-6">
                            <div className="form-group">
                                <label className="control-label" htmlFor="comments-section">COMMENTS SECTION</label>
                                <textarea 
                                    name="commentsSection"
                                    value={addFile.commentsSection}
                                    onChange={handleFile}
                                    className="form-control" 
                                    aria-label="With textarea" 
                                    title="Add comments here"
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <DatesForm dates={dates} onDateChange={handleDates} />
                    <button 
                        type="submit" 
                        className="btn btn-lg btn-success submit-button"
                        id="submitBasicOnly"
                    >
                        Submit File
                    </button>
                </form>
            </div>
            

            <div className="form-footer"></div>
        </>
    )
}

export default AddNewFile;
