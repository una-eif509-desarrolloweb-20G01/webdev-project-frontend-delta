import React, {useCallback, useState, useLayoutEffect, useEffect} from "react";
import {Form, Input, Alert, Modal, Button, Table} from 'antd';
import { Link , useHistory} from "react-router-dom";
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

const initialDepartmentListState = [
    {
        "idDepartment": 0,
        "name": ""
    }
];

const Department = (props) => {
    //const [DepartmentList, setDepartmentList] = useState(initialDepartmentListState);
    //const [error, setError] = useState(false);

    const [form] = Form.useForm();
    const [DepartmentList, setDepartmentList] = useState(initialDepartmentListState);
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
                label: Department.name,
            });
        },
        [form, Department],
    );

    useLayoutEffect(() => {
        setIsNew(!props.match.params.id);
        retrieveDepartmentById(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        fillForm();
        getAllPrioritiesMethod();
    }, [fillForm]);

   /* useEffect(() => {
        getAllPrioritiesMethod();
        // eslint-disable-next-line 
    },[]);*/

    /** Service methods **/
    const getAllPrioritiesMethod = () => {
        DepartmentService.getAll()
            .then(response => {
                setDepartmentList(response.data);
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

    const retrieveDepartmentById = (idDepartment) => {
        if (idDepartment) {
            DepartmentService.get(idDepartment)
                .then(response => {
                    setDepartmentList(response.data)
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            setDepartmentList(initialDepartmentListState);
        }
    };

    const saveUpdateForm = () => {
        if (isNew) {
            DepartmentService.create(Department)
                .then(response => {
                    setDepartmentList(response.data);
                    setSubmitted(true);
                    form.resetFields();
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        } else {
            DepartmentService.update(Department)
                .then(response => {
                    setDepartmentList(response.data);
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
                    history.push("/department/list");
                    console.log(response.data);
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        }
    }

    /** Handle actions in the Form **/

    /** General Methods **/
    /*const columns = [
        {
            title: 'Department',
            //render: (Department) => Department.name
            render: (Department) =>
                <Link
                    to={"/departments/add/" + Department.idDepartment}
                >
                    {Department.name}
                </Link>
        }
    ];

    return (
        <div>
            <Table rowKey={DepartmentList => DepartmentList.idDepartment} columns={columns} dataSource={DepartmentList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )*/
    const handleInputChange = event => {
        let {name, value} = event.target;
        setDepartmentList({...Department, [name]: value});
    };

    const handleClose = () => {
        setDepartmentList(initialDepartmentListState);
        setSubmitted(false);
    };

    /** General Methods **/
    const onFinish = data => {
        console.log(Department);
        saveUpdateForm();
    };

    const onReset = () => {
        form.resetFields();
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete this Department?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Department ['.concat(Department.name).concat(']'),
            onOk() {
                deleteDepartment(Department.idDepartment);
                props.history.push("/departments");
                window.location.reload();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const columns = [
        {
            title: 'Department',
            render: (Department) => Department.name
            /*render: (Department) =>
                <Link
                    to={"/departments/add/" + Department.idDepartment}
                >
                    {Department.name}
                </Link>*/
        }
    ];

    return (
        <div>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>


                <Form.Item
                    name="nombre"
                    label="Nombre"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >   

                    <Input
                        name="nombre"
                        onChange={handleInputChange}
                        placeholder="nombre"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button danger
                            onClick={showConfirm}
                    >
                        Delete
                    </Button>
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