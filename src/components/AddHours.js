import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import { useHistory} from "react-router-dom";
import TimesheetService from "../services/timesheet.service";
import DepartmentService from "../services/department.service";
import {Form, Alert, Input, Button,Modal, Row, Col, Select} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import UserService from "../services/user.service";
import moment from 'moment';

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
/*
const initialTimesheetDetailsState = [
    {
        "idTimesheetDetails": null,
        "paid": false,
        "approved": false,
        "hourstList": [],
        "timesheet": {
            "idTimesheet": null,
            "name": "",
            "startDate": "",
            "endDate": ""
        }
    }
];*/
const initialTimesheetState = [
    {
        "idTimesheet": null,
        "name": "",
        "startDate": "",
        "endDate": ""
    }
];


const AddHours = (props) => {

    const [form] = Form.useForm();
    const [isNew, setIsNew] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [timesheet, setTimesheet] = useState(initialTimesheetState);
    const [user, setUser] = useState();

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

    /*const getTimesheet = () => {
        TimesheetService.getAll()
            .then(response => {
                console.log(response.data);
                setTimesheet(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
            });
    }*/
    


    /*const fillForm = useCallback(
        () => {
            form.setFieldsValue({
                name: timesheet.name,
                startDate: moment(timesheet.startDate).format("YYYY-MM-DD"),
                endDate: moment(timesheet.endDate).format("YYYY-MM-DD"),
            });
        },
        [form, timesheet],
    );*/

    /*useLayoutEffect(() => {
        setIsNew(!props.match.params.id);
        retrieveTimesheetById(props.match.params.id);
    }, [props.match.params.id]);*/

    useEffect(() => {
        getDepartments();
        //getTimesheet();
    }, []);


    /*const retrieveTimesheetById = (idTimesheet) => {
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
    };*/

    /*const saveUpdateForm = () => {
        if (isNew) {
            TimesheetService.create(timesheet)
                .then(response => {
                    setTimesheet(response.data);
                    setSubmitted(true);
                    form.resetFields();
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
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
        }
    };*/

    /*const deleteTimesheet = (idTimesheet) => {
        if (idTimesheet) {
            TimesheetService.remove(idTimesheet)
                .then(response => {
                    console.log(response.data);
                    props.history.push("/timesheets");
                    window.location.reload();
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        }
    }*/


   /*const handleInputChange = event => {
        let {name, value} = event.target;
        setTimesheet({...timesheet, [name]: value});
    };*/

    const handleClose = () => {
        //setTimesheet(initialTimesheetState);
        setSubmitted(false);
    };
    const handleSelectChangeTimesheet = value => {
        setTimesheet({...timesheet,timesheet: timesheet.find(timesheet=>timesheet.idTimesheet === value)});
    }
    const handleSelectChange = value => { 
        setDepartments({...departments, department: departments.find(department=>department.idDepartment === value)});
    }
    const handleInputChange = event => {
        let {name, value} = event.target;
        setTimesheet({...timesheet, [name]: value});
    };
    const onFinish = data => {
        console.log("fin");
        //saveUpdateForm();
    };

    const onReset = () => {
        form.resetFields();
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete this Hour?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Hour []',
            /*onOk() {
                deleteTimesheet(timesheet.idTimesheet);
            },
            onCancel() {
                console.log('Cancel');
            },*/
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
                                name="timesheet"
                                onChange={handleInputChange}
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
                                name="department"
                                onChange={handleSelectChange}
                                placeholder="Select your department "
                                options={departments.map(department=> ({value: department.idDepartment, label: department.name}) ) }
                            />
                    </Form.Item>

                    <Form.Item 
                        name="monday"
                        label="Monday" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                name="monday"
                                type="number"
                                onChange={handleInputChange}
                                placeholder="monday"
                            />
                    </Form.Item>

                    <Form.Item 
                        name="tuesday"
                        label="Tuesday" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                name="tuesday"
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Tuesday"
                            />
                    </Form.Item>

                    <Form.Item 
                        name="wednesday"
                        label="Wednesday" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                name="wednesday"
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Wednesday"
                            />
                    </Form.Item>

                    <Form.Item 
                        name="thursday"
                        label="Thursday" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                name="thursday"
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Thursday"
                            />
                    </Form.Item>

                    <Form.Item 
                        name="friday"
                        label="Friday" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                name="friday"
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Friday"
                            />
                    </Form.Item>

                    <Form.Item 
                        name="saturday"
                        label="Saturday" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                name="saturday"
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Saturday"
                            />
                    </Form.Item>

                    <Form.Item 
                        name="sunday"
                        label="Sunday" 
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                           
                            <Input
                                name="sunday"
                                type="number"
                                onChange={handleInputChange}
                                placeholder="Sunday"
                            />
                    </Form.Item>
                    


                    <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>

                    {isNew ? null : 
                        <Button danger
                                onClick={showConfirm}
                        >
                            Delete
                        </Button>
                    }
                    
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