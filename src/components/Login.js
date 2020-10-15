import React, {useState} from "react";
import {Form, Input, Button, Alert, Row, Col} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from '@ant-design/icons';

import AuthService from "../services/auth.service";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const Login = (props) => {
    const [form] = Form.useForm();
    const [login, setLogin] = useState({});
    const [error, setError] = useState('');

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    /** Service methods **/
    const loginMethod = () => {
        AuthService.login(login)
            .then(response => {

                console.log(login);
                setLogin(response.data);
                form.resetFields();
                props.history.push("/Home");
                window.location.reload();
            })
            .catch(err => {
                setError('Login Fail');
                console.log(err);
            });
    }

    /** Handle actions in the Form **/

    const handleInputChange = event => {
        let {name, value} = event.target;
        setLogin({...login, [name]: value});
    };

    /** General Methods **/

    const onFinish = data => {
        console.log(login);
        loginMethod();
    };

    return (
        <Row>
            <Col lg={{ span: 12, offset: 6 }}>
                <Form form={form} name="control-hooks" onFinish={onFinish} layout="horizontal" {...formItemLayout}>
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
                    <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol, offset: formItemLayout.labelCol.span }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                {error ? (
                    <Alert message={error} type="error" showIcon closable/>
                ) : null}
                
            </Col>
        </Row>
    )
};

export default Login;