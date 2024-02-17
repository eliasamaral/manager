import React, { useState } from "react";
import MateriaisToDO from "./MateriaisToDO";
import ServicosToDO from "./ServiçosToDO";
import { Form, Input, Select, Space } from "antd";

export default function ToDO() {
  const [formData, setFormData] = useState({
    ponto: "",
    tipo: "instalação"
  });

  const handleFormChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  return (
    <main style={{display:"flex", flexDirection: "column"}}>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        style={{ display: "flex", flexDirection: "row", gap: "10px" }}
        size="small"
      >
        <Form.Item name="ponto">
          <Input
            type="number"
            name="ponto"
            placeholder="P..."
            style={{ width: "100px" }}
            value={formData.ponto}
            onChange={(e) => handleFormChange("ponto", e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Select
            style={{
              width: 120,
            }}
            value={formData.tipo}
            onChange={(value) => handleFormChange("tipo", value)}
            options={[
              {
                value: "instalação",
                label: "Instalação",
              },
              {
                value: "remoção",
                label: "Remoção",
              },
            ]}
          />
        </Form.Item>
      </Form>
      <MateriaisToDO />
      <ServicosToDO />
    </main>
  );
}
