import React, { useState } from "react";
import { Button, Select, Space, Tag, Typography } from "antd";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import SharedTable from "@/components/shared/SharedTable";
import moment from "moment";
import handleRequest from "@/utilities/handleRequest";
import Head from "next/head";

const { Paragraph } = Typography;
const { Option } = Select;

const CourseSubject = () => {
  const [rerender, setRerender] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteHandle = async (id) => {
    const isConfirm = window.confirm("Are you sure delete!");
    if (isConfirm) {
      setIsDeleting(true);
      await handleRequest("delete", `/contact-us/${id}`);
      setRerender(rerender + 1);
      setIsDeleting(false);
    }
  };

  const updateStatus = async (id, value) => {
    setIsUpdating(true);
    await handleRequest("patch", `/contact-us/`, { status: value, id });
    setRerender(rerender + 1);
    setIsUpdating(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name.firstName + " " + name.lastName,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      defaultSortOrder: "descend",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "New",
          value: "new",
        },
        {
          text: "Reply",
          value: "reply",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => (
        <Tag
          className="fw-bold"
          color={status === "reply" ? "green-inverse" : "blue-inverse"}
        >
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      render: (date) => moment(date).format("LLL"),
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 300,
      render: (id, data) => {
        return (
          <Space wrap key={id}>
            <Select
              defaultValue={data?.status}
              onChange={(value) => updateStatus(data?._id, value)}
            >
              <Option value="new">New</Option>
              <Option value="reply">Reply</Option>
            </Select>
            <Button type="primary">
              <a href={`mailto:${data?.email}`}>Reply</a>
            </Button>
            <Button
              loading={isDeleting}
              type="default"
              style={{ background: "red", color: "white" }}
              className="text-white"
              onClick={() => deleteHandle(id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <p
        style={{
          margin: 0,
        }}
      >
        {record?.message?.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            <Paragraph
              className="text-justify"
              style={{
                color: "var(--secondary)",
                fontSize: "1rem",
                width: "100%",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {" "}
              {line}
            </Paragraph>
          </React.Fragment>
        ))}
      </p>
    ),
  };

  return (
    <>
      <Head>
        <title>Contact Us | Dashboard</title>
      </Head>
      <SharedTable
        tableName="Contact US"
        tableColumn={columns}
        url={"contact-us"}
        RightElement={<></>}
        rerender={rerender}
        expandable={expandable}
        rowKey={(obj) => obj._id}
      />
    </>
  );
};

export default CourseSubject;

CourseSubject.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
