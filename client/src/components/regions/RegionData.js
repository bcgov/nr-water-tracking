import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useParams } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import TrackerURL from "../apis/TrackerURL";
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { COLUMNS } from './columns';
import GlobalFilter from './columns/GlobalFilter';

const RegionalData = () => {

//==================// State variables to save the table data //==================//
    const [dataSet, setDataSet] = useState([]);
    const [archive, setArchive] = useState(false);
    const columns = useMemo(() => COLUMNS, []);
    let history = useHistory(); //  Sets a history variable
    let { regionID } = useParams();
    let archiveCurrent = false;

//==================//  Set the localStorage with the region id  and region name //==================//
    let regionName = (regionID) => {
        let rName = '';
        switch(regionID) {
            case '1':
                rName = 'Omineca';
                break;
            case '2':
                rName = 'Skeena';
                break;
            case '3':
                rName = 'North East';
                break;
            case '4':
                rName = 'West Coast';
                break;
            case '5':
                rName = 'South Coast';
                break;
            case '6':
                rName = 'Thompson-Okanagan';
                break;
            case '7':
                rName = 'Kootenay-Boundary';
                break;
            case '8':
                rName = 'Cariboo';
                break;
            default:
                rName = 'No Region Selected. Please select a region';
        }
        return rName;
    }
    // Set local storage
    localStorage.setItem('region-b2u6y42', `${regionID}`);
    localStorage.setItem('regionName-b2u6y42', `${regionName(regionID)}`)

//==================// to load the data from the server //==================//
    useEffect(() => {
        const fetchData = async () => {
            try {
                //response holds the data object in json format
                const response = await TrackerURL.get('/regional-table-values', {
                    params: {
                                regionID,
                                archive
                            }
                });
                // setData extracts the data from the rows
                setDataSet(response.data.data.watertrack);
            } catch (err) {
                // If there is an error log message
                console.error(err.message);
            }
        };
        // call fetchData
        fetchData();
    }, [regionID, archive]);
    
    const handleChange = (e) => {
        if(e.target.name === "archive") {
            console.log(archiveCurrent);
            archiveCurrent = true; // db archive default is archive = false 
            setArchive(true);
        } else if(e.target.name === "current") {
            console.log(archiveCurrent);
            archiveCurrent = false; // archive = false for all current records
            setArchive(false);
        }
        return archive;
    }
    
//==================// Put the column data and fetched data into the tableProps //==================//
    const {
        getTableProps,
        getTableBodyProps,
        // COLUMN Headers (no groups in this table)
        headerGroups,
        // Contains row data
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns: columns, // Has the column layout and headers
        data: dataSet  // Contains the data from server
    },
        useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex, pageSize } = state;

    const handleTrackerSelect = (id) => {
        localStorage.setItem('waterTrackID', `${id}`)
        history.push(`/file-details/${regionID}/${id}`);
        console.log(id);
    };
//==================// Return the jsx to render in browser //==================//
    return (
        <>
            <div className="table-archive">
                <div className="archive-btns">
                    <button 
                        name="archive" 
                        className="buttons btn btn-dark" 
                        onClick={handleChange}
                    >
                        ARCHIVE
                    </button>
                    <button 
                        name="current" 
                        className="buttons btn btn-dark" 
                        onClick={handleChange}
                    >
                        CURRENT
                    </button>
                </div>
                <div className="search-bar-nb">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
            </div>
    
            <div className="table-responsive">
                {/* Get the table columns and data */}
                <table className="table table-nb" id="tracker-table" {...getTableProps()}>
                    <thead>
                        {/* Iterate through the header groups */}
                        {
                            headerGroups.map((headerGroup) => (
                                <tr className="thead-row-nb"
                                    {...headerGroup.getHeaderGroupProps()}>
                                    {/* Create the header row(s) with Header titles from COLUMNS */}
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? 
                                                        (column.isSortedDesc ? 
                                                            <FaIcons.FaSortDown /> : <FaIcons.FaSortUp />) : <FaIcons.FaSort />}
                                                </span>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {/* Iterate through the row data */}
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr 
                                        className="text-nowrap"
                                        key={row.original.id}
                                        onClick={() => handleTrackerSelect(row.original.wt_id)}
                                            {...row.getRowProps()}>
                                            {
                                                row.cells.map((cell) => {
                                                    return (
                                                        <td {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })
                                            }  
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>   
            </div>
            {/* React tables pagination */}
            <div className="page-button-container flex-wrap">
                <select 
                        className="custom-select"
                        style={{ width: '200px' }}
                        value={pageSize} 
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        aria-label="Select number of rows to display"
                >
                    {
                        [5, 10, 15, 20, 30, 40].map((pageSize) => (
                            <option 
                                key={pageSize} 
                                value={pageSize}
                            >
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <span 
                    className="buttons"
                >
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span className="buttons"> 
                    | Go to page: {' '}
                    <input 
                        type="number" 
                        min="1"
                        max={pageCount}
                        defaultValue={pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                            }}
                        style={{ width: '60px' }}
                    />
                </span>
                <button 
                    className="buttons page-iterator" 
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    aria-label="Goto first page"
                >
                    <FaIcons.FaAngleDoubleLeft />
                </button>
                <button 
                    className="buttons page-iterator" 
                    id="prev-next"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    aria-label="Goto previous page"
                >
                    Previous
                </button>
                <button 
                    className="buttons page-iterator" 
                    id="prev-next"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    aria-label="Goto next page"
                >
                    Next
                </button>
                <button 
                    className="buttons page-iterator" 
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    aria-label="Goto last page"
                >
                    <FaIcons.FaAngleDoubleRight />
                </button>
            </div>
        </>
    )
}

export default RegionalData;
