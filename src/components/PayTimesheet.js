import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import TimesheetService from "../services/timesheet.service";
import DepartmentService from "../services/department.service";
import {Form, Alert, Input, Button, Select, Table} from 'antd';
import AuthService from "../services/auth.service";


const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 8,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 2,
        span: 8,
    },
};

const initialTimesheetState = [
    {
        "idTimesheet": null,
        "name": "",
        "startDate": "",
        "endDate": "",
        "timesheetDetailsList":[]
    }
];


const PayTimesheet = (props) => {

    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [timesheet, setTimesheet] = useState(initialTimesheetState);
    const [user, setUser] = useState(null);
    const [selectedRowKeys, setSelectedRows] = useState([]);

    const getDepartments = () => {
        DepartmentService.getAll()
            .then(response => {
                console.log(response.data);
                setDepartments(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
            });
    }
    const retrieveTimesheetById = (idTimesheet) => {
        if (idTimesheet) {
            TimesheetService.get(idTimesheet)
                .then(response => {
                    setTimesheet(response.data);
                    console.log(response.data);
                    let sel = [];
                    if(response.data.timesheetDetailsList){
                        response.data.timesheetDetailsList.forEach(x=>{
                            if(x.paid===true)
                                sel.push(x.idTimesheetDetails)
                        })
                    }    
                    setSelectedRows(sel);
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
        
        getDepartments();

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

    const fillForm = useCallback(
        () => {
            let fieldvalues={
                department: user? user.department.idDepartment: '',
                timesheet: timesheet? timesheet.name : '',
                user: user? user.username : ''
            };        
            form.setFieldsValue(fieldvalues);
            
        },
        // eslint-disable-next-line
        [form, timesheet, user],
    );

    useEffect(() => {
        fillForm();
    }, [fillForm]);

    const saveUpdateForm = () => {
        TimesheetService.update(timesheet)
            .then(response => {
                setTimesheet(response.data);
                setSubmitted(true);
                fillForm();
                console.log(response.data);
            })
            .catch(e => {
                setError(true);
                console.log(e);
            });
    };

    const handleClose = () => {
        setSubmitted(false);
    };

    const columns = [
        {
            title: 'EmployeeId',
            render: tsd => tsd.user.idUser
        },
        {
            title: 'Employee',
            render: tsd => `${tsd.user.firstName} ${tsd.user.lastName}`
        },
        {
            title: 'Worked Hours',
            render: tsd => tsd.hoursList.reduce((ac,x)=>ac+x.hours,0)
        },
    ];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRowKeys)
            timesheet.timesheetDetailsList.forEach(x=> selectedRowKeys.includes(x.idTimesheetDetails)? x.paid=true : x.paid=false );
            console.log(timesheet.timesheetDetailsList);
        },
        selectedRowKeys,
        type: 'checkbox'
    };

    const onFinish = data => {
        console.log("fin");
        saveUpdateForm();
    };

    return (  
       
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

                    <Form.Item 
                        name="user"
                        label="User" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                disabled
                                name="user"
                                placeholder="User"
                            />
                    </Form.Item>
                    <Form.Item 
                        name="timesheet"
                        label="Timesheet" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                disabled
                                name="timesheet"
                                placeholder="Timesheet"
                            />
                    </Form.Item>

                    <Form.Item 
                        name="department"
                        label="Department" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                            <Select 
                                disabled
                                name="department"
                                placeholder="Select your department "
                                options={departments.map(department=> ({value: department.idDepartment, label: department.name}) ) }
                            />
                    </Form.Item>

                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={timesheet.timesheetDetailsList}
                        rowKey={tsd => tsd.idTimesheetDetails}
                    />
                   
                    
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Pay Marked
                        </Button>
                    </Form.Item>

                {submitted ? (
                    <Alert message="Timesheet Saved" type="success" showIcon closable afterClose={handleClose}/>
                ) : null}

                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}
            </Form>
        </div>
    );
}


 
export default PayTimesheet;