import React, {useState} from 'react';
import Link from "next/link";
import {BorderOutlined, DashboardOutlined, LogoutOutlined, ReadOutlined} from "@ant-design/icons";
import {logOut} from "@/utilities/sessionHelper";
import {Layout, Menu} from "antd";
import {checkPermission} from "@/utilities/checkPermission";

const {Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<Link href={'/dashboard'}>Dashboard</Link>, '1',
        <DashboardOutlined/>),
    checkPermission('can_create_course') || checkPermission('can_view_course') ?
        getItem('Courses', 'sub1', <ReadOutlined/>, [
            getItem(<Link href={'/dashboard/course/create'}>Create</Link>, '2'),
            getItem(<Link href={'/dashboard/course/list'}>List</Link>, '3'),
        ]) : "",
    checkPermission('can_create_role') || checkPermission('can_view_role') ?
        getItem(<Link href={'/dashboard/role-management/role-list'}>Role Management</Link>, '9',
            <BorderOutlined/>) : "",
    getItem(<span onClick={logOut} style={{color: 'orange'}}>Log Out</span>, '10', <LogoutOutlined/>),
];
const SideBarMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
        </>
    );
};

export default SideBarMenu;