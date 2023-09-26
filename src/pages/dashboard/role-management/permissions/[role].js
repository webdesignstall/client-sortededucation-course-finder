import React, { useEffect } from "react";
import { Button, Card, Checkbox, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import {
  setCheckedValue,
  setPermissionByRole,
  setPermissionList,
} from "@/redux/slice/permission-slice.js";
import handleRequest from "@/utilities/handleRequest";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Head from "next/head";

const Role = () => {
  const router = useRouter();
  const { role, roleId } = router.query;
  const permissions = useSelector((state) => state.permissions.list);
  const checkedValues = useSelector((state) => state.permissions.checkedValues);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await handleRequest("get", `/roles-permission/${roleId}`);
      if (res.data) {
        dispatch(setPermissionByRole(res?.data[0]?.permissions));
      }
    })();
  }, [roleId]);

  useEffect(() => {
    (async () => {
      const data = await handleRequest("get", `/permissions`);
      store.dispatch(setPermissionList(data.data));
    })();
  }, []);

  const onChange = (checkedValues) => {
    store.dispatch(setCheckedValue(checkedValues));
  };

  const assignPermission = async () => {
    const permissions = {
      permissions: checkedValues,
    };
    await handleRequest("patch", `/roles-permission/${roleId}`, permissions);
  };
  return (
    <>
      <Head>
        <title> {`${role?.toUpperCase()}`} - Permissions | Dashboard</title>
      </Head>
      <Row justify={"center"}>
        <Col lg={24} xs={24}>
          <Card title={`${role?.toUpperCase()} - Permissions`}>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
              value={checkedValues}
            >
              <Row gutter={[16, 16]}>
                {permissions?.map((items) => (
                  <Col key={items?.id} span={8} className="p-3">
                    <Card title={items?.id}>
                      {items?.permissions?.map((item) => {
                        return (
                          <Col key={item?.id} span={12} className="p-3">
                            <Checkbox value={item?.id}>{item?.name}</Checkbox>
                          </Col>
                        );
                      })}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>

            <Button
              onClick={assignPermission}
              type={"primary"}
              size={"large"}
              style={{ marginTop: "10px" }}
            >
              Save
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Role;

Role.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
