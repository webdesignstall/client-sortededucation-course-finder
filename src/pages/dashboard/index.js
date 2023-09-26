import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Head from "next/head";
import { Card, Col, Row, Statistic } from "antd";

const Dashboard = () => {
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
              value={30}
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
              value={30}
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
              value={30}
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
              value={30}
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
              value={30}
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
