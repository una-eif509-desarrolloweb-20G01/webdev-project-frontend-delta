import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import {Form, Input, Alert, Modal, Button} from 'antd';
import { useHistory} from "react-router-dom";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import TimesheetService from "../services/timesheet.service";
import moment from 'moment';

/*const {confirm} = Modal;

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
];
*/
const AddHours = (props) => {
/*
    const [form] = Form.useForm();
    const [timesheetDetails, setTimesheetDetails] = useState(initialTimesheetDetailsState);
    const [isNew, setIsNew] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    /
    const fillForm = useCallback(
        () => {
            form.setFieldsValue({
                name: timesheet.name,
                startDate: moment(timesheet.startDate).format("YYYY-MM-DD"),
                endDate: moment(timesheet.endDate).format("YYYY-MM-DD"),
            });
        },
        [form, timesheet],
    );

    useLayoutEffect(() => {
        setIsNew(!props.match.params.id);
        retrieveTimesheetById(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        fillForm();
    }, [fillForm]);


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

    const saveUpdateForm = () => {
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
    };

    const deleteTimesheet = (idTimesheet) => {
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
    }


    const handleInputChange = event => {
        let {name, value} = event.target;
        setTimesheet({...timesheet, [name]: value});
    };

    const handleClose = () => {
        setTimesheet(initialTimesheetState);
        setSubmitted(false);
    };
    const onFinish = data => {
        console.log(timesheet);
        saveUpdateForm();
    };

    const onReset = () => {
        form.resetFields();
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete this Timesheet?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Timesheet ['.concat(timesheet.name).concat(']'),
            onOk() {
                deleteTimesheet(timesheet.idTimesheet);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }*/

    return (  
       /*
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="timesheet"
                    label="Time Sheet"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    disabled 
                >
                    <Input
                        name="timesheet"
                        disabled={true}
                        placeholder="Time Sheet"
                    />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="lastName"
                        onChange={handleInputChange}
                        placeholder="Last Name"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        name="username"
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        onChange={handleInputChange}
                        placeholder="User Name"
                    />
                </Form.Item>

                {submitted ? (
                    <Alert message="Timesheet Saved" type="success" showIcon closable afterClose={handleClose}/>
                ) : null}

                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}
            </Form>
        </div>*/

        <h1>In progress</h1>
    );
}


 
export default AddHours;