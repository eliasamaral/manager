import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const EditarCodigoForms = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Codigo"
      name="codigo"
      rules={[
        {
          required: true,
          message: "Digite um codigo.",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Descrição"
      name="descricao"
      rules={[
        {
          required: true,
          message: "Digite uma descrição.",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Tipo"
      name="tipo"
      rules={[
        {
          required: true,
          message: "Selecione o tipo.",
        },
      ]}
    >
      <Select placeholder="Selecione o tipo de codigo." allowClear>
        <Option value="novo">Novo</Option>
        <Option value="sucata">Sucata</Option>
        <Option value="serviço">Serviço</Option>
      </Select>
    </Form.Item>

    <Form.Item allowClear label="Fator" name="fator">
      <Input placeholder="Somente parar condutores." />
    </Form.Item>

    <Form.Item label="Peso" name="peso">
      <Input placeholder="Somente para postes e bloco de estai." />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Alterar
      </Button>
    </Form.Item>
  </Form>
);
export default EditarCodigoForms;
