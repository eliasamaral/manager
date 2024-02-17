import { useState, useContext } from "react";
import { PontoContext } from "./context/pontoContext";

export const useForm = (callback, inicialState = {}) => {
  const [values, setValues] = useState(inicialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    callback(values);
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export function usePontoContext() {
  const context = useContext(PontoContext);

  if (context === undefined) {
    throw new Error("Erro no contexto");
  }
  return context;
}
