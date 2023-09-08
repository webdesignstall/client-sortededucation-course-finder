import React from 'react';
import {UserOutlined,} from '@ant-design/icons';
import {Avatar, Breadcrumb, Layout, theme} from 'antd';
import WithAuth from "@/middleware/WithAuth";
import SideBarMenu from "@/components/Layouts/SideBarMenu";
import {useSelector} from "react-redux";

const {Header, Content, Footer, Sider} = Layout;


const DashboardLayout = ({children}) => {
    const {currentUser} = useSelector(state => state.auth);
    console.log('currentUser', currentUser)

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SideBarMenu/>
            <Layout>
                <Header
                    style={{
                        padding: '10px 20px',
                        background: colorBgContainer,
                    }}
                >
                    <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                        <div></div>
                        <div>
                            {currentUser?.email}<Avatar size="large" icon={<UserOutlined/>}/>
                        </div>

                    </div>

                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
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
    );
};


export default WithAuth(DashboardLayout);