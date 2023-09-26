import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import handleRequest from "@/utilities/handleRequest";

const { Option } = Select;
const ServicesForm = ({ courseId }) => {
    const [loading, setLoading] = useState(false);
    const [courseFetching, setCourseFetching] = useState(false);
    const router = useRouter();
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        setLoading(true);
        const result = await handleRequest( "post", "/services", values);
        if (result.success) {

        }
        setLoading(false);
    };

    useEffect(() => {
        (async () => {

                setCourseFetching(true);
                const result = await handleRequest("get", `/services`);
                if (result?.success) {
                    form.setFieldsValue(result?.data);
                }
                setCourseFetching(false);

        })();
    }, []);



    return (
        <>
            {courseFetching ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60vh",
                    }}
                >
                    <Spin size="large" />{" "}
                </div>
            ) : (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Form.Item
                                label="Services SEO Title"
                                name="seoTitle"
                                rules={[
                                    {
                                        required: true,
                                        message: "Services Page title is required!",
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Services Page Slogan"
                                name="pageTitle"
                                rules={[
                                    {
                                        required: true,
                                        message: "Services Page Slogan is required!",
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                 <Col span={24}>
                            <Form.Item
                                label="Services Page Content"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: "Services Page Content is required!",
                                    },
                                ]}
                            >
                                <Input.TextArea rows={5} size="large" />
                            </Form.Item>
                        </Col>


                    </Row>

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">
                             Update
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default ServicesForm;
