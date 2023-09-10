import Head from 'next/head'
import RootLayout from "@/components/Layouts/RootLayout";
import {Button, Col, Form, Input, Row, Select} from "antd";


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

const onFinish = (values) => {
    console.log(values);
};

const subject = [
    {
        label: 'Agriculture',
        value: 'agriculture'
    },
    {
        label: "Law",
        value: 'law'
    },
    {
        label: "Medicine",
        value: "medicine"
    }
];
const qualifacation = [
    {
        label: 'Foundation',
        value: 'foundation'
    },
    {
        label: "Diploma",
        value: "diploma"
    },
    {
        label: "Ph.D",
        value: 'phd'
    }
];
const country = [
    {
        label: 'United Kingdom',
        value: 'unitedkingdom'
    },
    {
        label: "United States",
        value: "unitedstates"
    },
    {
        label: "Canada",
        value: "canada"
    }
];

export default function Home() {
    return (
        <>
            <Head>
                <title>Enroll and Excel</title>
            </Head>
            <main>
                <div className='container page-space home'>
                    <Row>
                        <Col md={24}>
                            <h2 className='search-label'>UNIVERSITY SEARCH</h2>
                            <div className='search-field'>
                                <Form
                                    name="contact"
                                    onFinish={onFinish}
                                    validateMessages={validateMessages}
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
                                        <Select size={'large'} placeholder={'Select a Subject'} showSearch={true} options={subject} />
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
                                        <Select size={'large'} placeholder={'Select a Qualification'} showSearch={true} options={qualifacation} />
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
                                        <Select size={'large'} placeholder={'Select a Location'} showSearch={true} options={country} />
                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button size={'large'} type="primary" htmlType="submit">
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
