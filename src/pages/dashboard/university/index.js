import React, {useState} from 'react';
import {Button, Card, Col, Form, Input, Row, Space} from "antd";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment";
import handleRequest from "@/utilities/handleRequest";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const CourseUniversity = () => {
    const [rerender, setRerender] = useState(0)
    const [deletingID, setDeletingID] = useState('')
    const [loading, setLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [subjectId, setIsUniversityId] = useState('')

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        setLoading(true)
        const result = await handleRequest(values.id ? 'patch' : 'post', values.id ? `/universities/${values.id}` : '/universities', values);
        if (result.success) {
            setRerender(rerender + 1)
            form.resetFields()
            setIsUniversityId('')
        }
        setLoading(false)
    }

    const deleteHandler = async (id, name) => {
        setDeletingID(id)
        const isConfirm = window.confirm(
            "Are you sure delete - " + name?.toUpperCase() + " - university"
        );
        if (isConfirm) {
            setIsDeleting(true)
            await handleRequest('delete', `universities/${id}`)
            setIsDeleting(false)
            setRerender(rerender + 1)
        }
    };
    const updateHandler = async (id) => {
        setIsUniversityId(id)
        const result = await handleRequest('get', `universities/${id}`)
        if (result.success) {
            form.setFieldsValue(result?.data)
        }
    };
    const onReset = () => {
        form.resetFields();
        setIsUniversityId('')
    };

    const columns = [
        {
            title: "University Name",
            dataIndex: "name",
            key: "name",
            render: (value, _) => value?.toUpperCase(),
        },
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (urls, items) =>{
                return <img width={150} src={process.env.NEXT_PUBLIC_ROOT + urls?.secure_url} alt={items.name} />
            }
        }, {
            title: "Ranking",
            dataIndex: "ranking",
            key: "ranking"
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country"
        },
        {
            title: "Created Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value, _) => moment(value).format('LLL'),
        },
        {
            title: "Updated Date",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (value, _) => moment(value).format('LLL'),
        },

        {
            title: "Action",
            dataIndex: "_id",
            render: (id, data) => {
                if (data.name !== "super_admin") {
                    return (
                        <Space wrap key={id}>
                            <Button

                                type={'primary'}
                                style={{background: 'forestgreen'}}
                                onClick={() => updateHandler(id)}
                            >
                                <EditOutlined/>
                            </Button>
                            <Button
                                loading={id === deletingID ? isDeleting : false}
                                disabled={isDeleting}
                                type={'primary'}
                                style={{background: 'darkorange'}}
                                onClick={() => deleteHandler(id, data.name)}
                            >
                                {id === deletingID && isDeleting ? '' : <DeleteOutlined/>}
                            </Button>
                        </Space>
                    );
                }
            },
        },
    ];

    return (
        <>
            <Row gutter={32}>
                <Col span={16}>
                    <SharedTable
                        tableName='Course University'
                        tableColumn={columns}
                        url={'universities'}
                        RightElement={<></>}
                        rerender={rerender}
                    />
                </Col>
                <Col span={8}>
                    <Card>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label='University Name'
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'University name is required!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                hidden
                                name="id"
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Space size={6}>
                                    <Button loading={loading} type="primary" htmlType="submit">
                                        {subjectId ? 'Update' : 'Create'}
                                    </Button>
                                    <Button onClick={() => onReset()} htmlType="button">
                                        Reset
                                    </Button>
                                </Space>

                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CourseUniversity;

CourseUniversity.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>{page}</DashboardLayout>
    );
};