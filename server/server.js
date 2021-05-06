require("dotenv").config(); //  this import environment variables like port, or db connection information
const express = require("express"); //  creates the Express application
const morgan = require("morgan"); //  using as logger
const cors = require("cors");
const db = require("./db"); // refernces the index.js in the db folder
const port = process.env.PORT || 3001; // declare port from .env file

/*
1. HEADER
2. MIDDLEWARE
3. DEV
4. CRUD OPERATIONS BY REGION
    A. OMINCECA
    B. SKEENA
    C. NORTH-EAST
    D. CARIBOU
    E. THOMPSON-NICOLA
    F. SOUTH-COAST
    G. WEST-COAST
    H. OKANAGAN
    I. KOOTENAY
5. CRUD OPERATIONS WATER OFFICERS
*/

/* Create the app object. This provides access to express methods
    app.get, app.put, app.update, app.delete, and more */
const app = express();

/* ==============================|MIDDLEWARE|============================== */

app.use(morgan("tiny")); // logs the app.([method]) requests

app.use(cors());

app.use(express.json()); // express middleware 

/* ==============================|DEV|============================== */

console.log("test");

app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}.`);
});

/* ==============================| FUNCTIONS |============================== */
// let yearStart = '';
// let yearEnd = '';

// function fiscalYear(year) {
//     let fYear = `${year}-04-01`
//     yearStart = new Date(fYear);
//     yearEnd = `${year}-03-31`;
//     yearEnd.setFullYear(yearEnd.getFullYear() + 1);
//     console.log(yearStart + yearEnd);
// }

/* ==============================|START CRUD OPERATIONS REGIONS|============================== */

//=============================================================================================
// POST A FILE (CREATE) ADD NEW FILE
//=============================================================================================


app.post('/api/v1/master-tracker/water-track-region/new-file-track', async (req, res) => {
    console.log("This made a post to add new file!!");
    console.log(req.body);
    console.log(req.query.regionID);
    console.log(req.body.water_officer_id);
    console.log(req.body.vfcbc);
    let regionID = req.query.regionID;

    try {
        const results = await db.query(
            `INSERT INTO watertrack 
                (vfcbc,
                    file_number,
                    agency_authorization,
                    applicant_name,
                    source_name,
                    authorization_type,
                    purpose,
                    review_stage,
                    parked,
                    comment_section,
                    water_officer_id,
                    region_id) 
            VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11, $12);`,
                [
                    req.body.vfcbc,                         //1
                    req.body.file_number,                   //2
                    req.body.agency_authorization,          //3
                    req.body.applicant_name,                //4
                    req.body.source_name,                   //5 
                    req.body.authorization_type,            //6
                    req.body.purpose,                       //7 
                    req.body.review_stage,                  //8
                    req.body.parked,                        //9
                    req.body.comment_section,               //10
                    req.body.water_officer_id,              //11
                    regionID,                               //12
                ]
            );try {
                const datesTable = await db.query(
                    `UPDATE review_stage_dates
                    SET
                        application_wsd_start = $1,
                        application_wsd_end = $2,
                        date_parked_start = $3,
                        date_parked_end = $4,
                        fn_consult_start = $5,
                        fn_consult_end = $6,
                        fcbc_wit_start = $7,
                        fcbc_wit_end = $8,
                        preliminary_start = $9,
                        preliminary_end = $10,
                        tech_assessment_start = $11,
                        tech_assessment_end = $12,
                        legal_review_start = $13,
                        legal_review_end = $14,
                        sdm_start = $15,
                        sdm_end = $16,
                        distribute_complete_start = $17, 
                        distribute_complete_end = $18,
                        fcbc_rec_date_start = $7,
                        fcbc_completed_end = $19,
                        on_hold_total = $20
                    WHERE 
                        wt_id = (
                            SELECT wt_id
                            FROM watertrack
                            WHERE
                            file_number = $21
                            AND
                            vfcbc = $22
                        );`,
                        [
                            req.body.application_wsd_start,         //13
                            req.body.application_wsd_end,           //14
                            req.body.date_parked_start,             //15
                            req.body.date_parked_end,               //16
                            req.body.fn_consult_start,              //17
                            req.body.fn_consult_end,                //18
                            req.body.fcbc_wit_start,                //19
                            req.body.fcbc_wit_end,                  //20
                            req.body.preliminary_start,             //21
                            req.body.preliminary_end,               //22
                            req.body.tech_assessment_start,         //23
                            req.body.tech_assessment_end,           //24
                            req.body.legal_review_start,            //25
                            req.body.legal_review_end,              //26
                            req.body.sdm_start,                     //27
                            req.body.sdm_end,                       //28
                            req.body.distribute_complete_start,     //29
                            req.body.distribute_complete_end,       //30
                            req.body.fcbc_completed_end,            //31
                            req.body.on_hold_total,                 //32
                            req.body.file_number,                   //33
                            req.body.vfcbc                          //34
                        ]
                );
                console.log('Review dates updated!');
            } catch (err) {
                console.error(err.message)
            }
        res.status(201).json({
            status: 'Success!',
            data: {
                watertrack: results.rows[0],
            },
        });
    } catch (err) {
        console.error(err.message);
    };
});
//=============================================================================================
//  GET ALL (READ ALL) REGIONAL DATA
//=============================================================================================


app.get('/api/v1/master-tracker/water-track-region/regional-table-values', async (req, res) => {

    console.log(`Fetched all the data!`); // dev log
    console.log(req.query.regionID);
    let regionID = req.query.regionID;
    let archiveCurrent = req.query.archive;
    console.log(regionID, archiveCurrent);

    try {
        // First update the review stage date totals before loading data
        const updateRSD = await db.query(
            `UPDATE review_stage_dates
            SET
                application_wsd_total = application_wsd_end - application_wsd_start,
                date_parked_total = COALESCE(date_parked_end, CURRENT_DATE) - date_parked_start,
                fn_consult_total = fn_consult_end - fn_consult_start,
                fcbc_wit_total = fcbc_wit_end - fcbc_wit_start,
                preliminary_total = preliminary_end - preliminary_start,
                tech_assessment_total = tech_assessment_end - tech_assessment_start,
                legal_review_total = legal_review_end - legal_review_start,
                sdm_total = sdm_end - sdm_start,
                distribute_complete_total = distribute_complete_end - distribute_complete_start,
                fcbc_total = sdm_end - fcbc_rec_date_start,
                days_old = (COALESCE(sdm_end, CURRENT_DATE) - fcbc_rec_date_start) - 
                    (COALESCE(on_hold_total, 0) + COALESCE(date_parked_total, 0));`
        );
        console.log('Dates updated!')
        // Second load the data
        try {
        // Variable to hold the query results from database
        const results = await db.query(
            `SELECT 
                watertrack.wt_id,
                review_stage_dates.fcbc_rec_date_start::timestamp::date,
                review_stage_dates.days_old,
                watertrack.vfcbc,
                watertrack.file_number,
                watertrack.agency_authorization,
                watertrack.applicant_name,
                watertrack.source_name,
                watertrack.authorization_type,
                watertrack.purpose,
                watertrack.review_stage,
                water_officer.last_name,
                watertrack.parked,
                review_stage_dates.date_parked_total,
                watertrack.comment_section,
                review_stage_dates.fn_consult_total,
                review_stage_dates.fcbc_wit_total,
                review_stage_dates.preliminary_total,
                review_stage_dates.tech_assessment_total,
                review_stage_dates.legal_review_total,
                review_stage_dates.sdm_total,
                review_stage_dates.distribute_complete_total,
                review_stage_dates.fcbc_total
            FROM
                watertrack
            LEFT JOIN 
                water_officer
            ON
                watertrack.water_officer_id=water_officer.water_officer_id
            LEFT JOIN 
                review_stage_dates
            ON  
                watertrack.wt_id=review_stage_dates.wt_id
            WHERE
                watertrack.region_id = $1
            AND
                watertrack.archive= $2;`,
                [
                    regionID,
                    archiveCurrent
                ]
        );
        /* 
        Sends a JSON response. This method sends a response (with the correct content-type)
        that is the parameter converted to a JSON string using JSON.stringify().
        */
        res.status(200).json({  
        status: "Success!",
            results: results.rows.length, // count rows in the query response
            data: {
                watertrack: results.rows, // put the each row in data array
                rows: results.rowCount,
            },
        });

        console.log(results.rowCount)

        } catch (err) {
            console.error(err.message); // if error print error message
        }
    } catch (err) {
        console.error(err.message);
    }
});

//=============================================================================================
// GET ONE FILE (READ ONE)
//=============================================================================================



app.get('/api/v1/master-tracker/water-track-region/details-of-the-selected-file', async (req, res) => {
    console.log("This got a file!");
    let regionID = req.query.regionID;
    let id = req.query.id;
    console.log(id);

    try {
        // use parameterized query for security $1 $2, [value1, value2]
        const results = await db.query(`SELECT * 
            FROM 
                watertrack 
            LEFT JOIN
                review_stage_dates
            ON 
                watertrack.wt_id=review_stage_dates.wt_id
            WHERE
                watertrack.region_id=$1
            AND 
                review_stage_dates.wt_id=$2
            ORDER BY
                watertrack.wt_id`, 
                [regionID, id]);
        res.status(200).json({  
            status: "Success!",
                results: results.rows.length, // count rows in the query response
                data: {
                    watertrack: results.rows[0], // put the each row in data array
                },
            });
    } catch (err) {
        console.error(err.message);
    }
});
//=============================================================================================
// PUT A FILE (UPDATE)
//=============================================================================================


app.put('/api/v1/master-tracker/water-track-region/file-update-edit/:id',async (req, res) => {
    console.log('A post was updated!');
    console.log(req.params.id);
    console.log(req.body);

    res.status(200).json({
        status: "Success!"
    });
});
//=============================================================================================
// DELETE A FILE (DELETE)
//=============================================================================================


app.delete('/api/v1/master-tracker/water-track-region/file-delete-no-recovery/:id',async (req, res) => {
    console.log('Deleted the data!');

    try {
        const results = await db.query(`DELETE FROM watertrack WHERE id=$1`, [req.params.id]);
        res.status(204).json({
            status: 'Success!',
        });
    } catch (err) {
        console.error(err.message);
    }
});

/* ==============================|END CRUD OPERATIONS REGIONS|============================== */

/* ==============================|START REPORT OPERATIONS|============================== */
/* 
*                                                           *
*      _____  ______ _____   ____  _____ _______ _____      *
*     |  __ \|  ____|  __ \ / __ \|  __ \__   __/ ____|     *
*    | |__) | |__  | |__) | |  | | |__) | | | | (___        *
*   |  _  /|  __| |  ___/| |  | |  _  /  | |  \___ \        *
*  | | \ \| |____| |    | |__| | | \ \  | |  ____) |        *
* |_|  \_\______|_|     \____/|_|  \_\ |_| |_____/          *
*                                                           *
*                                                           *
*/
// GET DATES DATA
/* 
* Authorizations in progress 
*/
app.get('/api/v1/master-tracker/water-track-region/report-charts/report-one', async (req, res) => {
    console.log('This fetched report one!');
    let regionID = req.query.regionID; // assign incoming regionID param
    let year = req.query.year; // assign year variable
    console.log(regionID);

    // Check the reportNum value and then execute the get request
    // if(reportNum === 1) {
        // try to query server with the following statement
        try {
            const results = await db.query(
                `SELECT 
                    watertrack.authorization_type AS auth_type,
                    review_stage_dates.days_old AS days_old
                FROM
                    review_stage_dates
                INNER JOIN
                    watertrack ON review_stage_dates.wt_id=watertrack.wt_id
                WHERE 
                    watertrack.region_id=$1 AND watertrack.archive=$2;`, [regionID, false]
                );
            res.status(200).json({
                status: 'Success!', // report the successful query
                results: results.rows.length, // count rows in the query response
                // put the data into an object
                data: {
                    auth_progress: results.rows, // put each row in data array
                    rows: results.rowCount, // count the rows in the array
                },
            });
            //console.log(results.rows)
            //console.log(results.rowCount)
        // If query fails then log error   
        } catch (err) {
            console.error(err.message);
        }
})
/* 
* Decisions made monthly 
*/
app.get('/api/v1/master-tracker/water-track-region/report-charts/report-two', async (req, res) => {
    console.log('This fetched report two!');
    let regionID = req.query.regionID; // assign incoming regionID param
    let year = req.query.year; // assign year variable
    console.log(regionID);
    //fiscalYear(year);
    // Check the reportNum value and then execute the get request
        // try to query server with the following statement
        try {
            const results = await db.query(
                `SELECT 
                    distribute_complete_end AS DATE_END,
                    distribute_complete_total AS TOTAL
                FROM
                    review_stage_dates
                INNER JOIN
                    watertrack ON review_stage_dates.wt_id=watertrack.wt_id
                WHERE 
                    watertrack.region_id=$1 AND watertrack.archive=$2
                AND 
                    review_stage_dates.distribute_complete_end
                BETWEEN
                    '2019-12-30' 
                AND
                    '2020-12-31'`, [regionID, true]
                );
            res.status(200).json({
                status: 'Success!', // report the successful query
                results: results.rows.length, // count rows in the query response
                // put the data into an object
                data: {
                    decisions_monthly: results.rows, // put each row in data array
                    rows: results.rowCount, // count the rows in the array
                },
            });
            //console.log(results.rows)
            //console.log(results.rowCount)
        // If query fails then log error   
        } catch (err) {
            console.error(err.message);
        }
})
/* 
* Over/under 140
*/
app.get('/api/v1/master-tracker/water-track-region/report-charts/report-three', async (req, res) => {
    console.log('This fetched report three!');
    let regionID = req.query.regionID; // assign incoming regionID param
    let year = req.query.year; // assign year variable

    console.log(regionID);
    console.log(year);

    // Check the reportNum value and then execute the get request
        // try to query server with the following statement
        try {
            const results = await db.query(
                `SELECT 
                    watertrack.review_stage AS review_stage,
                    review_stage_dates.days_old AS days_old
                FROM
                    review_stage_dates
                INNER JOIN
                    watertrack ON review_stage_dates.wt_id=watertrack.wt_id
                WHERE 
                    watertrack.region_id=$1 AND watertrack.archive=$2`, [regionID, false]
                );
            res.status(200).json({
                status: 'Success!', // report the successful query
                results: results.rows.length, // count rows in the query response
                // put the data into an object
                data: {
                    days_old: results.rows, // put each row in data array
                    rows: results.rowCount, // count the rows in the array
                },
            });
            console.log(results.rows)
            console.log(results.rowCount)
        // If query fails then log error   
        } catch (err) {
            console.error(err.message);
        }
})
// GET ONE FILE (READ ONE)

// PUT A FILE (UPDATE)

// DELETE A FILE (DELETE)


/* ==============================|END REPORT OPERATIONS|============================== */

/* ==============================|START WATER OFFICER OPERATIONS|============================== */

// GET WATER OFFICER DATA
app.get('/api/v1/master-tracker/water-track-region/water-officer', async (req, res) => {
    console.log('This fetched water officer data!');
    console.log(req.query.regionID);
    let regionID = req.query.regionID;
    console.log(regionID);

    try {
        const results = await db.query(
                        `SELECT * FROM water_officer WHERE region_id=$1`,
                        [
                            regionID
                        ]);
        res.status(200).json({
            status: 'Success!',
            results: results.rows.length, // count rows in the query response
                data: {
                    water_officers: results.rows, // put the each row in data array
                    rows: results.rowCount,
                },
        });
    } catch (err) {
        console.error(err.message);
    }
})

// GET ONE FILE (READ ONE)

// PUT A FILE (UPDATE)

// DELETE A FILE (DELETE)


/* ==============================|END REPORT OPERATIONS|============================== */