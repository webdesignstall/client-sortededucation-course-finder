import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment";
import handleRequest from "@/utilities/handleRequest";
import Head from "next/head";

const { Paragraph } = Typography;
const { Option } = Select;

const CourseSubject = () => {
  const [rerender, setRerender] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactUsPageId, setContactUsPageId] = useState(false);
  const [contactUsPage, setContactUsPage] = useState(null);
  const [form] = Form.useForm();

  const deleteHandle = async (id) => {
    const isConfirm = window.confirm("Are you sure delete!");
    if (isConfirm) {
      setIsDeleting(true);
      await handleRequest("delete", `/contact-us/${id}`);
      setRerender(rerender + 1);
      setIsDeleting(false);
    }
  };

  const updateStatus = async (id, value) => {
    setIsUpdating(true);
    await handleRequest("patch", `/contact-us/`, { status: value, id });
    setRerender(rerender + 1);
    setIsUpdating(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const result = await handleRequest("post", `contact-us-page`, values);

    if (result.success) {
      form.resetFields();
      const result = await handleRequest("get", `contact-us-page`);
      if (result.success) {
        setContactUsPage(result?.data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const result = await handleRequest("get", `contact-us-page`);
      if (result.success) {
        setContactUsPage(result?.data);
      }
    })();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name.firstName + " " + name.lastName,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      defaultSortOrder: "descend",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "New",
          value: "new",
        },
        {
          text: "Reply",
          value: "reply",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => (
        <Tag
          className="fw-bold"
          color={status === "reply" ? "green-inverse" : "blue-inverse"}
        >
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (date) => moment(date).format("LLL"),
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 300,
      render: (id, data) => {
        return (
          <Space wrap key={id}>
            <Select
              defaultValue={data?.status}
              onChange={(value) => updateStatus(data?._id, value)}
            >
              <Option value="new">New</Option>
              <Option value="reply">Reply</Option>
            </Select>
            <Button type="primary">
              <a href={`mailto:${data?.email}`}>Reply</a>
            </Button>
            <Button
              loading={isDeleting}
              type="default"
              style={{ background: "red", color: "white" }}
              className="text-white"
              onClick={() => deleteHandle(id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <p
        style={{
          margin: 0,
        }}
      >
        {record?.message?.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            <Paragraph
              className="text-justify"
              style={{
                color: "var(--secondary)",
                fontSize: "1rem",
                width: "100%",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {" "}
              {line}
            </Paragraph>
          </React.Fragment>
        ))}
      </p>
    ),
  };

  return (
    <>
      <Head>
        <title>Contact Us | Dashboard</title>
      </Head>
      <Row gutter={18}>
        <Col span={16}>
          <SharedTable
            tableName="Contact US"
            tableColumn={columns}
            url={"contact-us"}
            RightElement={<></>}
            rerender={rerender}
            expandable={expandable}
            rowKey={(obj) => obj._id}
          />
        </Col>
        <Col span={8}>
          {contactUsPage ? (
            <>
              <Card
                extra={
                  <Button
                    onClick={() => {
                      setContactUsPage(null);
                      form.setFieldsValue(contactUsPage);
                      setContactUsPageId(true);
                    }}
                    type="primary"
                  >
                    Edit
                  </Button>
                }
              >
                <h2>{contactUsPage?.pageTitle}</h2>
                <div className="contact-conent">
                  <p
                    style={{
                      marginTop: 20,
                    }}
                  >
                    {contactUsPage?.content?.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        <Paragraph
                          className="text-justify"
                          style={{
                            color: "var(--secondary)",
                            fontSize: "1rem",
                            width: "100%",
                            textAlign: "justify",
                            textJustify: "inter-word",
                          }}
                        >
                          {" "}
                          {line}
                        </Paragraph>
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </Card>
            </>
          ) : (
            <Card title={"Contact Us Page"}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Title"
                  name="pageTitle"
                  rules={[
                    {
                      required: true,
                      message: "Title is required!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="SEO Title"
                  name="seoTitle"
                  rules={[
                    {
                      required: true,
                      message: "SEO Title is required!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Content"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Content is required!",
                    },
                  ]}
                >
                  <Input.TextArea size="large" />
                </Form.Item>
                <Form.Item hidden name="id">
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Space size={6}>
                    <Button loading={loading} type="primary" htmlType="submit">
                      {contactUsPageId ? "Save Changes" : "Save"}
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CourseSubject;

CourseSubject.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
