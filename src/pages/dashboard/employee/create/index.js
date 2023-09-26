import React from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import EmployeeForm from "@/components/employee/EmployeeForm";
import Head from "next/head";

const CourseCreate = () => {
  return (
    <>
      <Head>
        <title>Employee Create | Dashboard</title>
      </Head>
      <EmployeeForm />
    </>
  );
};

export default CourseCreate;

CourseCreate.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
