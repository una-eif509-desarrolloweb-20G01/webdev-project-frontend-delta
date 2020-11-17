import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import {Form, Input, Alert, Modal, Button} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import DepartmentService from "../services/department.service";


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

const initialDepartmentState = [
    {
        "idDepartment": null,
        "name": ""
    }
];

const Department = (props) => {

    const [form] = Form.useForm();
    const [department, setDepartment] = useState(initialDepartmentState);
    const [isNew, setIsNew] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     * 
     * 
     */
    const fillForm = useCallback(
        () => {
            form.setFieldsValue({
                name: department.name,
            });
        },
        [form, department],
    );

    useLayoutEffect(() => {
        setIsNew(!props.match.params.id);
        retrieveDepartmentById(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        fillForm();
    }, [fillForm]);

    /** Service methods **/

    const retrieveDepartmentById = (idDepartment) => {
        if (idDepartment) {
            DepartmentService.get(idDepartment)
                .then(response => {
                    setDepartment(response.data)
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            setDepartment(initialDepartmentState);
        }
    };

    const saveUpdateForm = () => {
        if (isNew) {
            DepartmentService.create(department)
                .then(response => {
                    setDepartment(response.data);
                    setSubmitted(true);
                    form.resetFields();
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            DepartmentService.update(department)
                .then(response => {
                    setDepartment(response.data);
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

    const deleteDepartment = (idDepartment) => {
        if (idDepartment) {
            DepartmentService.remove(idDepartment)
                .then(response => {
                    console.log(response.data);
                    props.history.push("/departments");
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
        setDepartment({...department, [name]: value});
    };

    const handleClose = () => {
        setDepartment(initialDepartmentState);
        setSubmitted(false);
    };

    /** General Methods **/
    const onFinish = data => {
        console.log(department);
        saveUpdateForm();
    };

    const onReset = () => {
        form.resetFields();
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete this Department?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Department ['.concat(department.name).concat(']'),
            onOk() {
                deleteDepartment(department.idDepartment);
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
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >   
                    <Input
                        name="name"
                        onChange={handleInputChange}
                        placeholder="name"
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
                    <Alert message="Department Saved" type="success" showIcon closable afterClose={handleClose}/>
                ) : null}

                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}
            </Form>
            
            
        </div>

    )
};

export default Department;