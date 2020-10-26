import React, {useState, useEffect} from "react";
import {Alert, Table} from 'antd';

import TimesheetDetailsService from "../services/timesheetDetails.service";

const initialTimesheetDetailsListState = [
    {
        "idTimesheetDetails": 0,
        "approved": "",
        "paid": ""
    }
];

const TimesheetDetails = (props) => {
    const [TimesheetDetailsList, setTimesheetDetailsList] = useState(initialTimesheetDetailsListState);
    const [error, setError] = useState(false);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllPrioritiesMethod();
        // eslint-disable-next-line 
    },[]);

    /** Service methods **/
    const getAllPrioritiesMethod = () => {
        TimesheetDetailsService.getAll()
            .then(response => {
                setTimesheetDetailsList(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                if (err.response.status === 401) {
                    props.history.push("/login");
                    window.location.reload();
                }
            });
    }

    /** Handle actions in the Form **/

    /** General Methods **/
    const columns = [
        {
            title: 'TimesheetDetails',
            render: (TimesheetDetails) => TimesheetDetails.name,
            render: (TimesheetDetails) => TimesheetDetails.startDate,
            render: (TimesheetDetails) => TimesheetDetails.endDate
        }
    ];

    return (
        <div>
            <Table rowKey={TimesheetDetails => TimesheetDetailsList.idTimesheetDetails} columns={columns} dataSource={TimesheetDetailsList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )
};

export default TimesheetDetails;