import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";

const Index = () => {
  return (
    <>
      <Result
        icon={<SmileOutlined color="#6B1B1C!important" />}
        title={
          <span
            style={{
              textTransform: "uppercase",
              color: "#6B1B1C!important",
              fontWeight: "bold",
            }}
          >
            We are under construction. Thank You!
          </span>
        }
      />
    </>
  );
};

export default Index;
