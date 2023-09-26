import React from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import ServicesForm from "@/components/services/ServicesForm";
import Head from "next/head";

const Services = () => {
  return (
    <>
      <Head>
        <title> Service | Dashboard</title>
      </Head>
      <ServicesForm />
    </>
  );
};

export default Services;

Services.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
