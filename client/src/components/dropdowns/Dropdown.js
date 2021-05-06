import React, { useState } from 'react';
import Select from 'react-select';
//import FileDetails from '../pages/FileDetails';
import { ReviewStageDD, PurposeDD, AuthorizationTypeDD } from './DropDownData';

/* ========================/  Multi option dropdown  /======================== */
export const PurposeSelect = ({ fileDetails, setPurposeSelected }) => {

    const [purpose, setPurpose] = useState();

    const onChange = (option) => {
        setPurpose(option);
        setPurposeSelected(option);
    };

    return (
        <Select
        {...{ purpose, onChange }}
            placeholder={fileDetails ? fileDetails.purpose : 'Select...'}
            isMulti 
            name="Purpose"
            options={PurposeDD} 
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={opt => opt.label}
            getOptionValue={opt => opt.value}
        />
    )
}
/* ========================/  Dropdown  /======================== */
export const ReviewStageSelect = ({ fileDetails, setReviewSelected }) => {

    const [review, setReview] = useState();

    const onChange = (option) => {
        setReview(option); 
        setReviewSelected(option); 
    };

    return (
        <Select
            {...{ review, onChange }}
            placeholder={fileDetails ? fileDetails.review_stage : 'Select...'}
            isClearable  
            name="Review Stage"
            options={ReviewStageDD} 
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={opt => opt.label}
            getOptionValue={opt => opt.value}
        />
    )
}
/* ========================/  Dropdown  /======================== */
export const AuthorizationSelect = ({ fileDetails, setAuthorizationSelected }) => {

    const [authorization, setAuthorization] = useState();

    const onChange = (option) => {
        setAuthorization(option);
        setAuthorizationSelected(option);
    }

    return (
        <Select
            {...{ authorization, onChange }}
            placeholder={fileDetails ? fileDetails.authorization_type : 'Select...'}
            isClearable 
            name="Authorization Type"
            options={AuthorizationTypeDD} 
            className="basic-multi-select"
            classNamePrefix="select"
            getOptionLabel={opt => opt.label}
            getOptionValue={opt => opt.value}
        />
    )
}



