import { Button, Space, Tag } from "antd";
import SharedTable from "@/components/shared/SharedTable";
import CreateRoleForm from "@/components/roleManagement/CreateRoleForm";
import Link from "next/link";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import handleRequest from "@/utilities/handleRequest";
import React, { useState } from "react";
import Head from "next/head";

const RoleList = () => {
  const [loading, setLoading] = useState(false);
  const deleteHandler = async (roleId, name) => {
    const isConfirm = window.confirm(
      "Are you sure delete - " + name + "- role",
    );
    if (isConfirm) {
      setLoading(true);
      await handleRequest("delete", `roles/${roleId}`);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (value) => (
        <Tag
          color="#108ee9"
          style={{ fontSize: "1rem", padding: "0.3rem 0.4rem" }}
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Total Permission",
      dataIndex: "totalPermission",
      key: "email",
      defaultSortOrder: "descend",
      render: (value, data) => (
        <Button size={"extra-small"} transparented type={"info"}>
          {data.name === "super_admin" ? "ALL" : value}
        </Button>
      ),
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (value, data) => {
        if (data.name !== "super_admin") {
          return (
            <Space wrap key={value}>
              <Link
                href={`/dashboard/role-management/permissions/${data.name}?roleId=${value}`}
              >
                <Button type={"primary"}>Update Permission</Button>
              </Link>
              <Button
                loading={loading}
                type={"primary"}
                style={{ background: "orangered" }}
                onClick={() => deleteHandler(value, data.name)}
              >
                Delete
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Role List | Dashboard</title>
      </Head>
      <SharedTable
        tableName="Roles"
        tableColumn={columns}
        url={"roles"}
        RightElement={<CreateRoleForm />}
      />
    </>
  );
};

export default RoleList;

RoleList.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
