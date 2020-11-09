import React, {useState, useLayoutEffect} from "react";
import TimesheetService from "../services/timesheet.service";
import {Alert, Table, Button} from 'antd';
import AuthService from "../services/auth.service";

const initialTimesheetState = [
    {
        "idTimesheet": null,
        "name": "",
        "startDate": "",
        "endDate": "",
        "timesheetDetailsList":[]
    }
];

const __Table = (footer, key='tableKey') => ({
    className,
    style,
    children
}) => (
    <table className={className} style={style} key={key}>
        {children}
        <tfoot>
            {footer}
        </tfoot>
    </table>
);

const TableWithTFoot = ({data, columns, footer}) => (
    <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        components={{ table: __Table(footer) }}
    />
);

const StaffReport = (props) => {

    const [error, setError] = useState(false);
    const [timesheet, setTimesheet] = useState(initialTimesheetState);
    const [user, setUser] = useState(null);
    const [totalhours, setTotal] = useState(0);
    const [detailsLen, setDetailsLen] = useState(0);

    const retrieveTimesheetById = (idTimesheet) => {
        if (idTimesheet) {
            TimesheetService.get(idTimesheet)
                .then(response => {
                    setTimesheet(response.data);
                    console.log(response.data);

                    let tot = response.data.timesheetDetailsList? response.data.timesheetDetailsList.map(tsd=>
                        columns[2].render(tsd)
                    ).reduce((ac,x)=>ac+x,0) : 0;

                    setTotal(tot);

                    setDetailsLen(response.data.timesheetDetailsList? response.data.timesheetDetailsList.length : 0)
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            setTimesheet(initialTimesheetState);
        }
    }; 
    
    useLayoutEffect(() => {    

        retrieveTimesheetById(props.match.params.id);       

        const us = AuthService.getCurrentUserDetails();
        console.log(us)
        if (us) {
            setUser(us);
            
        }else{
            AuthService.logout();            
            props.history.push("/login");
        }
        // eslint-disable-next-line
    }, [props.match.params.id]);


    const columns = [
        {
            title: 'Employee',
            render: tsd => `${tsd.user.firstName} ${tsd.user.lastName}`
        },
        {
            title: 'Department',
            render: tsd => tsd.user.department.name
        },
        {
            title: 'Hours For Week',
            render: tsd => tsd.hoursList.reduce((ac,x)=>ac+x.hours,0)
        },
        {
            title: 'Status',
            render: tsd => "Paid:" + tsd.paid +
            ", Approved:" + tsd.approved
            
        },
    ];

    const footer = (
        <>
            <tr>
                <td colSpan="2" style={{textAlign: "right"}}>
                    Average Hours
                </td>
                <td>
                    {detailsLen!==0? totalhours/detailsLen:0}
                </td>
            </tr>
            <tr>
                <td colSpan="2" style={{textAlign: "right"}}>
                    Total Hours
                </td>
                <td>
                    {totalhours}
                </td>
            </tr>
        </>
        
    )

    return (  
       
        <div>
            <div>
                <label>Timesheet: {timesheet.name} </label><br></br>
                <label>User: {user? user.username : ''} </label><br></br>
            </div>
            <TableWithTFoot
                data={timesheet.timesheetDetailsList}
                columns={columns}
                footer = {footer}
            />
            <Button htmlType="button" onClick={()=> window.print()} className="no-print">
                Print
            </Button>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    );
}


 
export default StaffReport;