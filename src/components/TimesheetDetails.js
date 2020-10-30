import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import {Form, Input, Alert, Modal, Button} from 'antd';
import { useHistory} from "react-router-dom";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import TimesheetService from "../services/timesheet.service";
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

const initialTimesheetState = [
    {
        "idTimesheet": null,
        "name": "",
        "startDate": "",
        "endDate": ""
    }
];

const Timesheet = (props) => {

    const [form] = Form.useForm();
    const [timesheet, setTimesheet] = useState(initialTimesheetState);
    const [isNew, setIsNew] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     * 
     * 
     */
    const fillForm = useCallback(
        () => {
            form.setFieldsValue({
                name: timesheet.name,
                startDate: timesheet.startDate ? moment(timesheet.startDate).format("YYYY-MM-DD"):"",
                endDate: timesheet.endDate ? moment(timesheet.endDate).format("YYYY-MM-DD"):"",
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

    /** Handle actions in the Form **/

    const handleInputChange = event => {
        let {name, value} = event.target;
        setTimesheet({...timesheet, [name]: value});
    };

    const handleClose = () => {
        setTimesheet(initialTimesheetState);
        setSubmitted(false);
    };

    /** General Methods **/
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
    }

    return (
        <div>
            <label>Nombre: {timesheet.name} </label><br></br>
            <label>Start Date: {moment(timesheet.startDate).format("YYYY-MM-DD")} </label><br></br>
            <label>End Date: {moment(timesheet.endDate).format("YYYY-MM-DD")} </label><br></br>
        </div>

    )
};

export default Timesheet;