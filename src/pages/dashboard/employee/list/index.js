import React, { useState } from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment/moment";
import { Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const CourseList = () => {
  /* const [isDeleting, setIsDeleting] = useState(false)
    const [deletingId, setDeletingId] = useState(false)*/
  const [rerender, setRerender] = useState(0);

  /*    const deleteHandler = async (id, name) => {
        setDeletingId(id)
        const isConfirm = window.confirm(
            "Are you sure delete - " + name?.toUpperCase() + " - course"
        );
        if (isConfirm) {
            setIsDeleting(true)
            await handleRequest('delete', `courses/${id}`)
            setIsDeleting(false)
            setRerender(rerender + 1)
        }
    };*/

  const columns = [
    {
      title: "Name",
      dataIndex: "profile",
      key: "name",
      render: (profile) => `${profile.name.firstName} ${profile.name.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => `${role.name}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) =>
        value === "active" ? (
          <span style={{ color: "forestgreen" }}>{value.toUpperCase()}</span>
        ) : (
          <span style={{ color: "orangered" }}>{value.toUpperCase()}</span>
        ),
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (value) =>
        value ? (
          <span style={{ color: "forestgreen" }}>VERIFIED</span>
        ) : (
          <span style={{ color: "orangered" }}>NOT VERIFIED</span>
        ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => moment(value).format("LL"),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, data) => (
        <Space wrap key={id}>
          <Link href={`/dashboard/employee/create/${id}`}>
            <Button type={"primary"} style={{ background: "forestgreen" }}>
              <EditOutlined />
            </Button>
          </Link>
          {/*<Button
                    loading={id === deletingId ? isDeleting : false}
                    disabled={isDeleting}
                    type={'primary'}
                    style={{background: 'darkorange'}}
                    onClick={() => deleteHandler(id, `${data.profile.name.firstName} ${data.profile.name.lastName}`)}
                >
                    {id === deletingId && isDeleting ? '' : <DeleteOutlined />}
                </Button>*/}
        </Space>
      ),
    },
  ];

  return (
    <>
      <SharedTable
        tableName="Employees"
        tableColumn={columns}
        url={"employees"}
        RightElement={<></>}
        scroll={{ x: 1500 }}
        rerender={rerender}
      />
    </>
  );
};

export default CourseList;

CourseList.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
