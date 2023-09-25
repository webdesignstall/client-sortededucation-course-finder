import DashboardLayout from "@/components/Layouts/DashboardLayout";
import React from "react";
import { useSearchParams } from "next/navigation";
import CourseForm from "@/components/course/CourseForm";

const CourseUpdate = () => {
  const params = useSearchParams();
  const courseId = params.get("id");

  return (
    <>
      <CourseForm courseId={courseId} />
    </>
  );
};

export default CourseUpdate;

CourseUpdate.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
