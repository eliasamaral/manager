import React from "react";
import { Descriptions, Space, Spin, Table, Tag } from "antd";
import { useQuery } from "@apollo/client";
import { GET_RDO } from "../../Schemas";

const columns = [
  {
    title: "Código",
    dataIndex: "codigo",
    key: "codigo",
    width: "100px",
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    key: "descricao",
  },
  {
    title: "Quantidade",
    dataIndex: "quantidade",
    key: "quantidade",
    width: "100px",
  },
];

const colorStatus = ["#108ee9", "#ec1c24"];

export default function RDODigital({ RDOfiltrado }) {
  const { _id } = RDOfiltrado;

  const { loading, data } = useQuery(GET_RDO, {
    variables: { _id },
  });

  if (loading) {
    return (
      <Space
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          width: "600px",
          marginInline: "10px",
        }}
      >
        <Spin />
      </Space>
    );
  }

  const { getRDO } = data;
  

  return (
    <Space
      direction="vertical"
      style={{
        display: "flex",
        width: "600px",
        height: "800px",
        padding: "30px",

        backgroundColor: "#f5f5f5cc",
      }}
    >
      <Tag
        color={getRDO.isFinal ? colorStatus[1] : colorStatus[0]}
        style={{ marginBottom: "5px" }}
      >
        {getRDO.isFinal ? "Final" : "Parcial"}
      </Tag>
      <Descriptions title="RDO Digital">
        <Descriptions.Item label="Projeto">{getRDO.projeto}</Descriptions.Item>
        <Descriptions.Item label="Diagrama">
          {getRDO.diagrama}
        </Descriptions.Item>
        <Descriptions.Item label="Encarregado">
          {getRDO.encarregado}
        </Descriptions.Item>
        <Descriptions.Item label="Local">{getRDO.local}</Descriptions.Item>
        <Descriptions.Item label="Data">
          {getRDO.dataDaProducao}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Encarregado">
          {getRDO.maoDeObra.encarregado}
        </Descriptions.Item>
        <Descriptions.Item label="Motorista">
          {getRDO.maoDeObra.motorista}
        </Descriptions.Item>
        <Descriptions.Item label="Eletricista">
          {getRDO.maoDeObra.eletricista}
        </Descriptions.Item>
        <Descriptions.Item label="Auxiliar">
          {getRDO.maoDeObra.auxiliar}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Manhã">
          {getRDO.clima.manha}
        </Descriptions.Item>
        <Descriptions.Item label="Tarde">
          {getRDO.clima.tarde}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item>{getRDO.observacoes}</Descriptions.Item>
      </Descriptions>
      <Table
        dataSource={getRDO.servicos}
        rowKey={(record) => record._id}
        columns={columns}
        size="small"
        scroll={{ y: "30vh" }}
        footer={() => "Valor do relatório: R$ 0.000,00"}
      />
    </Space>
  );
}
