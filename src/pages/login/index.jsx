import React, { useState, useContext } from "react";
import { AuthContext } from "../../utility/context/authContext";
import { useForm } from "../../utility/hooks";
import { Button, Typography, Form, Input } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER_EMAIL } from "../../Schemas";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Login() {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginFromEmail();
  }

  // const { onChange, onSubmit, values } = useForm(loginUserCallback, {
  //   matricula: null,
  //   senha: "",
  // });

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
  });

  const [loginFromEmail] = useMutation(LOGIN_USER_EMAIL, {
    update(_, { data: { loginFromEmail: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Title level={2}>
          Acessar o <strong>Manager.</strong>
        </Title>
        <Form onFinish={onSubmit}>
          {/* <Form.Item
            label="Matricula"
            name="matricula"
            rules={[
              {
                required: true,
                message: "Obrigatorio.",
              },
            ]}
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Input
              bordered={false}
              onChange={onChange}
              type="number"
              name="matricula"
              placeholder="15715"
              style={{
                borderBottom: "1px solid #ccc",
                borderRadius: "0",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[
              {
                required: true,
                message: "Obrigatorio.",
              },
            ]}
          >
            <Input
              bordered={false}
              onChange={onChange}
              type="password"
              name="senha"
              placeholder="**********"
              style={{
                borderBottom: "1px solid #ccc",
                borderRadius: "0",
              }}
            />
          </Form.Item> */}
          <Form.Item
            name="email"
            extra={errors.map(function (error, index) {
              return <span>{error.message}</span>;
            })}
            rules={[
              {
                required: true,
                message: "Obrigatorio.",
              },
            ]}
          >
            <Input
              size="large"
              variant="outlined"
              onChange={onChange}
              name="email"
              prefix={<UserOutlined />}
              placeholder="Email"
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
