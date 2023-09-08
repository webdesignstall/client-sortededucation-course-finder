import {useState} from "react";
import {Button, Card, Form, Input, Modal} from "antd";
import handleRequest from "@/utilities/handleRequest";

const CreateRoleForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onFinish = async (values) => {
        setLoading(true);
        const result = await handleRequest('post', 'roles', values)
        setLoading(false);
        if (result.success) {
            setIsModalOpen(false);
            values.name = "";
        }
        setLoading(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <Button size={"large"} type="primary" onClick={showModal}>
                    Create A New Role
                </Button>
            </div>

            <Modal open={isModalOpen} footer={null} closable={false}>
                <Card title="Create Role">
                    <Form
                        onFinish={onFinish}
                        name="basic"
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Role Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your role name!",
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center px-4">
                            <div></div>
                            <div className="d-flex align-items-center gap-3">
                                <Form.Item>
                                    <Button
                                        style={{
                                            marginRight: "15px",
                                        }}
                                        type="default"
                                        onClick={handleCancel}
                                        className="text-secondary-color"
                                        htmlType="button"
                                    >
                                        Cancel
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Create
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Card>
            </Modal>
        </>
    );
};

export default CreateRoleForm;