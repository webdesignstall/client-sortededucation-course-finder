import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import { Col, Row } from "antd";
import Image from "next/image";
import AboutImage from "../../public/images/62766.jpg";
import handleRequest from "@/utilities/handleRequest";

const AboutUs = ({ aboutUs }) => {
  const ImageStyle = {
    backgroundImage: `url('${AboutImage.src}')`,
    backgroundSize: "cover",
  };

  return (
    <>
      <Head>
        <title>{aboutUs?.seoTitle}</title>
      </Head>
      <main style={ImageStyle}>
        <div className="container page-space about-us">
          <Row className="about-row">
            <Col xs={24} sm={24} md={11}>
              <h2>{aboutUs?.pageTitle}</h2>
              <p>{aboutUs?.content}</p>
            </Col>

            <Col xs={0} sm={0} md={2}></Col>
            <Col
              xs={24}
              sm={24}
              md={11}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image
                layout="intrinsic"
                width={700}
                height={600}
                src={aboutUs?.image?.secure_url}
                alt={aboutUs?.pageTitle}
              />
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

export default AboutUs;

export async function getStaticProps() {
  const res = await handleRequest("get", "about-us");
  // revalidate time is 3 hours
  return {
    props: { aboutUs: res?.data[0]?.length ? res?.data[0] : [] },
    revalidate: 10800,
  };
}
AboutUs.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
