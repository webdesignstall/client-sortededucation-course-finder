import React, {useState} from 'react';
import {KeyOutlined, LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Checkbox, Col, Form, Input, message, Row} from 'antd';
import AuthFromWrapper from "@/components/FormWrapper/AuthFromWrapper";
import Link from "next/link";
import handleRequest from "@/utilities/handleRequest";
import {setToken} from "@/utilities/sessionHelper";
const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true)
        const result = await handleRequest('post', '/login', values);
        setLoading(false)
        if (result.success){
            setToken(result.data.accessToken);
            window.location.href = '/dashboard'
        }
    };
    return (

        <AuthFromWrapper formName='Login'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input size='large' prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        size='large'
                        prefix={<KeyOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    {/*<Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>*/}

                    <Link className="login-form-forgot" href="/forgot-password" style={{color: 'red'}}>
                        Forgot password
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </AuthFromWrapper>

    );
};
export default LoginPage;