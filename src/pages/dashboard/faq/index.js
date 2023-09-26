import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment";
import handleRequest from "@/utilities/handleRequest";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const FaqFeature = () => {
    const [rerender, setRerender] = useState(0);
    const [deletingID, setDeletingID] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [subjectId, setIsQualificationId] = useState("");

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        setLoading(true);
        const result = await handleRequest(
            values.id ? "patch" : "post",
            values.id
                ? `/faqs/${values.id}`
                : "/faqs",
            values,
        );
        if (result.success) {
            setRerender(rerender + 1);
            form.resetFields();
            setIsQualificationId("");
        }
        setLoading(false);
    };

    const deleteHandler = async (id, name) => {
        setDeletingID(id);
        const isConfirm = window.confirm(
            "Are you sure delete - " + name?.toUpperCase() + " - subject",
        );
        if (isConfirm) {
            setIsDeleting(true);
            await handleRequest("delete", `faqs/${id}`);
            setIsDeleting(false);
            setRerender(rerender + 1);
        }
    };
    const updateHandler = async (id) => {
        setIsQualificationId(id);
        const result = await handleRequest("get", `faqs/${id}`);
        if (result.success) {
            form.setFieldsValue(result?.data);
        }
    };
    const onReset = () => {
        form.resetFields();
        setIsQualificationId("");
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",

        },    {
            title: "Text",
            dataIndex: "text",
            key: "text",

        },
        {
            title: "Created Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value, _) => moment(value).format("LLL"),
        },
        {
            title: "Updated Date",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (value, _) => moment(value).format("LLL"),
        },

        {
            title: "Action",
            dataIndex: "_id",
            render: (id, data) => {
                if (data.name !== "super_admin") {
                    return (
                        <Space wrap key={id}>
                            <Button
                                type={"primary"}
                                style={{ background: "forestgreen" }}
                                onClick={() => updateHandler(id)}
                            >
                                <EditOutlined />
                            </Button>
                            <Button
                                loading={id === deletingID ? isDeleting : false}
                                disabled={isDeleting}
                                type={"primary"}
                                style={{ background: "darkorange" }}
                                onClick={() => deleteHandler(id, data.name)}
                            >
                                {id === deletingID && isDeleting ? "" : <DeleteOutlined />}
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
                        tableName="FAQ Table"
                        tableColumn={columns}
                        url={"faqs"}
                        RightElement={<></>}
                        rerender={rerender}
                    />
                </Col>
                <Col span={8}>
                    <Card>
                        <Form form={form} layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Title is required!",
                                    },
                                ]}
                            >
                                <Input  size={'large'} />
                            </Form.Item>
                            <Form.Item
                                label="Text"
                                name="text"
                                rules={[
                                    {
                                        required: true,
                                        message: "Text is required!",
                                    },
                                ]}
                            >
                                <Input.TextArea size={'large'} rows={3} />
                            </Form.Item>
                            <Form.Item hidden name="id">
                                <Input  />
                            </Form.Item>
                            <Form.Item>
                                <Space size={6}>
                                    <Button loading={loading} type="primary" htmlType="submit">
                                        {subjectId ? "Update" : "Create"}
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

export default FaqFeature;

FaqFeature.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
