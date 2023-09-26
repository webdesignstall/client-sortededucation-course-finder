/* eslint-disable react/no-unescaped-entities */
import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import {Col, Collapse, Row} from "antd";
import ServicesImage from "../../public/images/services.jpeg";
import handleRequest from "@/utilities/handleRequest";
const Services = ({services, faqs}) => {
    const ImageStyle = {
        backgroundImage: `url('${ServicesImage.src}')`,
        backgroundSize: "cover",
    };
    const transformedFaqs = faqs?.map(faq => ({
        key: faq._id,
        label: <h4>{faq?.title}</h4>,
        children: <p>{faq?.text}</p>
    }));

    return (
        <>
            <Head>
                <title>{services?.seoTitle}</title>
            </Head>
            <main style={ImageStyle}>
                <div className="container page-space services">
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <h2>{services?.pageTitle}</h2>
                            <p>
                                {
                                    services?.content
                                }
                            </p>
                            <Collapse
                                className={"faq"}
                                key={transformedFaqs?.key}
                                items={transformedFaqs}
                                defaultActiveKey={[transformedFaqs[0]?.key]}
                            />
                        </Col>
                    </Row>
                </div>
            </main>
        </>
    );
};

export default Services;


export async function getStaticProps() {
    const servicesRes = await handleRequest("get", "services");
    const faqsRes = await handleRequest("get", "faqs");
    const servicesData = servicesRes?.data !== null ? servicesRes?.data : [];
    const faqsData = faqsRes?.data !== null ? faqsRes?.data : [];

    // revalidate time is 3 hours
    return {
        props: {
            services: servicesData,
            faqs: faqsData
        },
        revalidate: 10800,
    };
}

Services.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};

