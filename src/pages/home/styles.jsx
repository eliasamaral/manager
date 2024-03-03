import styled from "styled-components";

export const InconContainer = styled.button`
  display: ${(props) => (props.status == 4 ? "none" : "flex")};
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: #000;
  border-radius: 15px;
`;
