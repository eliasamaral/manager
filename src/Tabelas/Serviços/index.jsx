import { Table } from "antd";

function Serviços({ data }) {
  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "1",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Orçado",
      dataIndex: "planejado",
      key: "planejado",
    },
    {
      title: "Executado",
      dataIndex: "qntExecutada",
      key: "qntExecutada",
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      scroll={{ y: "80vh" }}
      
    />
  );
}

export default Serviços;
