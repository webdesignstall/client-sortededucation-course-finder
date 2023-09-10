/* eslint-disable react/no-unescaped-entities */
import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import {Col, Collapse, Row} from "antd";



const items = [
    {
        key: '1',
        label: <h4>Personalized Consultation:</h4>,
        children: <p>We prioritize understanding your unique preferences and academic goals, crafting a personalized
            plan for your university journey.</p>,
    },
    {
        key: '2',
        label: <h4>Streamlined Application Process:</h4>,
        children: <p>Leave the application process to us. Our experienced team will create and submit your student
            applications, ensuring a smooth and stress-free experience.</p>,
    },
    {
        key: '3',
        label: <h4>Visa Assistance:</h4>,
        children: <p>We&apos;ll be with you every step of the way, providing valuable assistance with visa processes, making
            your transition to university hassle-free.</p>,
    }, {
        key: '4',
        label: <h4>Reliable Support System:</h4>,
        children: <p>Consider us your allies. We provide unwavering support, knowledge, and care, empowering you to
            succeed on your academic path</p>,
    },
];

const Services = () => {


    return (
        <>
            <Head>
                <title>Services</title>
            </Head>
            <main>
                <div className='container page-space services'>
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <h2>WHAT WE DO</h2>
                            <p>We&apos;ve got you covered every step of the way on your exciting journey to university. Our
                                first
                                priority is understanding your unique preferences and academic goals. Through thoughtful
                                consultation, we'll work together to discover the perfect fit for your future. From the
                                daunting
                                essay writing to test preparation and interview coaching, our guidance and support are
                                here to
                                boost your confidence and showcase your best self. We believe in your potential and are
                                dedicated to helping you shine. We'll handle the whole application process for you. Our
                                team
                                will create and submit your student applications, ensuring a smooth and stress-free
                                experience
                                for you.And when it comes to visa processes, we'll be by your side, providing valuable
                                assistance and making sure everything is in order. Rest assured, we'll make the journey
                                to your
                                dream university as seamless as possible.</p>
                            <p>With us as your allies, you'll have the support, knowledge, and care you need to succeed.
                            </p>
                            <Collapse className={'faq'} items={items} defaultActiveKey={['1']}/>
                            <p>Seize Your Dreams: With our guidance and expertise, turn your dreams into reality.
                                Success awaits with us by your side.</p>

                        </Col>


                    </Row>
                </div>
            </main>
        </>
    )
}


export default Services

Services.getLayout = function getLayout(page) {
    return (
        <RootLayout>{page}</RootLayout>
    );
};