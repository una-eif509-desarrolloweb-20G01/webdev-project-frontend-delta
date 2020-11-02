import React, {useState, useEffect} from "react";
import {Form, Alert, Input, Button, Row, Col, Select} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from '@ant-design/icons';

import UserService from "../services/user.service";
import DepartmentService from "../services/department.service";


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}


const initialUserState = {
    "idUser": null,
    "firstName" : "",
    "lastName" : "",
    "email" : "",
    "username": "",
    "password": "",
    "department":{"idDepartment": null, "name":""}
};

const Signup = (props) => {
    const [form] = Form.useForm();
    const [user, setUser] = useState(initialUserState);
    const [error, setError] = useState(false);
    const [departments, setDepartments] = useState([]);

    const getDepartments = () => {
        DepartmentService.getAll()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
            });
    }

    useEffect(() => {
        getDepartments();
    }, []);
    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    /** Service methods **/
    const signUpMethod = () => {
        UserService.signup(user)
            .then(response => {
                setUser(response.data);
                form.resetFields();
                setError(false);
            })
            .catch(err => {
                console.log(err);
                setError(err)
            });
    }

    /** Handle actions in the Form **/

    const handleInputChange = event => {
        let {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const handleSelectChange = value => {
        setUser({...user, department: departments.find(department=>department.idDepartment === value)});
    }

    /** General Methods **/

    const onFinish = data => {
        console.log(user);
        signUpMethod();
    };

    const onReset = () => {
        setUser(initialUserState);
        form.resetFields();
    };

    return (
        <Row>
            <Col lg={{ span: 12, offset: 6 }}>
                <Form layout="horizontal" {...formItemLayout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            name="firstName"
                            onChange={handleInputChange}
                            placeholder="First Name"
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
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password
                            name="password"
                            onChange={handleInputChange}
                            placeholder="Your password"
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
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
                    <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol, offset: formItemLayout.labelCol.span }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
                {user.idUser > 0 ? (
                    <Alert message="User Saved" type="success" showIcon closable />
                ) : null}
                {error ? (
                    <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
                ) : null}
                
            </Col>
        </Row>
    )
};

export default Signup;