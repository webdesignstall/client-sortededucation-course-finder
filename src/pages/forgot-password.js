import React from 'react';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Checkbox, Col, Form, Input, Row} from 'antd';
import AuthFromWrapper from "@/components/FormWrapper/AuthFromWrapper";
import Link from "next/link";
const ForgotPasswordPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (

        <AuthFromWrapper formName='Forgot Password'>
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                       Next
                    </Button>
                    Or <Link href="/login">Login</Link>
                </Form.Item>
            </Form>
        </AuthFromWrapper>

    );
};
export default ForgotPasswordPage;