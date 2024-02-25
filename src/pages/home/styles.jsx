import styled from "styled-components";

export const PinLocation = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  padding: 0;
  margin: 0;
  display: ${(props) => (props.status == 4 ? "none" : "")};

  background-color: ${(props) => {
    switch (props.status) {
      case 1:
        //Azul
        return "rgba(163, 74, 234, 0.41)";
      case 2:
        //Verde
        return "rgba(2, 97, 0, 0.41)";
      case 3:
        //Amarelo
        return "rgba(202, 234, 74, 0.41)";
      default:
        //Preto
        return "rgba(0, 0, 0, 0.66)";
    }
  }};

  border: ${(props) => {
    switch (props.status) {
      case 1:
        return "1px solid #a34aea";
      case 2:
        return "1px solid #026100";
      case 3:
        return "1px solid #EA4A4A";
      default:
        return "1px solid #000;";
    }
  }};
`;

export const Legenda = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
`;
