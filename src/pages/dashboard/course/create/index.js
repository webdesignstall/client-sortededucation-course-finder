import DashboardLayout from "@/components/Layouts/DashboardLayout";
import CourseList from "@/pages/dashboard/course/list";

const CourseCreate = () => {
    return (
        <div>
course create
        </div>
    );
};

export default CourseCreate;

CourseCreate.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>{page}</DashboardLayout>
    );
};