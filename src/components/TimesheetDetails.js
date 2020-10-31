import React, {useState, useEffect, useLayoutEffect} from "react";
import {Alert, Table, Button} from 'antd';
import TimesheetService from "../services/timesheet.service";
import moment from 'moment';
import { Link } from "react-router-dom";


const initialTimesheetState = 
    {
        "idTimesheet": null,
        "name": "",
        "startDate": "",
        "endDate": "",
        "timesheetDetailsList": []
    };

const TimesheetDetails = (props) => {

    const [timesheet, setTimesheet] = useState(initialTimesheetState);
    const [error, setError] = useState(false);
    const [departmentHours, setDepartmentHours] = useState({});

    useEffect(()=> {
        let dpts = {}
        timesheet.timesheetDetailsList.forEach(x=>{
            dpts[x.user.department.idDepartment] ? 
                dpts[x.user.department.idDepartment] = { ...dpts[x.user.department.idDepartment], hours: x.hoursList.reduce((ac, x) => ac + x.hours, dpts[x.user.department.idDepartment].hours) } : 
                dpts[x.user.department.idDepartment] = {name: x.user.department.name, hours: x.hoursList.reduce((ac, x) => ac + x.hours, 0) };
        });
        setDepartmentHours(dpts);
    }, [timesheet])

    useLayoutEffect(() => {
        retrieveTimesheetById(props.match.params.id);
    }, [props.match.params.id]);

    /** Service methods **/
    const retrieveTimesheetById = (idTimesheet) => {
        if (idTimesheet) {
            TimesheetService.get(idTimesheet)
                .then(response => {
                    setTimesheet(response.data)
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            setTimesheet(initialTimesheetState);
        }
    }; 
    //{}

    const columns = [
        {
          title: 'Department',
          render: (department) => department.name
        },
        {
          title: 'Hours',
          render: (department) => department.hours
        },
      ];

    return (
        <>
            <div>
                <label>Nombre: {timesheet.name} </label><br></br>
                <label>Start Date: {moment(timesheet.startDate).format("YYYY-MM-DD")} </label><br></br>
                <label>End Date: {moment(timesheet.endDate).format("YYYY-MM-DD")} </label><br></br>
            </div>
            <div>
                <h3>History</h3>
                <Table rowKey={department => department.name} columns={columns} dataSource={Object.values(departmentHours)}/>
                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}
            </div>
            <Button type="primary" htmlType="button">
                <Link
                    to={"/timesheetDetails/hours/" + timesheet.idTimesheet}
                >
                    Add hours to this timesheet 
                </Link>
            </Button>
            
        </>
    )
};

export default TimesheetDetails;