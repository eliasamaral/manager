import { Button, Form, Input, Popconfirm, Table, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { Title } = Typography;

const ServicosToDO = () => {
  const [dataSource, setDataSource] = useState([]);

  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState();
  const [orçado, setOrçado] = useState();
  const [executado, setExecutado] = useState(0);

  const handleInputChange = ({target}) => {
    const { name, value } = target;

    switch (name) {
      case "codigo":
        setCodigo(parseFloat(value));
        break;
      case "descricao":
        setDescricao(value);
        break;
      case "orçado":
        setOrçado(parseFloat(value));
        break;
      case "executado":
        setExecutado(parseFloat(value));
        break;
      default:
        break;
    }
  };

  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Código",
      dataIndex: "codigo",
      width: "20%",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
    },
    {
      title: "Orçado",
      dataIndex: "orçado",
      width: "20%",
    },
    {
      title: "Executado",
      dataIndex: "executado",
      width: "20%",
    },
    {
      title: "Ações",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Apagar?"
            onConfirm={() => handleDelete(record.key)}
          >
            <DeleteOutlined />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      codigo: codigo,
      descricao: descricao,
      orçado: orçado,
      executado: executado,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    console.log(dataSource);
  };

  return (
    <div>
      <Title level={5}>Serviços</Title>

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
        <Form.Item
          name="codigo"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            type="number"
            name="codigo"
            placeholder="Código"
            style={{ width: "100px" }}
          />
        </Form.Item>
        <Form.Item
          name="descricao"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            type="text"
            name="descricao"
            placeholder="Descrição"
            style={{ width: "300px" }}
          />
        </Form.Item>
        <Form.Item
          name="orçado"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            type="number"
            name="orçado"
            placeholder="Orçado"
            style={{ width: "110px" }}
          />
        </Form.Item>
        <Form.Item
          name="executado"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={handleInputChange}
            type="number"
            name="executado"
            placeholder="Executado"
            style={{ width: "110px" }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={handleAdd}>
            <PlusOutlined />
          </Button>
        </Form.Item>
      </Form>

      <Table
        size="small"
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
      />
    </div>
  );
};
export default ServicosToDO;
