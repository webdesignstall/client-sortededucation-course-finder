import DashboardLayout from "@/components/Layouts/DashboardLayout";

const Dashboard = () => {
  return <>Admin Dashboard</>;
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
