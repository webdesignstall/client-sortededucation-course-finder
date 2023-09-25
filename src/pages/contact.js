/* eslint-disable react/no-unescaped-entities */

import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import { Button, Form, Input, InputNumber, Col, Row } from "antd";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};
const ContactUs = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <main className="ContactMain">
        <div className="container page-space contact">
          <Row>
            <Col xs={24} sm={24} md={11}>
              <h2>CONTACT US</h2>
              <div className="contact-conent">
                <p className="bold">
                  Contact Us for a Journey Towards Your Educational Success!
                </p>
                <p>
                  We're thrilled to be part of your academic journey and are
                  here to provide all the support you need. Whether you have
                  questions, need personalized guidance, or want to discuss our
                  services in detail, don't hesitate to reach out.
                </p>
                <p>
                  <span className="bold">Email us at:</span>{" "}
                  abdulla@sortededucation.com
                </p>
                <p>
                  <span className="bold">Call or WhatsApp:</span> +973 36992110
                </p>
                <p>
                  Our dedicated team is ready to listen, understand your
                  aspirations, and craft a tailored plan to achieve your
                  educational goals. Your dreams matter to us, and we're
                  committed to making your path to university success as smooth
                  as possible.
                </p>
                <p>
                  Let's work together towards a brighter future. Contact us
                  today, and let the journey begin!
                </p>
              </div>
            </Col>

            <Col xs={0} sm={0} md={2}></Col>
            <Col
              xs={24}
              sm={24}
              md={11}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form
                className="ContactFormMain"
                name="contact"
                onFinish={onFinish}
                validateMessages={validateMessages}
                layout={"vertical"}
                style={{ width: "100%" }}
              >
                <div className="ContactForm">
                  <div style={{ width: "100%", marginRight: "20px" }}>
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
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

export default ContactUs;

ContactUs.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
