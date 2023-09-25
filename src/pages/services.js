/* eslint-disable react/no-unescaped-entities */
import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import { Col, Collapse, Row } from "antd";
import ServicesImage from "../../public/images/services.jpeg";

const items = [
  {
    key: "1",
    label: <h4>Personalized Journey</h4>,
    children: (
      <p>
        Join us on an exhilarating journey to your dream university, where we'll
        walk alongside you, understanding your unique passions and ambitions.
        Through genuine, heartfelt conversations, we'll uncover the perfect fit
        that aligns with your future aspirations, creating a path tailored just
        for you.
      </p>
    ),
  },
  {
    key: "2",
    label: <h4>Empowering Excellence</h4>,
    children: (
      <p>
        Feel the thrill as we equip you with the tools and confidence to shine
        brightly throughout the application process. From test preparation that
        ignites your potential to interview coaching that lets your authentic
        self sparkle, we'll be your unwavering cheerleaders, championing your
        success every step of the way.
      </p>
    ),
  },
  {
    key: "3",
    label: <h4>Seamless Support</h4>,
    children: (
      <p>
        With our unwavering support, knowledge, and heartfelt care, you'll find
        the process not just seamless but transformative. Leave the stress
        behind and focus on your dreams as we handle the details. Embrace the
        empowering alliance we create, for together, we'll pave the way to a
        future brimming with endless possibilities and the realization of your
        true potential.
      </p>
    ),
  },
];

const Services = () => {
  const ImageStyle = {
    backgroundImage: `url('${ServicesImage.src}')`,
    backgroundSize: "cover",
  };

  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <main style={ImageStyle}>
        <div className="container page-space services">
          <Row>
            <Col xs={24} sm={24} md={24}>
              <h2>WHAT WE DO</h2>
              <p>
                Discover your perfect university fit with personalized support,
                comprehensive services, and a stress-free application process
                led by our dedicated team, empowering you to confidently pursue
                your dreams.
              </p>
              <Collapse
                className={"faq"}
                items={items}
                defaultActiveKey={["1"]}
              />
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Services;

Services.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
