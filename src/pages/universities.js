import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import {Col, Row, Table} from "antd";
import Image from "next/image";
import handleRequest from "@/utilities/handleRequest";
import university from "@/pages/dashboard/university";
import {useRouter} from "next/router";

const data = [
    {
        key: '1',
        university: 'https://ibec.or.id/wp-content/uploads/2018/07/uni_logo_reading_1280_510.jpg',
        qualification: 'BA Honors',
        details: '<p>Tuition Fees: £21,615.54 GBP / Year </p><p>Number of Students: 19,390</p><p>Distance from Central</p><p> London: 30 min Via Paddington station</p>',
        location: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        university: 'https://ibec.or.id/wp-content/uploads/2018/07/uni_logo_reading_1280_510.jpg',
        qualification: 'MBA Honors',
        details: '<p>Tuition Fees: £21,615.54 GBP / Year </p><p>Number of Students: 19,390</p><p>Distance from Central</p><p> London: 30 min Via Paddington station</p>',
        location: 'New York No. 1 Lake Park',
    },
    {
        key: '3',
        university: 'https://ibec.or.id/wp-content/uploads/2018/07/uni_logo_reading_1280_510.jpg',
        qualification: 'CSE Computer',
        details: '<p>Tuition Fees: £21,615.54 GBP / Year </p><p>Number of Students: 19,390</p><p>Distance from Central</p><p> London: 30 min Via Paddington station</p>',
        location: 'New York No. 1 Lake Park',
    }, {
        key: '4',
        university: 'https://ibec.or.id/wp-content/uploads/2018/07/uni_logo_reading_1280_510.jpg',
        qualification: 'BSC Math',
        details: '<p>Tuition Fees: £21,615.54 GBP / Year </p><p>Number of Students: 19,390</p><p>Distance from Central</p><p> London: 30 min Via Paddington station</p>',
        location: 'New York No. 1 Lake Park',
    },
];


const columns = [
    {
        title: 'University',
        dataIndex: 'university',
        key: 'university',
        render: (url) => <img width={300} src={url} alt={university?.name}/>
    },
    {
        title: 'Qualification',
        dataIndex: 'name',
        key: 'name',
        // responsive: ['md'],
        render: (text) => <p>{text}</p>
    },
    {
        title: 'Details',
        dataIndex: 'distance',
        key: 'distance',
        // responsive: ['lg'],
        render: (text, items) => {
            return (
                // <div dangerouslySetInnerHTML={{__html: text}}/>
                <>
                    {
                        items?.tuitionFees.length > 0 ? <p>Tuition Fees: {items?.tuitionFees}</p> : ''
                    }
                    {
                        items?.totalStudents.length > 0 ? <p>Number of Students: {items?.totalStudents}</p> : ''
                    }
                    {
                        text?.label.length > 0 && text?.value?.length > 0 ? <p>{text?.label}: {text?.value}</p> : ''
                    }

                    {
                        items?.campus?.length > 0 ? <p>Campus: {items?.campus}</p> : ''
                    }

                </>
            )
        },
    }, {
        title: 'Location',
        dataIndex: 'country',
        key: 'country',
        // responsive: ['lg'],
        render: (text) => <p>{text}</p>
    },
];


const Universities = ({courses}) => {
    return (
        <>
            <Head>
                <title>Search Result</title>
            </Head>
            <main>
                <div className='container page-space search-result'>
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <Table className='search-table' columns={columns} dataSource={courses}/>
                        </Col>

                    </Row>
                </div>
            </main>
        </>
    )
}


export default Universities

Universities.getLayout = function getLayout(page) {
    return (
        <RootLayout>{page}</RootLayout>
    );
};


export async function getServerSideProps(context) {

    const {subjectId, qualificationId, universityId} = context.query || {};

    // console.log('universityId', universityId)

    let url = '/courses';
    if (subjectId) {
        url = `/courses?subjectId=${subjectId}&qualificationId=${qualificationId}&universityId=${universityId}`
    } else {
        url = '/courses'
    }

    console.log('url',url)
    const responseCourses = await handleRequest('get', url);
    console.log('responseCourses', responseCourses);
    // Pass the data to the component as props
    return {
        props: {
            courses: responseCourses.success ? responseCourses.data : [],
        },
    };
}
