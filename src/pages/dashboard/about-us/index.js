import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Space, Upload } from "antd";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import handleRequest from "@/utilities/handleRequest";
import { EditOutlined } from "@ant-design/icons";
import Image from "next/image";

const AboutUs = () => {
  const [rerender, setRerender] = useState(0);
  const [deletingID, setDeletingID] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [aboutId, setIsAboutId] = useState("");
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("pageTitle", values.pageTitle);
    formData.append("seoTitle", values.seoTitle);
    formData.append("content", values.content);
    formData.append("image", fileList[0]?.originFileObj || {});

    setLoading(true);
    const result = await handleRequest("post", `/about-us`, formData, {
      "Content-Type": "multipart/form-data",
    });

    if (result.success) {
      setRerender(rerender + 1);
      form.resetFields();
      setIsAboutId("");
      setFileList([]);
    }
    setLoading(false);
  };

  const updateHandler = async (id) => {
    setIsAboutId(id);
    const result = await handleRequest("get", `about-us`);
    if (result.success) {
      form.setFieldsValue(result?.data[0]);
      const photo = result.data[0]?.image?.secure_url
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: result.data[0]?.image?.secure_url,
            },
          ]
        : [];
      setFileList(photo);
    }
  };
  const onReset = () => {
    form.resetFields();
    setIsAboutId("");
    setFileList([]);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "pageTitle",
      key: "pageTitle",
      width: "10rem",
    },
    {
      title: "SEO Title",
      dataIndex: "seoTitle",
      key: "seoTitle",
      width: "10rem",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "25rem",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "10rem",
      render: (image) => {
        return (
          <img width={180} src={image?.secure_url} alt={image.pageTitle} />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, data) => (
        <Space wrap key={id}>
          <Button
            type={"primary"}
            style={{ background: "forestgreen" }}
            onClick={() => updateHandler(id)}
          >
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={32}>
        <Col span={16}>
          <SharedTable
            tableName="About Us"
            tableColumn={columns}
            url={"about-us"}
            RightElement={<></>}
            rerender={rerender}
          />
        </Col>
        <Col span={8}>
          <Card>
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

              <Form.Item label="" name="image" style={{ width: "100%" }}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                >
                  {fileList.length < 1 && "Image"}
                </Upload>
              </Form.Item>
              <Form.Item hidden name="id">
                <Input />
              </Form.Item>
              <Form.Item>
                <Space size={6}>
                  <Button loading={loading} type="primary" htmlType="submit">
                    {aboutId ? "Update" : "Create"}
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

export default AboutUs;

AboutUs.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
