import React from "react";
import { Space } from "antd";

import Ponto from "../Ponto";

function Pontos({ pontos }) {
  return (
    <Space
      style={{
        width: "100%",
        alignItems: "initial",
        flexWrap: "wrap",
      }}
    >
      {pontos.map((item) => (
        <Ponto key={item.id} ponto={item} />
      ))}
    </Space>
  );
}

export default Pontos;
