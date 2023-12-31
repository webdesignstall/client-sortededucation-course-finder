import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import { Col, Row, Table } from "antd";
import handleRequest from "@/utilities/handleRequest";
import Image from "next/image";
import UniversityImage from "../../public/images/image-asset.jpeg";

const columns = [
  {
    title: "University",
    dataIndex: "university",
    key: "university",
    render: (university) => (
      <Image
        layout="intrinsic"
        width={200}
        height={80}
        src={university?.logo?.secure_url}
        alt={university?.name}
      />
    ),
  },
  {
    title: "Qualification",
    dataIndex: "name",
    key: "name",
    render: (name) => <p>{name}</p>,
  },
  {
    title: "Details",
    dataIndex: "distance",
    key: "distance",
    render: (text, items) => {
      return (
        // <div dangerouslySetInnerHTML={{__html: text}}/>
        <>
          {items?.tuitionFees?.length > 0 ? (
            <p>
              <strong>Tuition Fees:</strong> {items?.tuitionFees}
            </p>
          ) : (
            ""
          )}
          {items?.totalStudents?.length > 0 ? (
            <p>
              <strong>Number of Students:</strong> {items?.totalStudents}
            </p>
          ) : (
            ""
          )}
          {text?.label?.length > 0 && text?.value?.length > 0 ? (
            <p>
              <strong>{text?.label}:</strong> {text?.value}
            </p>
          ) : (
            ""
          )}

          {items?.campus?.length > 0 ? (
            <p>
              <strong>Campus:</strong> {items?.campus}
            </p>
          ) : (
            ""
          )}
        </>
      );
    },
  },
  {
    title: "Location",
    dataIndex: "university",
    key: "country",
    render: (university) => <p>{university?.country}</p>,
  },
];

const Universities = ({ courses }) => {
  const ImageStyle = {
    backgroundImage: `url('${UniversityImage.src}')`,
    backgroundSize: "cover",
  };

  return (
    <>
      <Head>
        <title>Search Result</title>
      </Head>
      <main>
        <div
          className="container page-space search-result"
          style={{ marginTop: "5rem" }}
        >
          <Row>
            <Col xs={24} sm={24} md={24}>
              <Table
                className="search-table"
                columns={columns}
                rowKey={courses?._id}
                dataSource={courses}
              />
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Universities;

Universities.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps(context) {
  const { subjectId, qualificationId, universityId } = context.query || {};

  let url = "/courses";
  if (subjectId) {
    url = `/courses?subjectId=${subjectId}&qualificationId=${qualificationId}&university.country=${universityId}`;
  } else {
    url = "/courses";
  }
  const responseCourses = await handleRequest("get", url);

  // Pass the data to the component as props
  return {
    props: {
      courses: responseCourses.success ? responseCourses.data : [],
    },
  };
}
