import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Spin, Typography, Result, Modal, Steps } from "antd";

import { usePontoContext } from "../../utility/hooks";

import { useQuery } from "@apollo/client";
import { GET_PROJETO } from "../../Schemas";

import Pontos from "../../components/Pontos";
import Atributos from "../../components/Atributos";
import Tab from "../../components/Tab";
import NovoPonto from "../../components/Formularios/NovoPonto";

const { Title } = Typography;

export default function Project() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setPontoInicial } = usePontoContext();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJETO, {
    variables: { projeto: parseFloat(id) },
  });

  useEffect(() => {
    if (data && data.getProjeto) {
      setPontoInicial(data.getProjeto.pontos[0]);
    }
  }, [data, setPontoInicial]);

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

  if (error) {
    console.log(error);
    return (
      <Result
        status="warning"
        title="Ocorreu um erro."
        subTitle="Temos um problema com esse projeto. Contate o administrador."
      />
    );
  }

  const { getProjeto } = data;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Novo Ponto"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <NovoPonto />
      </Modal>
      <Title level={3}>{getProjeto.local}</Title>
      <Steps
        size="small"
        current={getProjeto.status}
        items={[
          {
            title: "Programada",
          },
          {
            title: "Execução",
          },
          {
            title: "Balanço",
          },
          {
            title: "Pagamento",
          },
          {
            title: "Arquivada",
          },
        ]}
      />

      <div
        style={{
          marginBlock: "20px",
          height: "20vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            padding: "20px",
            flexDirection: "column",
            backgroundColor: "#fafafa",
            border: "1px solid #e5e5e5",
            marginRight: "90px",
          }}
        >
          <Pontos pontos={getProjeto.pontos} />

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="primary" onClick={showModal}>
              Adicionar ponto
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "1000px",
          }}
        >
          <Atributos data={getProjeto} />
        </div>
      </div>

      <Tab data={getProjeto} />
    </div>
  );
}
