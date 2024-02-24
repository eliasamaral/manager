import { useMutation } from "@apollo/client";

import {
  Card,
  Space,
  Button,
  Spin,
  FloatButton,
  Popconfirm,
  notification,
} from "antd";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_PROJETOS, DELETE_PROJETOS } from "../../Schemas";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";

export default function Peojects() {
  const { data, loading } = useQuery(GET_PROJETOS);
  const [deleteProjeto] = useMutation(DELETE_PROJETOS);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Sucesso",
      description: "Obra deletada.",
    });
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/projeto/${e}`);
  };

  const createProject = () => {
    navigate(`/projetos/createProject`);
  };

  const confirm = (id) => {
    deleteProjeto({
      variables: {
        id,
      },
      refetchQueries: [GET_PROJETOS],
    });

    openNotificationWithIcon("success");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  const { getProjetos } = data;

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "initial",
      }}
    >
      {contextHolder}

      <Space
        wrap={true}
        style={{
          display: "flex",
          alignItems: "initial",
        }}
      >
        {getProjetos.map((obra) => (
          <Card
            size="small"
            title={obra.local}
            key={obra.id}
            extra={
              <>
                <Button type="link" onClick={() => handleClick(obra.projeto)}>
                  <EyeOutlined />
                </Button>
                <Popconfirm
                  title="Deletar projeto"
                  description="Ao deletar este projeto, os dados na aplicação RDO Digital serão removidos, impedindo a criação de relatórios pela equipe de campo. Confirmar exclusão?"
                  onConfirm={() => {
                    confirm(obra.id);
                  }}
                  okText="Deletar"
                  cancelText="Voltar"
                >
                  <Button danger type="link">
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </>
            }
            style={{
              width: 290,
            }}
          >
            <p>{obra.projeto}</p>
          </Card>
        ))}
      </Space>
      <FloatButton
        tooltip={<div>Adicionar obra</div>}
        shape="circle"
        type="primary"
        style={{
          right: 94,
        }}
        icon={<PlusOutlined />}
        onClick={createProject}
      />
    </Space>
  );
}
