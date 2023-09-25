import React from "react";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const AuthFromWrapper = ({ children, formName }) => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={6}>
        <Card title={<h2 style={{ textAlign: "center" }}>{formName}</h2>}>
          {children}
        </Card>
      </Col>
    </Row>
  );
};

export default AuthFromWrapper;
