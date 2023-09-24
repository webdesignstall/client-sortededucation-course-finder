import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {Button, Col, Form, Input, Row, Select, Spin} from "antd";
import handleRequest from "@/utilities/handleRequest";

const {Option} = Select;
const EmployeeForm = ({employeeId}) => {
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const router = useRouter();
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([])
    const onFinish = async (values) => {
        setLoading(true)
        const result = await handleRequest(employeeId ? 'patch' : 'post' , employeeId ? `/employees/${employeeId}` : '/employees', values);
        if (result.success){
            await router.push('/dashboard/employee/list')
        }
        setLoading(false)
    }

    useEffect(() => {
        (async ()=>{
            if (employeeId){
                setFetching(true)
                const result = await handleRequest('get' , `/employees/${employeeId}`);
                if (result?.success){
                    form.setFieldsValue(result?.data)
                }
                setFetching(false)
            }
        })()
    }, [employeeId]);

    useEffect(() => {
        (async ()=>{

            const roles = await handleRequest('get' , `/roles-dropdown`);
            if (roles?.success){
                setRoles(roles?.data)
            }
        })()
    }, []);

    return (
        <>
            {
                fetching ? <div style={{display: 'flex', justifyContent: "center", alignItems: "center", height: "60vh"}}><Spin size='large'/> </div>:
                    <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Row gutter={[20, 20]}>
                        {employeeId ? <Col span={6}>
                            <Form.Item
                                label='Select Role'
                                name="roleId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Role is required!',
                                    },
                                ]}
                            >
                                <Select
                                    size='large'
                                    placeholder='Select a role'
                                    showSearch
                                >
                                    {
                                        roles?.length ? roles?.map( role => (
                                            <Option style={{textTransform: 'uppercase', fontWeight: 'bold', padding: '10px'}} key={role?.id} value={role?.id}>{role?.name}</Option>
                                        )) : ""
                                    }

                                </Select>
                            </Form.Item>
                        </Col> : <>
                            <Col span={12}>
                                <Form.List name="name">
                                    {(fields) => (
                                        <>
                                            <Row gutter={24}>
                                                <Col xs={24} sm={24} md={12} lg={12}>
                                                    <Form.Item
                                                        name='firstName'
                                                        label='First Name'
                                                        style={{width: '100%'}}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'First Name is required!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input size='large' placeholder='first name'/>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={12} lg={12}>
                                                    <Form.Item
                                                        name='lastName'
                                                        label='Last Name'
                                                        style={{width: '100%'}}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Last Name is required!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input size='large' placeholder='last name'/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                        </>
                                    )}

                                </Form.List>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label='Email'
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email is required!',
                                        },
                                    ]}
                                >
                                    <Input size='large'/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label='Mobile'
                                    name="mobile"
                                >
                                    <Input size='large'/>
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item
                                    label='Select Role'
                                    name="roleId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Role is required!',
                                        },
                                    ]}
                                >
                                    <Select
                                        size='large'
                                        placeholder='Select a role'
                                        showSearch
                                    >
                                        {
                                            roles?.length ? roles?.map( role => (
                                                <Option style={{textTransform: 'uppercase', fontWeight: 'bold', padding: '10px'}} key={role?.id} value={role?.id}>{role?.name}</Option>
                                            )) : ""
                                        }

                                    </Select>
                                </Form.Item>
                            </Col>
                        </>}


                    </Row>


                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">
                            {employeeId ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            }


        </>
    );
};

export default EmployeeForm;