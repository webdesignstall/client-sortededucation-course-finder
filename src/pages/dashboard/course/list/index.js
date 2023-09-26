import React, { useState } from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment/moment";
import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import handleRequest from "@/utilities/handleRequest";
import Link from "next/link";
import Head from "next/head";

const CourseList = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(false);
  const [rerender, setRerender] = useState(0);

  const deleteHandler = async (id, name) => {
    setDeletingId(id);
    const isConfirm = window.confirm(
      "Are you sure delete - " + name?.toUpperCase() + " - course",
    );
    if (isConfirm) {
      setIsDeleting(true);
      await handleRequest("delete", `courses/${id}`);
      setIsDeleting(false);
      setRerender(rerender + 1);
    }
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      render: (value) => value.toUpperCase(),
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      render: (value) => value?.name,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (value) => value?.name,
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
      render: (value) => value?.name,
    },
    {
      title: "Campus",
      dataIndex: "campus",
      key: "campus",
    },
    {
      title: "Country",
      dataIndex: "university",
      key: "country",
      render: (university) => university?.country,
    },
    {
      title: "Tuition Fees",
      dataIndex: "tuitionFees",
      key: "tuitionFees",
    },
    {
      title: "Total Students",
      dataIndex: "totalStudents",
      key: "totalStudents",
    },
    {
      title: "Distance",
      dataIndex: "distance",
      key: "distance",
      render: (distance) => "Form " + distance?.label + ": " + distance?.value,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => moment(value).format("LL"),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value, _) => moment(value).format("LL"),
    },

    {
      title: "Action",
      dataIndex: "_id",
      render: (id, data) => {
        if (data.name !== "super_admin") {
          return (
            <Space wrap key={id}>
              <Link href={`/dashboard/course/create/${id}`}>
                <Button type={"primary"} style={{ background: "forestgreen" }}>
                  <EditOutlined />
                </Button>
              </Link>
              <Button
                loading={id === deletingId ? isDeleting : false}
                disabled={isDeleting}
                type={"primary"}
                style={{ background: "darkorange" }}
                onClick={() => deleteHandler(id, data.name)}
              >
                {id === deletingId && isDeleting ? "" : <DeleteOutlined />}
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
        <title>Course List | Dashboard</title>
      </Head>
      <SharedTable
        tableName="Courses"
        tableColumn={columns}
        url={"courses"}
        RightElement={<></>}
        scroll={{ x: 2000 }}
        rerender={rerender}
      />
    </>
  );
};

export default CourseList;

CourseList.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
