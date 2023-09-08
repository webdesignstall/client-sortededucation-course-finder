import React from 'react';
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard";

const CourseList = () => {
    return (
        <div>
            course list
        </div>
    );
};

export default CourseList;

CourseList.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>{page}</DashboardLayout>
    );
};