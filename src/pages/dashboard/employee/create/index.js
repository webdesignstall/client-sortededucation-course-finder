import React from 'react';
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import EmployeeForm from "@/components/employee/EmployeeForm";

const CourseCreate = () => {
    return (
        <>
            <EmployeeForm/>
        </>
    );
};

export default CourseCreate;

CourseCreate.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>{page}</DashboardLayout>
    );
};