import Head from 'next/head'
import RootLayout from "@/components/Layouts/RootLayout";
import {Button, Col, Form, Input, Row, Select} from "antd";
import React from "react";
import handleRequest from "@/utilities/handleRequest";
import Link from "next/link";
import {useRouter} from 'next/router';

const {Option} = Select;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */


export default function Home({countries, subjects, qualifications}) {
    const router = useRouter();
    const onFinish = (values) => {
        // console.log(values);
        router.push(`/universities/?subjectId=${values?.subject}&qualificationId=${values?.qaulification}&universityId=${values?.location}`);
    };
    return (
        
        <>
            <Head>
                <title>Enroll and Excel</title>
            </Head>
            <main className='HomeMain'>
                <div className='container page-space home'>
                    <Row>
                        <Col md={24}>
                            <h2 className='search-label'>UNIVERSITY SEARCH</h2>
                            <div className='search-field'>
                                <Form
                                    name="contact"
                                    onFinish={onFinish}
                                    validateMessages={validateMessages}
                                    layout={'vertical'}
                                >
                                    <Form.Item
                                        name={'subject'}
                                        label="Select a Subject:"
                                        
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        {/*<Select size={'large'} placeholder={'Select a Subject'} showSearch={true} options={subject} />*/}

                                        <Select
                                            size='large'
                                            placeholder='Select a Subject'
                                            showSearch
                                        >
                                            {
                                                subjects?.length ? subjects?.map(item => (
                                                    <Option style={{
                                                        textTransform: 'uppercase',
                                                        fontWeight: 'bold',
                                                        padding: '10px'
                                                    }} key={item?._id} value={item?._id}>{item?.name}</Option>
                                                )) : ""
                                            }

                                        </Select>


                                    </Form.Item>
                                    <Form.Item
                                        name={'qaulification'}
                                        label="Select a Qualification:"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Select
                                            size='large'
                                            placeholder='Select a Qualification'
                                            showSearch
                                        >
                                            {
                                                qualifications?.length ? qualifications?.map(item => (
                                                    <Option style={{
                                                        textTransform: 'uppercase',
                                                        fontWeight: 'bold',
                                                        padding: '10px'
                                                    }} key={item?._id} value={item?._id}>{item?.name}</Option>
                                                )) : ""
                                            }

                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={'location'}
                                        label="Select a Location:"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Select
                                            size='large'
                                            placeholder='Select a Location'
                                            showSearch
                                        >
                                            {
                                                countries?.length ? countries?.map(item => (
                                                    <Option style={{
                                                        textTransform: 'uppercase',
                                                        fontWeight: 'bold',
                                                        padding: '10px'
                                                    }} key={item?._id} value={item?._id}>{item?.country}</Option>
                                                )) : ""
                                            }

                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button size={'large'} className='primary-btn' type="primary" htmlType="submit">
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
    )
}

Home.getLayout = function getLayout(page) {
    return (
        <RootLayout>{page}</RootLayout>
    );
};

export async function getServerSideProps() {
    const responseSubjects = await handleRequest('get', `/course-subjects`);
    const responseQualifications = await handleRequest('get', `/course-qualifications`);
    const responseUniversities = await handleRequest('get', `/universities`);

    // Pass the data to the component as props
    return {
        props: {
            countries: responseUniversities.success ? responseUniversities.data : [],
            subjects: responseSubjects.success ? responseSubjects.data : [],
            qualifications: responseQualifications.success ? responseQualifications.data : [],
        },
    };
}
