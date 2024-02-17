import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Space } from "antd";
import { CREATE_CONTRACT, GET_CONTRATOS } from "../../Schemas";
import { useMutation } from "@apollo/client";

const inputStyle = {
  padding: "10px 8px",
  borderRadius: "7px",
  border: "1px solid rgb(177 177 177)",
  outline: "none",
};

const spanStyle = {
  display: "flex",
  flexDirection: "column",
};

const Schema = z.object({
  numero: z.coerce.number(),
  fator: z.coerce.number(),
  csd: z.string(),
});

function CreateContract() {
  const [createContrato, { loading, error }] = useMutation(CREATE_CONTRACT);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const handleFormSubmit = (e) => {
    createContrato({
      variables: e,
      refetchQueries: [GET_CONTRATOS],
    });
  };

  if (loading) return "Carregando...";
  if (error) return `Algo deu errado! ${error.message}`;

  return (
    <Space>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Space>
          <span style={spanStyle}>
            <input
              {...register("numero")}
              type="number"
              placeholder="Contrato"
              style={inputStyle}
            />
            {errors.numero && <span>{errors.numero.message}</span>}
          </span>

          <span style={spanStyle}>
            <input
              {...register("fator")}
              type="text"
              placeholder="Fator"
              style={inputStyle}
            />
            {errors.fator && <span>{errors.fator.message}</span>}
          </span>

          <span style={spanStyle}>
            <input {...register("csd")} placeholder="CSD" style={inputStyle} />
            {errors.csd && <span>{errors.numero.csd}</span>}
          </span>
        </Space>

        <Button
          style={{ height: "35px", marginLeft: "20px" }}
          type="primary"
          htmlType="submit"
        >
          Salvar
        </Button>
      </form>
    </Space>
  );
}

export default CreateContract;
