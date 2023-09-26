import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Head from "next/head";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import handleRequest from "@/utilities/handleRequest";

const Dashboard = () => {
  const [reports, setReports] = useState({});
  useEffect(() => {
    (async () => {
      const result = await handleRequest("get", "reports");
      setReports(result?.data);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Row gutter={16}>
        <Col span={4}>
          <Card
            style={{ boxShadow: "rgb(0, 0, 1) 0px 0px 5.5px -2.5px" }}
            bordered={false}
            className="dashboardStaticReport"
          >
            <Statistic
              title={
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "revert-layer",
                    color: "darkcyan",
                  }}
                >
                  Total University
                </p>
              }
              value={reports?.totalUniversity}
              valueStyle={{
                color: "#3f8600",
                fontSize: 20,
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ boxShadow: "rgb(0, 0, 1) 0px 0px 5.5px -2.5px" }}
            bordered={false}
            className="dashboardStaticReport"
          >
            <Statistic
              title={
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "revert-layer",
                    color: "darkcyan",
                  }}
                >
                  Total Course
                </p>
              }
              value={reports?.totalCourse}
              valueStyle={{
                color: "#3f8600",
                fontSize: 20,
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ boxShadow: "rgb(0, 0, 1) 0px 0px 5.5px -2.5px" }}
            bordered={false}
            className="dashboardStaticReport"
          >
            <Statistic
              title={
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "revert-layer",
                    color: "darkcyan",
                  }}
                >
                  Total Subject
                </p>
              }
              value={reports?.totalSubject}
              valueStyle={{
                color: "#3f8600",
                fontSize: 20,
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ boxShadow: "rgb(0, 0, 1) 0px 0px 5.5px -2.5px" }}
            bordered={false}
            className="dashboardStaticReport"
          >
            <Statistic
              title={
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "revert-layer",
                    color: "darkcyan",
                  }}
                >
                  Total Qualification
                </p>
              }
              value={reports?.totalQualification}
              valueStyle={{
                color: "#3f8600",
                fontSize: 20,
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ boxShadow: "rgb(0, 0, 1) 0px 0px 5.5px -2.5px" }}
            bordered={false}
            className="dashboardStaticReport"
          >
            <Statistic
              title={
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "revert-layer",
                    color: "darkcyan",
                  }}
                >
                  Total Employee
                </p>
              }
              value={reports?.totalEmployee}
              valueStyle={{
                color: "#3f8600",
                fontSize: 20,
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
