/* eslint-disable react/no-unescaped-entities */

import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import { Button, Card, Col, Form, Input, Row } from "antd";
import handleRequest from "@/utilities/handleRequest";
import ContacImage from "../../public/images/image-asset.jpeg";
import React from "react";
import RightImage from "../../public/images/journey-contact-us.jpg";
import Image from "next/image";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label}",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const ContactUs = ({ contactUsPage }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const name = {
      firstName: values.firstName,
      lastName: values.lastName,
    };
    const { email, message } = values;

    const data = { name, email, message };

    const result = await handleRequest("post", "/contact-us", data);

    form.resetFields();
  };
  const ImageStyle = {
    backgroundImage: `url('${ContacImage.src}')`,
    backgroundSize: "cover",
  };

  return (
    <>
      <Head>
        <title>{contactUsPage?.seoTitle}</title>
      </Head>
      <main>
        <div
          className="container page-space contact"
          style={{ paddingTop: "5rem" }}
        >
          <Row>
            <Col xs={24} sm={24} md={11}>
              <h2>{contactUsPage?.pageTitle}</h2>
              <div className="contact-conent">
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  {contactUsPage?.content?.split("\n").map((line, index) => (
                    <>
                      <p
                        key={index}
                        className="text-justify"
                        // style={{
                        //   fontSize: "1.3rem",
                        //   width: "100%",
                        //   textAlign: "justify",
                        //   textJustify: "inter-word",
                        // }}
                      >
                        {line}
                      </p>
                    </>
                  ))}
                  <Card style={{ margin: "3rem 0" }}>
                    <Form
                      form={form}
                      className="ContactFormMain"
                      name="contact"
                      onFinish={onFinish}
                      validateMessages={validateMessages}
                      layout={"vertical"}
                      style={{ width: "100%" }}
                    >
                      <div className="ContactForm">
                        <div
                          style={{ width: "100%", marginRight: "20px" }}
                          className="formWrap"
                        >
                          <Form.Item
                            name={"firstName"}
                            label="First Name"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input style={{ width: "100%" }} size="large" />
                          </Form.Item>
                        </div>
                        <div style={{ width: "100%" }}>
                          <Form.Item
                            name={"lastName"}
                            label="Last Name"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input style={{ width: "100%" }} size="large" />
                          </Form.Item>
                        </div>
                      </div>

                      <Form.Item
                        name={"email"}
                        label="Email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                          },
                        ]}
                      >
                        <Input size={"large"} />
                      </Form.Item>

                      <Form.Item
                        name={"message"}
                        label="Message"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input.TextArea rows={4} />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          className="primary-btn"
                          size={"large"}
                          type="primary"
                          htmlType="submit"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                  <p>Email us at abdulla@sortededucation.com</p>
                  <p>Call or WhatsApp: +973 36992110</p>
                </div>
              </div>
            </Col>

            {/*<Col xs={0} sm={0} md={2}></Col>*/}
            <Col
              xs={24}
              sm={24}
              md={13}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="contactUs-right">
                <Image
                  src={RightImage}
                  alt=""
                  sizes="100vw"
                  // Make the image display full width
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

export default ContactUs;

export async function getStaticProps() {
  const res = await handleRequest("get", "contact-us-page");

  // revalidate time is 3 hours
  return {
    props: { contactUsPage: res?.data },
    revalidate: 10800,
  };
}

ContactUs.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
