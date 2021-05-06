
const formatDates = (str) => {
    if(str !== null)
    return str.slice(0, 10);
}

export const COLUMNS = [
    {
        Header: 'FCBC RECEIVED DATE',
        accessor: row => formatDates(row.fcbc_rec_date_start),
    },
    {
        Header: 'DAYS OLD',
        accessor: 'days_old',
        Cell: ({ value }) => {
            if(value > 0 && value < 100) {
                return <table style={{ backgroundColor: "#2ECC71" }}>{value}</table>
            } else if(value >= 100 && value <= 140) {
                return <table style={{ backgroundColor: "#F8C471" }}>{value}</table>
            } else if (value > 140) {
                return <table style={{ backgroundColor: "#D98880" }}>{value}</table>
            }
            return value
        }
    },
    {
        Header: 'vFCBC',
        accessor: 'vfcbc'
    },
    {
        Header: 'FILE NUMBER',
        accessor: 'file_number'
    },
    {
        Header: 'MULTI AGENCY',
        accessor: row => row.agency_authorization ? 'YES' : 'NO',
    },
    {
        Header: 'APPLICANT NAME',
        accessor: 'applicant_name'
    },
    {
        Header: 'SOURCE NAME',
        accessor: 'source_name'
    },
    {
        Header: 'AUTHORIZATION TYPE',
        accessor: 'authorization_type'
    },
    {
        Header: 'PURPOSE',
        accessor: 'purpose'
    },
    {
        Header: 'REVIEW STAGE',
        accessor: 'review_stage'
    },
    {
        Header: 'WATER OFFICER',
        accessor: 'last_name'
    },
    {
        Header: 'PARKED',
        accessor: row => row.parked ? 'YES' : 'NO',
        Cell: ({ value }) => {
            if(value === 'YES') {
                return <table style={{ backgroundColor: "#2ECC71" }}>{value}</table>
            }
            return <table style={{ backgroundColor: "#D98880" }}>{value}</table>
        }
    },
    {
        Header: 'PARKED TOTAL',
        accessor: 'date_parked_total'
    },
    {
        Header: 'APPLICATION WSD TOTAL',
        accessor: 'application_ready_wsd_total'
    },
    {
        Header: 'WSD TOTAL',
        accessor: 'wsd_initiation_total'
    },
    {
        Header: 'FN CONSULT TOTAL',
        accessor: 'fn_consult_total'
    },
    {
        Header: 'FCBC WIT TOTAL',
        accessor: 'fcbc_wit_total'
    },
    {
        Header: 'PRELIMINARY REVIEW',
        accessor: 'preliminary_total'
    },
    {
        Header: 'TECH ASSESSMENT',
        accessor: 'tech_assessment_total'
    },
    {
        Header: 'LEGAL REVIEW',
        accessor: 'legal_review_total'
    },
    {
        Header: 'SDM',
        accessor: 'sdm_total'
    },
    {
        Header: 'DISTRIBUTE COMPLETE',
        accessor: 'distribute_complete_total'
    },
    {
        Header: 'COMPLETION TOTAL',
        accessor: 'fcbc_total'
    },
    {
        Header: 'COMMENTS',
        accessor: 'comment_section'
    }
]