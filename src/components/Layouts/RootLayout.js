import { Button, Drawer, Layout, theme } from "antd";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";
import handleRequest from "@/utilities/handleRequest";
import localFont from "next/font/local";
import Image from "next/image";
import InstagramLogo from "../../../public/images/instagram-logo.png";

const gotham = localFont({
  src: "../../../public/fonts/gotham-black-webfont.woff2",
});
const { Header, Content, Footer } = Layout;

const RootLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const navigationRoutes = [
    "home",
    "universities",
    "about",
    "services",
    "contact",
  ];

  const [open, setOpen] = useState(false);
  const [general, setGeneral] = useState({});

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Close the drawer when the path changes
    onClose();
  }, [router.asPath]);

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
        <link
          href="https://www.dafontfree.net/embed/Z290aGFtLWJsYWNrJmRhdGEvNDYvZy82Mzg2MS9Hb3RoYW0tQmxhY2sub3Rm"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <Layout className="layout">
        <Header className={"header"}>
          <div className={"container MainHead"}>
            <Link
              className={gotham.className}
              style={{ fontSize: "53pt", color: "white" }}
              href="/"
            >
              {general?.logoText || "Sorted"}
            </Link>
            <div className="Header_Menu ">
              <div className="dextop">
                <nav className="nav_container">
                  {navigationRoutes.map((singleRoute) => {
                    return (
                      <NavigationLink
                        key={singleRoute}
                        href={`/${singleRoute}`}
                        text={singleRoute}
                        router={router}
                      />
                    );
                  })}
                </nav>
              </div>
              <div className={"mobileMenu"}>
                <Button className="custom-drawer-button" onClick={showDrawer}>
                  <MenuOutlined style={{ fontSize: "50px" }} />
                </Button>
                <Drawer placement="right" onClose={onClose} open={open}>
                  <nav className="nav_container_mobile">
                    {navigationRoutes.map((singleRoute) => {
                      return (
                        <NavigationLink
                          key={singleRoute}
                          href={`/${singleRoute}`}
                          text={singleRoute}
                          router={router}
                        />
                      );
                    })}
                  </nav>
                </Drawer>
              </div>
            </div>
          </div>
          <div className="social-icon">
            <Link
              href="https://www.instagram.com/sortededucation/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
              target="_blank"
            >
              <Image
                src={InstagramLogo}
                width={50}
                height={50}
                alt="instagram"
              />
            </Link>
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
        <Footer className="footer">
          <Content className={"container"}>
            <div className="footer-content">
              <div className="footer-left">
                <h2>
                  {general?.footerLeft?.toUpperCase() ||
                    "SORTED EDUCATION HELP CENTER"}
                </h2>
              </div>
              <div className="footer-right">
                <h2>{general?.footerRight || "abdulla@sortededucation.com"}</h2>
              </div>
            </div>
          </Content>
        </Footer>
      </Layout>
    </>
  );
};

export default RootLayout;
function NavigationLink({ href, text, router }) {
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link legacyBehavior href={href === "/home" ? "/" : href} passHref>
      <a
        href={href === "/home" ? "/" : href}
        className={`${isActive && "nav_item_active"} nav_item`}
      >
        {text}
      </a>
    </Link>
  );
}
