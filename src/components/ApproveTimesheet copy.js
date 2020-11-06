import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import TimesheetService from "../services/timesheet.service";
import DepartmentService from "../services/department.service";

import TimesheetDetailsService from "../services/timesheetDetails.service";

import {Form, Alert, Input, Button, Select, Table,Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import AuthService from "../services/auth.service";

const {confirm} = Modal;
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


const ApproveTimesheet = (props) => {

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
    const update_approve = (item,estado) => {

        if(estado == "approve" ){
            TimesheetDetailsService.update("{idTimesheetDetails:"+item+",approved:true}")
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
        }else{
            TimesheetDetailsService.update("{idTimesheetDetails:"+item+",approved:false}")
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
        }
        
        
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
        {
            title: 'Approve',
            render: tsd =>
            <Button type="primary" onClick={(e) => showConfirm(tsd.idTimesheetDetails)}>
            YES
            </Button>
            ,
          },
          {
            title: '',
            render: tsd =>
            <Button type="primary" onClick={(e) => showConfirm_no(tsd.idTimesheetDetails)}>
            NO
            </Button>
            ,
          },
    ];


    /*const onFinish = data => {
        console.log("fin");
        saveUpdateForm();
    };*/


    const showConfirm = (item) => {
        confirm({
            title: 'Do you Want to approve this timesheet?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Approve Worked Hours',
            onOk() {
                //deleteDepartment(department.idDepartment);
                update_approve(item,"approve");
                console.log(item); //idTimesheetDetails
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const showConfirm_no = (item) => {
        confirm({
            title: 'Do you Want to Disapprove this timesheet?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Disapprove Worked Hours',
            onOk() {
                //deleteDepartment(department.idDepartment);
                update_approve(item,"disapprove");
                console.log(item);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (  
       
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={showConfirm}>

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
                        columns={columns}
                        dataSource={timesheet.timesheetDetailsList}
                        rowKey={tsd => tsd.idTimesheetDetails}
                    />
                   
                    
                    

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


 
export default ApproveTimesheet;