export function mapReportOne(inputArr, totalsArr) {
    for(let i = 0; i < inputArr.length; i++) {
        let datePart = inputArr[i].date_end.split(/[- :]/);
        let month = datePart[1];
        switch(month) {
            case '01':
                totalsArr[0] += 1;
                break;
            case '02':
                totalsArr[1] += 1;
                break;
            case '03':
                totalsArr[2] += 1;
                break;
            case '04':
                totalsArr[3] += 1;
                break;
            case '05':
                totalsArr[4] += 1;
                break;
            case '06':
                totalsArr[5] += 1;
                break;
            case '07':
                totalsArr[6] += 1;
                break;
            case '08':
                totalsArr[7] += 1;
                break;
            case '09':
                totalsArr[8] += 1;
                break;
            case '10':
                totalsArr[9] += 1;
                break;
            case '11':
                totalsArr[10] += 1;
                break;
            case '12':
                totalsArr[11] += 1;
                break;
            default:
                console.log('Error!');
                break;
        }   
    }
    return totalsArr;
}

export function mapAuthType(inputArr, totalsArr) {
    for(let i = 0; i < inputArr.length; i++) {
        let auth_type = inputArr[i].auth_type;
        switch(auth_type) {
            case 'ABANDONMENT':
                totalsArr[0] += 1;
                break;
            case 'AMENDMENT':
                totalsArr[1] += 1;
                break;
            case 'APPORTIONMENT':
                totalsArr[2] += 1;
                break;  
            case 'CHANGES IN AND ABOUT':
                totalsArr[3] += 1;
                break;          
            case 'EXISTING GROUNDWATER':
                totalsArr[4] += 1;
                break;
            case 'NEW GROUNDWATER':
                totalsArr[5] += 1;
                break;
            case 'SHORT TERM USE':
                totalsArr[6] += 1;
                break;    
            case 'SURFACE WATER':
                totalsArr[7] += 1;
                break;
            default: 
                totalsArr[7] += 0;
                break;
        }
    }
    //console.log(totalsArr);
    return totalsArr;
}

export function mapReviewStage(inputArr, totalsArr) {
    for(let i = 0; i < inputArr.length; i++) {
        let rev_stage = inputArr[i].review_stage;
        let over140 = 0;
            if(inputArr[i].days_old >= 140) {
                over140 = 1;
                console.log(inputArr[i]);
            }
        switch(rev_stage) {
            case 'TO BE DETERMINED':
                totalsArr[over140][0] += 1;
                break;
            case 'ASSIGNMENT':
                totalsArr[over140][1] += 1;
                break;
            case 'PRELIMINARY REVIEW':
                totalsArr[over140][2] += 1;
                break;  
            case 'TECH ASSESS':
                totalsArr[over140][3] += 1;
                break;          
            case 'TECH ASSESMENT':
                totalsArr[over140][3] += 1;
                break;          
            case 'LEGAL REVIEW':
                totalsArr[over140][4] += 1;
                break;
            case 'SDM DECISION':
                totalsArr[over140][5] += 1;
                break;
            case 'DISTRIBUTE AND COMPLETE':
                totalsArr[over140][6] += 1;
                break;    
            case 'FIRST NATIONS CONSULTATION':
                totalsArr[over140][7] += 1;
                break;
            default: 
                totalsArr[over140][7] += 0;
                break;
        }
    }
    console.log(totalsArr);
    return totalsArr;
}

export function mapDaysOld(inputArr, outputObj) {
    outputObj.underCount = [];
    outputObj.overCount = [];
    // create 2d array for the under 140 and over 140 stage values
    let daysOldReviewStage = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    // call function to populate the 2d array
    mapReviewStage(inputArr, daysOldReviewStage);
    // loop through array and push to the daysOldObj
    for(let i = 0; i < daysOldReviewStage[0].length; i++) {
        outputObj.underCount.push(daysOldReviewStage[0][i]);
    }
    for(let i = 0; i < daysOldReviewStage[1].length; i++) {
        outputObj.overCount.push(daysOldReviewStage[1][i]);
    }
    return outputObj;
}

export function randoColour(arr1, arr2) {
    for(let i = 0; i < arr1.length; i++) {
        let red = Math.abs(Math.floor(Math.random() * (256 - arr1[i]) + arr1[i]));
        let green = Math.abs(Math.floor((Math.random() * arr1[i]) * (256 - arr1[i]) % 256));
        let blue = Math.abs(Math.floor((Math.random() * 1000) * arr1[i] % 256));
        arr2.push(`rgb(${red}, ${green}, ${blue}, 0.6)`);
    }
    return arr2;
}

export function mapDataReport(arr, k, v) {
    for(let key in arr) {
        if(arr.hasOwnProperty(key)) {
            if(arr[key] == null) {
                k.push("0");
                v.push("0");
            } else {
                k.push(key);
                v.push(arr[key]); 
            } 
        }
    }
    return arr;
}

export function chartTitle(chart, title, legendDisplay = false) {
    chart = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: legendDisplay,
            position: 'right'
        },
        title:{
            display:true,
            text: title,
            fontSize: '30'
        },
    }
    return chart;
}
