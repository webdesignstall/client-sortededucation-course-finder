import React, { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import WithAuth from "@/middleware/WithAuth";
import SideBarMenu from "@/components/Layouts/SideBarMenu";
import { useSelector } from "react-redux";
import handleRequest from "@/utilities/handleRequest";
import Head from "next/head";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [general, setGeneral] = useState({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    (async () => {
      const result = await handleRequest("get", `generals`);
      if (result.success) {
        setGeneral(result?.data);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={general?.favicon?.secure_url || "./favicon.png"}
        />
      </Head>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <SideBarMenu />
        <Layout>
          <Header
            style={{
              padding: "10px 20px",
              background: colorBgContainer,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div></div>
              <div>
                {currentUser?.email}
                {/*<Avatar size="large" icon={<UserOutlined />} />*/}
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default WithAuth(DashboardLayout);
