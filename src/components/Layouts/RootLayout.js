import {Col, Layout, Menu, Row, theme} from "antd";
import Link from "next/link"
import Head from "next/head";

const {Header, Content, Footer} = Layout;

const RootLayout = ({children}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    const paths = [
        {
            page: "Home",
            route: "/",
        },
        {
            page: "Services",
            route: "/services",
        }, {
            page: "About",
            route: "/about",
        },
        {
            page: "Contact",
            route: "/contact",
        }

    ];


    return (
        <>

            <Head>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>

            </Head>
            <Layout className="layout">
                <Header className={'header'}>
                    <div className={'container'} style={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'center'

                    }}>
                        <Link href="/">


                            <h1 className='logo'>Sorted</h1>

                        </Link>
                        <Menu
                            className={'menu'}
                            style={{
                                display: "block",
                                backgroundColor: 'transparent'
                            }}
                            mode="horizontal"
                            defaultSelectedKeys={["2"]}
                        >
                            <items>
                                {paths.map((path, index) => (
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "white",
                                            margin: "0px 17px",
                                        }}
                                        key={index + 1}
                                        href={path.route}
                                    >
                                        {path.page}
                                    </Link>
                                ))}
                            </items>
                        </Menu>
                    </div>
                </Header>
                <Content>
                    <div
                        className="site-layout-content"
                        // style={{
                        //     minHeight: "100vh",
                        // }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer className='footer'>
                    <Content className={'container'}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={12}>
                                <h2>SORTED EDUCATION HELP CENTER</h2>
                            </Col>
                            <Col className="gutter-row text-right" span={12}>
                                <h2>abdulla@sortededucation.com</h2>
                            </Col>
                        </Row>

                    </Content>

                </Footer>
            </Layout>

        </>
    );
};
export default RootLayout;