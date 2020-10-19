import React, {useState, useEffect} from "react";
import {Alert, Table} from 'antd';

import HourService from "../services/hour.service";

const initialHourListState = [
    {
        "idHour": 0,
        "hours": 0,
        "date": ""
    }
];

const Hour = (props) => {
    const [HourList, setHourList] = useState(initialHourListState);
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
        HourService.getAll()
            .then(response => {
                setHourList(response.data);
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
            title: 'Hour',
            render: (Hour) => Hour.hours
        }
    ];

    return (
        <div>
            <Table rowKey={Hour => HourList.idHour} columns={columns} dataSource={HourList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )
};

export default Hour;