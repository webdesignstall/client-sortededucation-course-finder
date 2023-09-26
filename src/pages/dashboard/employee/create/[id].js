import DashboardLayout from "@/components/Layouts/DashboardLayout";
import React from "react";
import { useSearchParams } from "next/navigation";
import EmployeeForm from "@/components/employee/EmployeeForm";
import Head from "next/head";

const CourseUpdate = () => {
  const params = useSearchParams();
  const employeeId = params.get("id");

  return (
    <>
      <Head>
        <title>Employee Update - {employeeId} | Dashboard</title>
      </Head>
      <EmployeeForm employeeId={employeeId} />
    </>
  );
};

export default CourseUpdate;

CourseUpdate.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
