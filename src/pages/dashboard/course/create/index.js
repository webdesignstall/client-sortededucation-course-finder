import React from "react";
import CourseForm from "@/components/course/CourseForm";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Head from "next/head";

const CourseCreate = () => {
  return (
    <>
      <Head>
        <title>Course Create | Dashboard</title>
      </Head>
      <CourseForm />
    </>
  );
};

export default CourseCreate;

CourseCreate.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
