import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Space, Table, message, Popconfirm } from "antd";


function Materiais() {

  const [messageApi, contextHolder] = message.useMessage();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Você ainda não tem permissão para isso.",
    });
  };

  const columns = [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Quantidade",
      dataIndex: "qnt",
      key: "qnt",
    },

    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="Esta certo disso?" onConfirm={warning}>
            <Button type="link">
              <DeleteTwoTone
                twoToneColor="#d90000"
                style={{ fontSize: "22px" }}
              />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={null}
        pagination={{ pageSize: 100 }}
        scroll={{ y: "80vh" }}
        style={{ width: "1050px", marginInlineStart: "16px" }}
      />
    </>
  );
}

export default Materiais;
