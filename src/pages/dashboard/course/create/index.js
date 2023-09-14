import React from 'react';
import CourseForm from "@/components/course/CourseForm";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

const CourseCreate = () => {
    return (
        <>
            <CourseForm/>
        </>
    );
};

export default CourseCreate;

CourseCreate.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>{page}</DashboardLayout>
    );
};