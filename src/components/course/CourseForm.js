import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {Button, Col, Form, Input, Row, Select, Spin} from "antd";
import handleRequest from "@/utilities/handleRequest";

const {Option} = Select;
const CourseForm = ({courseId}) => {
    const [loading, setLoading] = useState(false)
    const [courseFetching, setCourseFetching] = useState(false)
    const router = useRouter();
    const [form] = Form.useForm();
    const [subjects, setSubjects] = useState([])
    const [qualifications, setQualifications] = useState([])
    const [universities, setUniversities] = useState([])
    const onFinish = async (values) => {
        setLoading(true)
        const result = await handleRequest(courseId ? 'patch' : 'post' , courseId ? `/courses/${courseId}` : '/courses', values);
        if (result.success){
            await router.push('/dashboard/course/list')
        }
        setLoading(false)
    }

    useEffect(() => {
        (async ()=>{
            if (courseId){
                setCourseFetching(true)
                const result = await handleRequest('get' , `/courses/${courseId}`);
                if (result?.success){
                    form.setFieldsValue(result?.data)
                }
                setCourseFetching(false)
            }
        })()
    }, [courseId]);

    useEffect(() => {
        (async ()=>{

            const subjects = await handleRequest('get' , `/course-subjects`);

            const qualification = await handleRequest('get' , `/course-qualifications`);

            const universities = await handleRequest('get' , `/universities`);

            if (subjects?.success){
                setSubjects(subjects?.data)
            }
            if (qualification?.success){
                setQualifications(qualification?.data)
            }
            if (universities?.success){
                setUniversities(universities?.data)
            }
        })()
    }, []);

    return (
        <>
            {
                courseFetching ? <div style={{display: 'flex', justifyContent: "center", alignItems: "center", height: "60vh"}}><Spin size='large'/> </div>:
                    <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                >
                    <Row gutter={[20, 20]}>
                        <Col span={6}>
                            <Form.Item
                                label='Course Name'
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Course name is required!',
                                    },
                                ]}
                            >
                                <Input size='large'/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='Select Subject'
                                name="subjectId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Subject is required!',
                                    },
                                ]}
                            >
                                <Select
                                    size='large'
                                    placeholder='Select a Subject'
                                    showSearch
                                >
                                    {
                                        subjects?.length ? subjects?.map( subject => (
                                            <Option style={{textTransform: 'uppercase', fontWeight: 'bold', padding: '10px'}} key={subject?._id} value={subject?._id}>{subject?.name}</Option>
                                        )) : ""
                                    }

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='Select Qualification'
                                name="qualificationId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Qualification is required!',
                                    },
                                ]}
                            >
                                <Select
                                    size='large'
                                    placeholder='Select a Qualification'
                                    showSearch
                                >
                                    {
                                        qualifications?.length ? qualifications?.map( item => (
                                            <Option style={{textTransform: 'uppercase', fontWeight: 'bold', padding: '10px'}} key={item?._id} value={item?._id}>{item?.name}</Option>
                                        )) : ""
                                    }

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='Select University'
                                name="universityId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'University is required!',
                                    },
                                ]}
                            >
                                <Select
                                    size='large'
                                    placeholder='Select a University'
                                    showSearch
                                >
                                    {
                                        universities?.length ? universities?.map( item => (
                                            <Option style={{textTransform: 'uppercase', fontWeight: 'bold', padding: '10px'}} key={item?._id} value={item?._id}>{item?.name}</Option>
                                        )) : ""
                                    }

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='Tuition Fees'
                                name="tuitionFees"
                            >
                                <Input size='large'/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='Total Students'
                                name="totalStudents"
                            >
                                <Input size='large'/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='Campus'
                                name="campus"
                            >
                                <Input size='large'/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            {/*<Form.Item*/}
                            {/*    label='Country'*/}
                            {/*    name="country"*/}
                            {/*>*/}
                            {/*    <Select size='large'*/}
                            {/*            options={[*/}
                            {/*                {*/}
                            {/*                    label: 'Country One',*/}
                            {/*                    value: 'country one',*/}
                            {/*                },*/}
                            {/*                {*/}
                            {/*                    label: 'Country Two',*/}
                            {/*                    value: 'country tne',*/}
                            {/*                }*/}
                            {/*            ]}*/}
                            {/*    />*/}
                            {/*</Form.Item>*/}
                        </Col>
                        <Col span={24}>
                            <Form.List name="distance">
                                {(fields) => (
                                    <>
                                        <h3>Distance</h3>
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={12} lg={6}>
                                                <Form.Item
                                                    name='label'
                                                    label='Label'
                                                    style={{width: '100%'}}
                                                >
                                                    <Input size='large' placeholder='label'/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={6}>
                                                <Form.Item
                                                    name='value'
                                                    label='Value'
                                                    style={{width: '100%'}}
                                                >
                                                    <Input size='large' placeholder='value'/>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                    </>
                                )}

                            </Form.List>

                        </Col>


                    </Row>


                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">
                            {courseId ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            }


        </>
    );
};

export default CourseForm;