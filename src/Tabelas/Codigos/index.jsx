import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Spin } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { useQuery } from "@apollo/client";
import { GET_CODIGOS } from "../../Schemas";

function Codigos() {
  const { data, loading } = useQuery(GET_CODIGOS);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Pesquisa por Descrição`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 100,
            }}
          >
            Pesquisar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Limpar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Todos
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
      sorter: {
        compare: (a, b) => a.codigo - b.codigo,
        multiple: 2,
      },
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      ...getColumnSearchProps("descricao"),
    },
    {
      title: "Valor base",
      dataIndex: "preco",
      key: "preco",
      render: (_, { preco }) => {
        return <div>R$ {preco} </div>;
      },
    },
    {
      title: "Tipo",
      key: "tipo",
      dataIndex: "tipo",
      filters: [
        {
          text: "Novo",
          value: "NOVO",
        },
        {
          text: "Serviço",
          value: "SRV",
        },
        {
          text: "Sucata",
          value: "SUCATA",
        },
      ],
      onFilter: (value, record) => record.tipo.indexOf(value) === 0,
      render: (_, { tipo }) => {
        let color = tipo === "SUCATA" ? "cyan" : "blue";
        if (tipo === "NOVO") {
          color = "green";
        }
        return (
          <Tag color={color} key={tipo}>
            {tipo.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      />
    );
  }

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.codigo}
      dataSource={data.codigos}
      pagination={{ pageSize: 100 }}
      scroll={{ y: 650 }}
    />
  );
}

export default Codigos;
