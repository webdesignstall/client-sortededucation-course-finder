import { Button, Card, Col, Form, Input, Row, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import handleRequest from "@/utilities/handleRequest";
import Image from "next/image";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

const GeneralPage = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("logoText", values.logoText);
    formData.append("homePageTile", values.homePageTile);
    formData.append("homePageSeoTileText", values.homePageSeoTileText);
    formData.append("homePageMetaDescription", values.homePageMetaDescription);
    formData.append("footerRight", values.footerRight);
    formData.append("footerLeft", values.footerLeft);
    formData.append("favicon", fileList[0]?.originFileObj || {});

    setLoading(true);
    const result = await handleRequest("post", `generals`, formData, {
      "Content-Type": "multipart/form-data",
    });

    if (result?.success) {
      form.setFieldsValue(result?.data);
    }
    setLoading(false);
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

  useEffect(() => {
    (async () => {
      const result = await handleRequest("get", "generals");
      if (result?.data) {
        form.setFieldsValue(result?.data);
        const favicon = result?.data?.favicon?.secure_url
          ? [
              {
                uid: "-1",
                name: "favicon.png",
                status: "done",
                url: result?.data?.favicon?.secure_url,
              },
            ]
          : [];
        setFileList(favicon);
      }
    })();
  }, []);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Card>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="" name="favicon" style={{ width: "100%" }}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  maxCount={1}
                >
                  {fileList.length < 1 && "Favicon"}
                </Upload>
              </Form.Item>

              <Form.Item
                label="Logo Text"
                name="logoText"
                rules={[
                  {
                    required: true,
                    message: "Logo Text!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Home Page Tile"
                name="homePageTile"
                rules={[
                  {
                    required: true,
                    message: "Home page tile",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Home Page Seo Tile"
                name="homePageSeoTileText"
                rules={[
                  {
                    required: true,
                    message: "Home Page Seo Tile",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Home Page Meta Description"
                name="homePageMetaDescription"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea size="large" />
              </Form.Item>

              <Form.Item label="Footer Right" name="footerRight">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Footer Left" name="footerLeft">
                <Input size="large" />
              </Form.Item>

              <Form.Item hidden name="id">
                <Input />
              </Form.Item>
              <Form.Item>
                <Space size={6}>
                  <Button loading={loading} type="primary" htmlType="submit">
                    Save
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

export default GeneralPage;

GeneralPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
