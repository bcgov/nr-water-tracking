import React from 'react';

const DatesForm = ({ dates, onDateChange }) => {

//==================//  Get the localStorage values for region id and region name//==================//
    let regionName = localStorage.getItem('regionName-b2u6y42');

    return (
        <>
    {/* DATES FORM */}
            <div className="form-container">
                {/* <form action=""> */}
                    <h1>Dates</h1>
                        <h3>{regionName}</h3>
    {/* ========== FCBC TO WIT ========= */}                
                    <div className="row-nb">
                    {/* Row 1 Column 1 */}
                        <h3 className="form-title-headers">
                            FRONT COUNTER BC TO WATER INFORMATION TECHNICIAN
                        </h3>
                        <div className="nbcol-3">
                            <div className="form-group required">
                                <label className="control-label" htmlFor="fcbc-to-wit-start">FCBC RECEIVED DATE</label>
                                <input 
                                    name="fcbcToWitStart"
                                    value={dates.fcbcToWitStart} 
                                    onChange={onDateChange} 
                                    type="date" 
                                    className="form-control" 
                                    id="fcbc-to-wit-start" 
                                    required={true}
                                    autoFocus 
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please provide an FCBC start date!
                                </div>
                            </div>
                        </div>
                    {/* Row 1 Column 2 */}
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="fcbc-to-wit-end">END</label>
                                <input 
                                    type="date"  
                                    name="fcbcToWitEnd"
                                    min={dates.fcbcToWitStart}
                                    value={dates.fcbcToWitEnd}  
                                    className="form-control" 
                                    id="fcbc-to-wit-end"
                                    title="Enter an end date"
                                    onChange={onDateChange}
                                />
                                
                            </div>
                        </div>
                    </div>
    {/* ========== APPLICATION READY AND WSD INITIATION ========= */}                
                    <div className="row-nb">
                    {/* Row 1 Column 1 */}
                        <h4>
                            --OPTIONAL FILE INITIATION DATE TRACKING--
                        </h4>
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="applicationReady">APPLICATION READY FOR WSD</label>
                                <input 
                                    type="date" 
                                    name="applicationReady"
                                    min={dates.fcbcToWitStart}
                                    max={dates.fcbcToWitEnd}
                                    value={dates.applicationReady}
                                    className="form-control" 
                                    id="applicationReady"
                                    title="Enter a date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    {/* Row 1 Column 2 */}
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="wsdInitiation">WSD INITIATION</label>
                                <input 
                                    type="date"  
                                    name="wsdInitiation"
                                    min={dates.applicationReady}
                                    max={dates.fcbcToWitEnd}
                                    value={dates.wsdInitiation}  
                                    className="form-control" 
                                    id="wsdInitiation"
                                    title="Enter a date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    </div>
    {/* ========== PRELIMINARY REVIEW TIME ========= */}                
                    <div className="row-nb">
                    {/* Row 2 Column 1 */}
                        <h3 className="form-title-headers">
                            PRELIMINARY REVIEW TIME
                        </h3>
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="preliminary-review-start">START</label>
                                <input 
                                    type="date" 
                                    name="preliminaryStart"
                                    min={dates.fcbcToWitEnd}
                                    value={dates.preliminaryStart}
                                    className="form-control" 
                                    id="preliminaryStart"
                                    title="Enter a start date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    {/* Row 2 Column 2 */}
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="preliminary-review-end">END</label>
                                <input 
                                    type="date" 
                                    name="preliminaryEnd"
                                    value={dates.preliminaryEnd}
                                    className="form-control" 
                                    id="preliminary-review-end"
                                    title="Enter an end date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    </div>
    {/* ========== TECH ASSESSMENT TIME ========= */}                
                    <div className="row-nb">
                    {/* Row 3 Column 1 */}
                        <h3 className="form-title-headers">
                            TECH ASSESSMENT TIME
                        </h3>
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="tech-assessment-start">START</label>
                                <input 
                                    type="date"
                                    name="techAssessmentStart"
                                    min={dates.preliminaryEnd}
                                    value={dates.techAssessmentStart}
                                    className="form-control" 
                                    id="techAssessmentStart"
                                    title="Enter a start date"
                                    onChange={onDateChange} 
                                />
                            </div>
                        </div>
                    {/* Row 3 Column 2 */}
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="tech-assessment-end">END</label>
                                <input 
                                    type="date" 
                                    name="techAssessmentEnd"
                                    value={dates.techAssessmentEnd}
                                    className="form-control" 
                                    id="tech-assessment-end"
                                    title="Enter an end date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    </div>
    {/* ========== LEGAL REVIEW TIME ========= */} 
                    <div className="row-nb">
                    {/* Row 4 Column 1 */}
                        <h3 className="form-title-headers">
                            LEGAL REVIEW TIME
                        </h3>
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="legal-review-start">START</label>
                                <input 
                                    type="date" 
                                    name="legalReviewStart"
                                    min={dates.techAssessmentEnd}
                                    value={dates.legalReviewStart}
                                    className="form-control" 
                                    id="legalReviewStart"
                                    title="Enter a start date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    {/* Row 4 Column 2 */}
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="legal-review-end">END</label>
                                <input 
                                    type="date" 
                                    name="legalReviewEnd"
                                    min={dates.legalReviewStart}
                                    value={dates.legalReviewEnd}
                                    className="form-control" 
                                    id="legal-review-end"
                                    title="Enter an end date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    </div>
    {/* ========== DECISION MADE ========= */}
                    <div className="row-nb">
                        {/* Row 5 Column 1 */}
                        <h3 className="form-title-headers">
                            DECISION MADE
                        </h3>
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="decision-made-start">START</label>
                                <input 
                                    type="date"
                                    name="sdmStart"
                                    min={dates.legalReviewEnd}
                                    value={dates.sdmStart}
                                    className="form-control" 
                                    id="sdmStart"
                                    title="Enter a start date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                        {/* Row 5 Column 2 */}
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="decision-made-end">END</label>
                                <input 
                                    type="date" 
                                    name="sdmEnd"
                                    value={dates.sdmEnd}
                                    className="form-control" 
                                    id="sdmEnd"
                                    title="Enter an end date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    </div>
    {/* ========== DISTRIBUTE AND COMPLETE ========= */}
                    <div className="row-nb">
                        {/* Row 6 Column 1 */}
                        <h3 className="form-title-headers">
                            DISTRIBUTE AND COMPLETE
                        </h3>
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="distribute-complete-start">START</label>
                                <input 
                                    type="date" 
                                    name="distStart"
                                    min={dates.sdmEnd}
                                    value={dates.distStart}
                                    className="form-control" 
                                    id="distStart"
                                    title="Enter a start date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                        {/* Row 6 Column 2 */}
                        <div className="nbcol-3">
                            <div className="form-group">
                                <label htmlFor="distribute-complete-end">END</label>
                                <input 
                                    type="date" 
                                    name="distEnd"
                                    min={dates.sdmStart}
                                    value={dates.distEnd}
                                    className="form-control" 
                                    id="distEnd"
                                    title="Enter an end date"
                                    onChange={onDateChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                {/* </form> */}
            </div>
        </>
    )
}

export default DatesForm
