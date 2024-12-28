import { useMutation, useQuery } from '@apollo/client'
import {
	Badge,
	Button,
	DatePicker,
	Divider,
	Form,
	Input,
	Modal,
	Select,
	Space,
	Table,
	TimePicker,
	Typography,
} from 'antd'
import { useState } from 'react'
import {
	CREATE_RDO,
	GET_ACTIVITY,
	GET_COLLABORATORS,
	GET_PROJECTS,
} from '../../schemas'
import 'dayjs/locale/pt-br'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Title } = Typography
const { Option } = Select

const ACTIVITIES_DATA = [
	{
		id: 'SPDA-001',
		name: 'Inspeção inicial do local',
		description: 'Inspeção inicial do local',
	},
]

export default function FormsRDO() {
	const [form] = Form.useForm()
	const [activityForm, collaboratorsForm] = Form.useForm()
	const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
	const [isCollaboratorModalOpen, setIsCollaboratorModalOpen] = useState(false)
	const [activities, setActivities] = useState([])
	const [collaborators, setCollaborators] = useState([])

	const { data: projectsData, loading: loadingProjects } =
		useQuery(GET_PROJECTS)
	const { data: collaboratorsData, loading: loadingCollaborators } =
		useQuery(GET_COLLABORATORS)
	const { data: activityData, loading: loadingActivity } =
		useQuery(GET_ACTIVITY)
	const [createRDO] = useMutation(CREATE_RDO)

	const handleSubmit = async (values) => {
		const formattedValues = {
			...values,
			report_date: values.report_date.format('DD/MM/YYYY'),
			activities,
			collaborators,
		}

		console.log('Formatted Values:', formattedValues)

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
	}

	const handleActivitySubmit = (values) => {
		setActivities([...activities, { ...values }])
		setIsActivityModalOpen(false)
	}
	const handleCollaboratorsSubmit = (values) => {
		console.log(values)
		setCollaborators([...collaborators, { ...values }])
		setIsCollaboratorModalOpen(false)
	}

	const deleteActivity = (key) => {
		setActivities(activities.filter((activity) => activity.key !== key))
	}

	const deleteCollaborator = (key) => {
		setCollaborators(
			collaborators.filter((collaborator) => collaborator.key !== key),
		)
	}

	const activityColumns = [
		{
			title: 'Atividade',
			dataIndex: 'id',
			key: 'id',
			render: (id) => {
				const activity = ACTIVITIES_DATA.find((a) => a.id === id)
				return activity ? activity.description : 'Atividade não listada'
			},
		},
		{
			title: 'Ações',
			key: 'actions',
			render: (_, record) => (
				<Button
					onClick={() => deleteActivity(record.key)}
					icon={<DeleteOutlined />}
					danger
				/>
			),
		},
	]

	const collaboratorsColumns = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name	',
		},
		{
			title: 'Ações',
			key: 'actions',
			render: (_, record) => (
				<Button
					onClick={() => deleteCollaborator(record.key)}
					icon={<DeleteOutlined />}
					danger
				/>
			),
		},
	]

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				height: '100vh',
				width: '100%',
			}}
		>
			<div style={{ height: '100vh', width: '100%', padding: '20px' }}>
				<Form
					form={form}
					name="rdo-form"
					layout="vertical"
					onFinish={handleSubmit}
				>
					<Space
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Title level={4} style={{ margin: 0 }}>
							Relatório de obras
						</Title>
						<Button type="primary" htmlType="submit">
							Enviar
						</Button>
					</Space>

					<Divider />

					<Space
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBlock: '10px',
						}}
					>
						<Title type="secondary" level={5} style={{ margin: 0 }}>
							Projeto
						</Title>
						<Form.Item
							name="project"
							rules={[{ required: true, message: 'Obrigatorio' }]}
							noStyle
						>
							<Select
								placeholder="Projeto"
								allowClear
								dropdownStyle={{ width: 'auto' }}
							>
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
							<Select
								placeholder="Líder"
								allowClear
								dropdownStyle={{ width: 'auto' }}
							>
								{collaboratorsData?.collaborators.map((e) => (
									<Option key={e._id} value={e.name}>
										{e.name}
									</Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							name="report_date"
							rules={[{ required: true, message: 'Obrigatório' }]}
						>
							<DatePicker
								format="DD/MM/YYYY"
								placeholder="Data"
								inputReadOnly
							/>
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

					{collaborators.length > 0 ? (
						<Table
							size="small"
							rowKey={(record) => record.id}
							dataSource={collaborators}
							columns={collaboratorsColumns}
						/>
					) : null}

					<Button
						type="dashed"
						onClick={() => setIsCollaboratorModalOpen(true)}
						icon={<PlusOutlined />}
					>
						Adicionar Colaborador
					</Button>

					<Modal
						title="Adicionar colaborador"
						open={isCollaboratorModalOpen}
						onCancel={() => setIsCollaboratorModalOpen(false)}
						footer={null}
					>
						<Form
							form={collaboratorsForm}
							layout="vertical"
							onFinish={handleCollaboratorsSubmit}
						>
							<Form.Item
								name="name"
								label="Colaborador"
								rules={[{ required: true, message: 'Selecione o colaborador' }]}
							>
								<Select placeholder="Selecione o colaborador" allowClear>
									{collaboratorsData?.collaborators.map((collaborator) => (
										<Option key={collaborator._id} value={collaborator.name}>
											{collaborator.name}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item name="start_time">
								<TimePicker format="HH:mm" placeholder="Inicio expediente" />
							</Form.Item>
							<Form.Item name="end_time">
								<TimePicker format="HH:mm" placeholder="Fim expediente" />
							</Form.Item>

							<Form.Item name="description" label="Descrição">
								<TextArea rows={4} />
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit">
									Adicionar
								</Button>
							</Form.Item>
						</Form>
					</Modal>

					<Divider orientation="left">Atividades</Divider>

					{activities.length > 0 ? (
						<Table
							size="small"
							rowKey={(record) => record.id}
							dataSource={activities}
							columns={activityColumns}
						/>
					) : null}

					<Button
						type="dashed"
						onClick={() => setIsActivityModalOpen(true)}
						icon={<PlusOutlined />}
					>
						Adicionar Atividade
					</Button>

					<Modal
						title="Adicionar atividade"
						open={isActivityModalOpen}
						onCancel={() => setIsActivityModalOpen(false)}
						footer={null}
					>
						<Form
							form={activityForm}
							layout="vertical"
							onFinish={handleActivitySubmit}
						>
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
								<TimePicker format="HH:mm" />
							</Form.Item>

							<Form.Item name="description" label="Descrição">
								<TextArea rows={4} />
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit">
									Adicionar
								</Button>
							</Form.Item>
						</Form>
					</Modal>

					<Divider orientation="left">
						Relatos de desvios e/ou retrabalhos
					</Divider>

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
	)
}
