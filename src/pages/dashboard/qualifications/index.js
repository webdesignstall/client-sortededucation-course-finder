import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment";
import handleRequest from "@/utilities/handleRequest";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Head from "next/head";

const CourseQualification = () => {
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
        ? `/course-qualifications/${values.id}`
        : "/course-qualifications",
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
      await handleRequest("delete", `course-qualifications/${id}`);
      setIsDeleting(false);
      setRerender(rerender + 1);
    }
  };
  const updateHandler = async (id) => {
    setIsQualificationId(id);
    const result = await handleRequest("get", `course-qualifications/${id}`);
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
      title: "Qualification Name",
      dataIndex: "name",
      key: "name",
      render: (value, _) => value.toUpperCase(),
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
      <Head>
        <title>Qualification | Dashboard</title>
      </Head>
      <Row gutter={32}>
        <Col span={16}>
          <SharedTable
            tableName="Course Qualifications"
            tableColumn={columns}
            url={"course-qualifications"}
            RightElement={<></>}
            rerender={rerender}
          />
        </Col>
        <Col span={8}>
          <Card>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Qualification Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Qualification name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item hidden name="id">
                <Input />
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

export default CourseQualification;

CourseQualification.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
