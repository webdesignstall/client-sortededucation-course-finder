import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import { Button, Col, Form, Row, Select } from "antd";
import React from "react";
import handleRequest from "@/utilities/handleRequest";
import { useRouter } from "next/router";
import HomeImage from "../../public/images/image-asset.jpeg";
import HomeBanner from "../../public/images/zigzag2.jpg";
import axiosInstance from "@/utilities/axiosInstance";
import localFont from "next/font/local";
import Image from "next/image";

const garamondItelic = localFont({
  src: "../../public/fonts/Apple-Garamond-Italic.ttf.woff",
});
const { Option } = Select;

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

export default function Home({ countries, subjects, qualifications, general }) {
  const router = useRouter();
  const onFinish = (values) => {
    router.push(
      `/universities/?subjectId=${values?.subject}&qualificationId=${values?.qaulification}&universityId=${values?.location}`,
    );
  };

  const ImageStyle = {
    backgroundImage: `url('${HomeImage.src}')`,
    backgroundSize: "cover",
  };

  const filterOption = (inputValue, option) => {
    return option.props.children
      .toLowerCase()
      .includes(inputValue.toLowerCase());
  };
  return (
    <>
      <Head>
        <title>{general?.homePageSeoTileText || "Enroll and Excell"}</title>
        <meta name="description" content={general?.homePageMetaDescription} />
      </Head>

      <main>
        <div className={"banner-area"}>
          <Image
            src={HomeBanner}
            alt="Home banner"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
            }}
          />
        </div>

        <div className="container page-space home">
          {/*search-label*/}
          <Row>
            <Col md={24}>
              <h2 className={garamondItelic.className} id={"startnow"}>
                Start Now...
              </h2>
              <p className={"home-description"}>
                is your gateway to ease the university application process. We
                are a dedicated team committed to simplifying the university
                admissions journery.
              </p>
              <br />
              <p className={"home-description2"}>
                Select your <strong>subject of interest</strong> and get started
                immediately
              </p>
              <h2 className={"home-title"}>
                {general?.homePageTile || "University Search"}
              </h2>
              <div className="search-field">
                <Form
                  name="contact"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
                  layout={"vertical"}
                >
                  <Form.Item
                    name={"subject"}
                    label="Select a Subject"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select a Subject"
                      showSearch
                      filterOption={filterOption}
                    >
                      {subjects?.length
                        ? subjects?.map((item) => (
                            <Option
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                padding: "10px",
                              }}
                              key={item?._id}
                              value={item?._id}
                            >
                              {item?.name}
                            </Option>
                          ))
                        : ""}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={"qaulification"}
                    label="Select a Qualification"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select a Qualification"
                      showSearch
                      filterOption={filterOption}
                    >
                      {qualifications?.length
                        ? qualifications?.map((item) => (
                            <Option
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                padding: "10px",
                              }}
                              key={item?._id}
                              value={item?._id}
                            >
                              {item?.name}
                            </Option>
                          ))
                        : ""}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={"location"}
                    label="Select a Location"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select a Location"
                      showSearch
                    >
                      {countries?.length
                        ? countries?.map((item) => (
                            <Option
                              style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                padding: "10px",
                              }}
                              key={item?.id}
                              value={item?._id}
                            >
                              {item?._id}
                            </Option>
                          ))
                        : ""}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      size={"large"}
                      className="primary-btn light-txt-btn"
                      type="primary"
                      htmlType="submit"
                    >
                      Search
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps() {
  const responseSubjects = await handleRequest("get", `/course-subjects`);
  const responseQualifications = await handleRequest(
    "get",
    `/course-qualifications`,
  );
  const responseUniversities = await handleRequest("get", `/countries`);

  const { data } = await axiosInstance.get("/generals");

  // Pass the data to the component as props
  return {
    props: {
      countries: responseUniversities.success ? responseUniversities.data : [],
      subjects: responseSubjects.success ? responseSubjects.data : [],
      qualifications: responseQualifications.success
        ? responseQualifications.data
        : [],
      general: data?.data || {},
    },
  };
}
