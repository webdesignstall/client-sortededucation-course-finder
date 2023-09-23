import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import {Col, Row} from "antd";
import Image from "next/image";


const AboutUs = () => {

    return (
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <main className='AboutMain' >
                <div className='container page-space about-us'>
                    <Row className='about-row'>
                        <Col xs={24} sm={24} md={11}>
                            <h2>WHO WE ARE</h2>
                            <p>We are a dedicated team committed to simplifying the university application process for
                                you. Our mission is to provide personalized guidance and unwavering support, helping you
                                navigate the intricate admissions journey and significantly increasing your chances of
                                being accepted into your dream universities. With our comprehensive service, you can
                                approach the application process with confidence and peace of mind, knowing that we are
                                here to assist you every step of the way. Let us be your trusted partners in achieving
                                your academic aspirations and securing a bright future ahead.</p>
                        </Col>

                        <Col xs={0} sm={0} md={2}></Col>
                        <Col xs={24} sm={24} md={11} style={{display: 'flex', alignItems: 'center'}}>
                            <Image layout="intrinsic" width={700} height={600} src={'/static/image-asset.jpeg'} alt={"Who We Are"} />
                        </Col>
                    </Row>
                </div>
            </main>
        </>
    )
}


export default AboutUs

AboutUs.getLayout = function getLayout(page) {
    return (
        <RootLayout>{page}</RootLayout>
    );
};