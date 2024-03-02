import { Table } from "antd";
import React from "react";

export default function Pagamentos() {
  const data = [
    {
      pedido: 4900014341,
      projeto: 400541254,
      cidade: "São Gonçalo",
      ordem: 200000050620,
      data: "25 Mai 2024",
      valor: "R$ 12.000,00",
    },
    {
      pedido: 4900014342,
      projeto: 400541255,
      cidade: "Rio de Janeiro",
      ordem: 200000050621,
      data: "28 Jun 2024",
      valor: "R$ 8.500,00",
    },
    {
      pedido: 4900014343,
      projeto: 400541256,
      cidade: "São Paulo",
      ordem: 200000050622,
      data: "10 Jul 2024",
      valor: "R$ 15.200,00",
    },
    {
      pedido: 4900014344,
      projeto: 400541257,
      cidade: "Belo Horizonte",
      ordem: 200000050623,
      data: "15 Ago 2024",
      valor: "R$ 6.700,00",
    },
    {
      pedido: 4900014345,
      projeto: 400541258,
      cidade: "Porto Alegre",
      ordem: 200000050624,
      data: "20 Set 2024",
      valor: "R$ 9.300,00",
    },
    {
      pedido: 4900014346,
      projeto: 400541259,
      cidade: "Salvador",
      ordem: 200000050625,
      data: "05 Out 2024",
      valor: "R$ 11.800,00",
    },
    {
      pedido: 4900014347,
      projeto: 400541260,
      cidade: "Recife",
      ordem: 200000050626,
      data: "12 Nov 2024",
      valor: "R$ 7.600,00",
    },
    {
      pedido: 4900014348,
      projeto: 400541261,
      cidade: "Fortaleza",
      ordem: 200000050627,
      data: "23 Dez 2024",
      valor: "R$ 10.400,00",
    },
    {
      pedido: 4900014349,
      projeto: 400541262,
      cidade: "Manaus",
      ordem: 200000050628,
      data: "07 Jan 2025",
      valor: "R$ 14.300,00",
    },
    {
      pedido: 4900014350,
      projeto: 400541263,
      cidade: "Brasília",
      ordem: 200000050629,
      data: "18 Fev 2025",
      valor: "R$ 5.900,00",
    },
  ];

  const columns = [
    {
      title: "Pedidos",
      dataIndex: "pedido",
      key: "pedido",
    },

    {
      title: "Projeto",
      dataIndex: "projeto",
      key: "projetos",
    },
    {
      title: "Ordem",
      dataIndex: "ordem",
      key: "ordem",
    },

    {
      title: "Cidade",
      dataIndex: "cidade",
      key: "cidade",
    },

    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
  ];
  return (
    <Table
      size="small"
      columns={columns}
      rowKey={(record) => record.pedido}
      dataSource={data}
      pagination={{ pageSize: 100 }}
      scroll={{ y: 650 }}
    />
  );
}
