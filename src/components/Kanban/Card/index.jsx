import React from "react";
import { useDrag } from "react-dnd";
import { Container, Label } from "./styles";

export default function Card({ data }) {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Container ref={drag} isDragging={isDragging}>
      <header>
        <Label color={"#7159c1"} />
        {data ? data.projeto : ""}
        
      </header>

      <p> {data ? data.local : ""}</p>
    </Container>
  );
}
