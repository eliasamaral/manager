import React from "react";
import { useDrop } from "react-dnd";
import { useMutation } from "@apollo/client";
import { UPDATE_STATUS, GET_PROJETOS } from "../../../Schemas";

import Card from "../Card";
import { Container } from "./styles";
import { Skeleton, Spin } from "antd";

export default function List({ step, data }) {
  const [updateStatus, { loading }] = useMutation(UPDATE_STATUS);

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item) => addItemToList(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addItemToList = (item) => {
    if (item.data.status === step.key) return;
    if (
      item.data.status !== step.key + 1 &&
      item.data.status !== step.key - 1
    ) {
      console.error(
        "Esse usuário não possui permissão para pular mais de uma etapa por vez"
      );
      return;
    }

    updateStatus({
      variables: { id: item.data.id, status: step.key },
      refetchQueries: [GET_PROJETOS],
    });
  };

  return (
    <Container done={step.done} ref={drop} isOver={isOver}>
      <header>
        <h2>{step.title}</h2>
        {loading ? <Spin /> : null}
      </header>

      <ul>
        {isOver ? <Skeleton active style={{marginBottom: "40px"}} /> : ""}
        {data.map((card) => (
          <Card key={card.projeto} data={card} />
        ))}
      </ul>
    </Container>
  );
}
