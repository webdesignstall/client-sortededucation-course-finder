import React from 'react';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Checkbox, Col, Form, Input, Row} from 'antd';
import AuthFromWrapper from "@/components/FormWrapper/AuthFromWrapper";
import Link from "next/link";
const LoginPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (

        <AuthFromWrapper formName='Reset Password'>
            <Form
                id="components-form-demo-normal-login"
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Password!',
                        },
                    ]}
                >
                    <Input
                        size='large'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Confirm Password!',
                        },
                    ]}
                >
                    <Input
                        size='large'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Reset Now
                    </Button>
                    Or <Link href="/login">Login</Link>
                </Form.Item>
            </Form>
        </AuthFromWrapper>

    );
};
export default LoginPage;