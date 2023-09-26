import DashboardLayout from "@/components/Layouts/DashboardLayout";
import React from "react";
import { useSearchParams } from "next/navigation";
import CourseForm from "@/components/course/CourseForm";
import Head from "next/head";

const CourseUpdate = () => {
  const params = useSearchParams();
  const courseId = params.get("id");

  return (
    <>
      <Head>
        <title>Course Update - {courseId} | Dashboard</title>
      </Head>
      <CourseForm courseId={courseId} />
    </>
  );
};

export default CourseUpdate;

CourseUpdate.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
