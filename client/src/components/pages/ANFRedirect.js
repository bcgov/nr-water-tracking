import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ANFRedirect = () => {

//  Get the regionID
    let { regionID }= useParams();
//  Handle button click to redirect

    return (
        <>
            <div className="adf-redirect-header">
                <br></br>
                <p>Would you like to add another file?</p>
            </div>     
            <div className="adf-redirect">
                <span className="input-group-btn">
                    <Link 
                        className="btn btn-dark btn-lg"
                        role="button"
                        to={{
                            pathname: `/add-new-file/${regionID}`
                        }}
                    >
                        YES
                    </Link>
                </span>
                <span className="input-group-btn">   
                    <Link 
                        className="btn btn-dark btn-lg"
                        role="button"
                        to={{
                            pathname: `/regions`
                        }}
                    >
                        NO
                    </Link>
                </span>
            </div> 
        </>
    )
}

export default ANFRedirect;
