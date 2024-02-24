import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusOutlined } from "@ant-design/icons";
import { Space, Table, Button } from "antd";
import { Span, Input } from "./styles";

import { UPDATE_PROJETO, GET_PROJETO } from "../../Schemas";
import { useMutation } from "@apollo/client";

function Serviços({ data }) {
  const [updateProjeto, { loading, error }] = useMutation(UPDATE_PROJETO);

  const Schema = z.object({
    codigo: z.coerce.number().min(1, "Obrigatório"),
    descricao: z.string().trim().min(1, "Obrigatório"),
    qntOrcada: z.coerce.number().min(1, "Obrigatório"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const handleFormSubmit = async (e) => {
    let removeTypename = data.srv.map((s) => {
      const { __typename, ...rest } = s;
      return rest;
    });

    let projetoInput = {
      srv: [...removeTypename, e],
    };

    try {
      await updateProjeto({
        variables: {
          updateProjetoId: data.id,
          updateProjetoData: projetoInput,
        },
        refetchQueries: [GET_PROJETO],
      });
    } catch (error) {
      console.log("Error during form submission:", error);
    }
  };

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
      dataIndex: "qntOrcada",
      key: "qntOrcada",
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Space wrap style={{ marginBottom: "40px" }}>
          <Span>
            <Input
              {...register("codigo")}
              type="number"
              placeholder="Código"
              style={{ width: "100px" }}
            />
            {errors.codigo && <Span>{errors.codigo.message}</Span>}
          </Span>
          <Span>
            <Input
              {...register("descricao")}
              type="text"
              placeholder="Descrição"
              style={{ width: "300px" }}
            />
            {errors.descricao && <Span>{errors.descricao.message}</Span>}
          </Span>

          <Span>
            <Input
              {...register("qntOrcada")}
              type="number"
              placeholder="Orçado"
              style={{ width: "110px" }}
            />
            {errors.qntOrcada && <Span>{errors.qntOrcada.message}</Span>}
          </Span>

          <Span>
            <Button type="primary" htmlType="submit">
              <PlusOutlined />
            </Button>
          </Span>
        </Space>
      </form>

      <Table
        columns={columns}
        rowKey={(record) => record.codigo}
        dataSource={data.srv}
        scroll={{ y: "40vh" }}
        pagination={false}
      />
    </>
  );
}

export default Serviços;
