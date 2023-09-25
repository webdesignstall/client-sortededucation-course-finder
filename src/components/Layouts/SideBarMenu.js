import React, { useState } from "react";
import Link from "next/link";
import {
  BorderOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { logOut } from "@/utilities/sessionHelper";
import { Layout, Menu } from "antd";
import { checkPermission } from "@/utilities/checkPermission";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link href={"/"}>Home</Link>, "home", <HomeOutlined />),

  getItem(
    <Link href={"/dashboard"}>Dashboard</Link>,
    "1",
    <DashboardOutlined />,
  ),

  checkPermission("can_create_course_subject") ||
  checkPermission("can_view_course_subject")
    ? getItem(
        <Link href={"/dashboard/subject"}> Subject </Link>,
        "2",
        <ReadOutlined />,
      )
    : "",

  checkPermission("can_create_course_qualification") ||
  checkPermission("can_view_course_qualification")
    ? getItem(
        <Link href={"/dashboard/qualifications"}> Qualification </Link>,
        "qualifications",
        <ReadOutlined />,
      )
    : "",

  checkPermission("can_create_course_university") ||
  checkPermission("can_view_course_university")
    ? getItem(
        <Link href={"/dashboard/university"}> University </Link>,
        "university",
        <ReadOutlined />,
      )
    : "",

  checkPermission("can_create_course") || checkPermission("can_view_course")
    ? getItem("Courses", "sub2", <ReadOutlined />, [
        getItem(<Link href={"/dashboard/course/create"}>Create</Link>, "3"),
        getItem(<Link href={"/dashboard/course/list"}>List</Link>, "4"),
      ])
    : "",

  checkPermission("can_user_create") || checkPermission("can_view_user")
    ? getItem("Employee", "sub3", <ReadOutlined />, [
        getItem(<Link href={"/dashboard/employee/create"}>Create</Link>, "7"),
        getItem(<Link href={"/dashboard/employee/list"}>List</Link>, "8"),
      ])
    : "",

  checkPermission("can_view_contactUs")
    ? getItem(
        <Link href={"/dashboard/contact-us"}> Contact US </Link>,
        "contact-us",
        <ReadOutlined />,
      )
    : "",

  checkPermission("can_create_role") || checkPermission("can_view_role")
    ? getItem(
        <Link href={"/dashboard/role-management/role-list"}>
          Role Management
        </Link>,
        "5",
        <BorderOutlined />,
      )
    : "",

  getItem(
    <span onClick={logOut} style={{ color: "orange" }}>
      Log Out
    </span>,
    "6",
    <LogoutOutlined />,
  ),
];
const SideBarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
};

export default SideBarMenu;
