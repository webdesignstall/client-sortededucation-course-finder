import React from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import ServicesForm from "@/components/services/ServicesForm";

const Services = () => {
    return (
        <>
            <ServicesForm />
        </>
    );
};

export default Services;

Services.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
