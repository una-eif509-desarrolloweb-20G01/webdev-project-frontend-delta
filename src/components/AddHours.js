import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import TimesheetService from "../services/timesheet.service";
import DepartmentService from "../services/department.service";
import {Form, Alert, Input, Button,Modal, Select, InputNumber} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import AuthService from "../services/auth.service";
import moment from 'moment';
import timesheetDetailsService from "../services/timesheetDetails.service";

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


const AddHours = (props) => {

    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [timesheet, setTimesheet] = useState(initialTimesheetState);
    const [user, setUser] = useState(null);
    const [dateRanges, setDateRanges] = useState([]);
    const [posTimesheetDetailUser, setPosTimesheetDetailUser] = useState(null);

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

                    const start = moment(response.data.startDate);
                    const end = moment(response.data.endDate);

                    const current = start.clone();
                    const result = [];

                    while (current.isBefore(end)) {
                        result.push(current.format("YYYY-MM-DD"));
                        current.add(1, "day");
                    }
                    setDateRanges(result);
                    
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
            const pos = timesheet.timesheetDetailsList && user? timesheet.timesheetDetailsList.findIndex(x=>x.user.idUser === user.idUser) : null;
            if (pos===-1){
                let copy = {...timesheet}
                copy.timesheetDetailsList.push({
                    approved: false,
                    hoursList: [],
                    idTimesheetDetails: null,
                    paid: false,
                    user: user,
                })
                setTimesheet(copy);
            }else{
                setPosTimesheetDetailUser(pos);
            }
            
            let fieldvalues={
                department: user? user.department.idDepartment: '',
                timesheet: timesheet? timesheet.name : ''
            };
            if(pos!==null && pos!== -1 && timesheet.timesheetDetailsList && timesheet.timesheetDetailsList[pos].hoursList){
                timesheet.timesheetDetailsList[pos].hoursList.forEach(element => {
                    fieldvalues[element.date]=element.hours;
                });
            }
            form.setFieldsValue(fieldvalues);
        },
        // eslint-disable-next-line
        [form, timesheet, user, dateRanges],
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

    const deleteTimesheetDetail = (idTimesheetDetail) => {
        if (idTimesheetDetail) {
            timesheetDetailsService.remove(idTimesheetDetail)
                .then(response => {
                    console.log(response.data);
                    props.history.push("/timesheets");
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        }
    }

    const handleClose = () => {
        //setTimesheet(initialTimesheetState);
        setSubmitted(false);
    };
    
    const handleHourChange = name => value => {
        let updated = {...timesheet}
        let hourpos = updated.timesheetDetailsList[posTimesheetDetailUser].hoursList.findIndex(x=>x.date === name);
        if(hourpos===-1){
            updated.timesheetDetailsList[posTimesheetDetailUser].hoursList.push({hours: value, date: name});
        }else{
            updated.timesheetDetailsList[posTimesheetDetailUser].hoursList[hourpos].hours = value;
        }        
        setTimesheet(updated);
    };
    const onFinish = data => {
        console.log("fin");
        saveUpdateForm();
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these hours for timesheet "'+timesheet.name+'"?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                deleteTimesheetDetail(timesheet.timesheetDetailsList[posTimesheetDetailUser].idTimesheetDetails);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (  
       
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

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
                    {dateRanges.map((date, index)=>
                        <Form.Item 
                            key={index}
                            name={date}
                            label={date}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            
                                <InputNumber
                                    name={date}
                                    type={date}
                                    onChange={handleHourChange(date)}
                                />
                        </Form.Item>
                    )}      
                    
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                        <Button danger
                                onClick={showConfirm}
                        >
                            Delete
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


 
export default AddHours;