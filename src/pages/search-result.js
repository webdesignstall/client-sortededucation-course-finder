import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import {Col, Row, Table} from "antd";
import Image from "next/image";

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
        render: (url) => <img width={300} src={url} alt={"Who We Are"}/>
    },
    {
        title: 'Qualification',
        dataIndex: 'qualification',
        key: 'qualification',
        // responsive: ['md'],
        render: (text) => <p>{text}</p>
    },
    {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        // responsive: ['lg'],
        render: (text) => (
            <div dangerouslySetInnerHTML={{__html: text}}/>
        ),
    }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        // responsive: ['lg'],
        render: (text) => <p>{text}</p>
    },
];


const SearchResult = () => {

    return (
        <>
            <Head>
                <title>Search Result</title>
            </Head>
            <main>
                <div className='container page-space search-result'>
                    <Row>
                        <Col xs={24} sm={24} md={24}>
                            <Table className='search-table' columns={columns} dataSource={data}/>
                        </Col>

                    </Row>
                </div>
            </main>
        </>
    )
}


export default SearchResult

SearchResult.getLayout = function getLayout(page) {
    return (
        <RootLayout>{page}</RootLayout>
    );
};