import axios from "axios";

/*
    The purpose of this component is to use Axios to create a 
    base URL to avoid typing the absolute URL in all instances. 
    This also makes it easier to alter the base URL without having
    to worry about changing all instances. 
*/

export default axios.create({
    baseURL: "http://localhost:3000/api/v1/master-tracker/water-track-region"
});