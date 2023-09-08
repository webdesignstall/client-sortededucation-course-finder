import {Button, Space, Tag} from "antd";
import SharedTable from "@/components/shared/SharedTable";
import CreateRoleForm from "@/components/roleManagement/CreateRoleForm";
import Link from "next/link";
import DashboardLayout from "@/components/Layouts/DashboardLayout";

const RoleList = () => {
    const deleteHandler = async (roleId, name) => {
        const isConfirm = window.confirm(
            "Are you sure delete - " + name + "- role"
        );
        /*  if (isConfirm) {
              const result = await deleteRoleRequest(roleId);
              if (result.success) {
                  await getRolesRequest();
              }
          }*/
    };

    const columns = [
        {
            title: "Role Name",
            dataIndex: "name",
            key: "name",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.name.length - b.name.length,
            render: (value) => (
                <Tag
                    color="#108ee9"
                    style={{fontSize: "1rem", padding: "0.3rem 0.4rem"}}
                >
                    {value}
                </Tag>
            ),
        },
        {
            title: "Total Permission",
            dataIndex: "totalPermission",
            key: "email",
            defaultSortOrder: "descend",
            render: (value, data) => (
                <Button size={"extra-small"} transparented type={"info"}>
                    {data.name === "super_admin" ? "ALL" : value}
                </Button>
            ),
        },

        {
            title: "Action",
            dataIndex: "_id",
            render: (value, data) => {
                if (data.name !== "super_admin") {
                    return (
                        <Space wrap key={value}>
                            <Link
                                href={`/dashboard/role-management/permissions/${data.name}?roleId=${value}`}
                                className="bg-primary-color text-white rounded px-2 py-1"
                            >
                                Update Permission
                            </Link>
                            <Button
                                transparented
                                type="danger"
                                onClick={() => deleteHandler(value, data.name)}
                            >
                                Delete
                            </Button>
                        </Space>
                    );
                }
            },
        },
    ];

    return (
        <>
            <SharedTable
                tableColumn={columns}
                url={'roles'}
                RightElement={<CreateRoleForm/>}
            />
        </>
    );
};

export default RoleList;

RoleList.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>{page}</DashboardLayout>
    );
};
