import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  GET_PROJECTS,
  GET_COLLABORATORS,
  GET_ACTIVITY,
  CREATE_RDO,
} from '../../schemas';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Space,
  Typography,
  Select,
  Modal,
  Badge,
  Table,
} from 'antd';
import 'dayjs/locale/pt-br';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const ACTIVITIES_DATA = [
  {
    id: 'SPDA-001',
    name: 'Inspeção inicial do local',
    description: 'Inspeção inicial do local',
  },
];

export default function FormsRDO() {
  const [form] = Form.useForm();
  const [activityForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState([]);

  const { data: projectsData, loading: loadingProjects } = useQuery(GET_PROJECTS);
  const { data: collaboratorsData, loading: loadingCollaborators } = useQuery(GET_COLLABORATORS);
  const { data: activityData, loading: loadingActivity } = useQuery(GET_ACTIVITY);
  const [createRDO] = useMutation(CREATE_RDO);

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      report_date: values.report_date.format('DD/MM/YYYY'),
      activities,
    };

    console.log('Formatted Values:', formattedValues);

    // try {
    //   const response = await createRDO({
    //     variables: {
    //       ...values,
    //       activities,
    //     },
    //   });
    //   console.log('RDO created:', response);
    //   form.resetFields();
    //   setActivities([]);
    // } catch (error) {
    //   console.error('Error creating RDO:', error);
    // }
  };

  const handleActivitySubmit = (values) => {
    setActivities([...activities, { ...values }]);
    activityForm.resetFields();
    setIsModalOpen(false);
  };

  const deleteActivity = (key) => {
    setActivities(activities.filter((activity) => activity.key !== key));
  };

  const activityColumns = [
    {
      title: 'Atividade',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        const activity = ACTIVITIES_DATA.find((a) => a.id === id);
        return activity ? activity.description : 'Atividade não listada';
      },
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => deleteActivity(record.key)} icon={<DeleteOutlined />} danger />
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100%' }}>
      <div style={{ height: '100vh', width: '100%', padding: '20px' }}>
        <Form form={form} name="rdo-form" layout="vertical" onFinish={handleSubmit}>
          <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Title level={4} style={{ margin: 0 }}>
              Relatório de obras
            </Title>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Space>

          <Divider />

          <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlock: '10px' }}>
            <Title type="secondary" level={5} style={{ margin: 0 }}>
              Projeto
            </Title>
            <Form.Item
              name="project"
              rules={[{ required: true, message: 'Obrigatorio' }]}
              noStyle
            >
              <Select placeholder="Projeto" allowClear dropdownStyle={{ width: 'auto' }}>
                {projectsData?.projects.map((e) => (
                  <Option key={e._id} value={e._id}>
                    {e.location} - {e.project}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Divider orientation="left">Informante</Divider>

          <Space>
            <Form.Item
              name="leader"
              rules={[{ required: true, message: 'Obrigatorio' }]}
            >
              <Select placeholder="Líder" allowClear dropdownStyle={{ width: 'auto' }}>
                {collaboratorsData?.collaborators.map((e) => (
                  <Option key={e._id} value={e._id}>
                    {e.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="report_date"
              rules={[{ required: true, message: 'Obrigatório' }]}
            >
              <DatePicker format="DD/MM/YYYY" placeholder="Data" inputReadOnly />
            </Form.Item>
          </Space>

          <Divider orientation="left">Clima</Divider>

          <Space>
            <Form.Item
              name="morning_weather_condition"
              rules={[{ required: true, message: 'Obrigatorio' }]}
            >
              <Input addonBefore="Manhã" placeholder="Clima" />
            </Form.Item>

            <Form.Item
              name="afternoon_weather_condition"
              rules={[{ required: true, message: 'Obrigatorio' }]}
            >
              <Input addonBefore="Tarde" placeholder="Clima" />
            </Form.Item>
          </Space>

          <Divider orientation="left">Mão de obra</Divider>

          <Space>
            <Button onClick={''} type="default">
              Adicionar
            </Button>
          </Space>

          <Divider orientation="left">
            Atividades
            <Badge count={activities.length ? activities.length : ''} color="#faad14" />
          </Divider>

          {activities.length > 0 ? (
            <Table rowKey={(record) => record.id} dataSource={activities} columns={activityColumns} />
          ) : (
            ''
          )}

          <Button
            type="dashed"
            onClick={() => setIsModalOpen(true)}
            icon={<PlusOutlined />}
          >
            Adicionar
          </Button>

          <Modal
            title="Adicionar atividade"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form form={activityForm} layout="vertical" onFinish={handleActivitySubmit}>
              <Form.Item
                name="id"
                label="Atividade"
                rules={[{ required: true, message: 'Selecione a atividade' }]}
              >
                <Select placeholder="Selecione a atividade" allowClear>
                  <Option value="not_listed">Não listada</Option>
                  {ACTIVITIES_DATA.map((activity) => (
                    <Option key={activity.id} value={activity.id}>
                      {activity.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="duracao"
                label="Duração"
                rules={[{ required: true, message: 'Informe a duração' }]}
              >
                <Input type="time" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Descrição"
                rules={[{ required: true, message: 'Descreva a atividade' }]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Adicionar
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Divider orientation="left">Relatos de desvios e/ou retrabalhos</Divider>

          <Form.Item name="observations">
            <TextArea placeholder="..." rows={4} />
          </Form.Item>

          <Space style={{ marginBlock: '10px' }}>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
}
