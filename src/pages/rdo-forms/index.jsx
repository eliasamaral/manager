import { useMutation, useQuery } from '@apollo/client'
import cuid from 'cuid'
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
	GET_ACTIVITY,
	GET_COLLABORATORS,
	GET_PROJECTS,
	CREATE_REPORT,
} from '../../schemas'
import 'dayjs/locale/pt-br'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Title } = Typography
const { Option } = Select

export default function FormsRDO() {
	const [form] = Form.useForm()
	const [activityForm, membersForm] = Form.useForm()
	const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
	const [isCollaboratorModalOpen, setIsCollaboratorModalOpen] = useState(false)
	const [activities, setActivities] = useState([])
	const [members, setMembers] = useState([])

	const { data: projectsData, loading: loadingProjects } =
		useQuery(GET_PROJECTS)
	const { data: membersData, loading: loadingMembers } =
		useQuery(GET_COLLABORATORS)
	const { data: activityData, loading: loadingActivity } =
		useQuery(GET_ACTIVITY)
	const [createReport] = useMutation(CREATE_REPORT)

	

	const handleSubmit = async (values) => {
		const formattedValues = {
			...values,
			id: cuid(),
			report_date: values.report_date.format('DD/MM/YYYY'),
			activities,
			members,
		}

		try {
			const response = await createReport({
				variables: formattedValues,
			})
			form.resetFields()
			setActivities([])
		} catch (error) {
			console.error('Error creating RDO:', error)
		}
	}

	const handleActivitySubmit = (values) => {
		const duration = `${values.duration.hour().toString().padStart(2, '0')}:${values.duration.minute().toString().padStart(2, '0')}`

		const formattedValues = {
			...values,
			duration,
		}

		setActivities([...activities, { ...formattedValues }])
		setIsActivityModalOpen(false)
	}
	const handleMembersSubmit = (values) => {
		const start_time = `${values.start_time.hour().toString().padStart(2, '0')}:${values.start_time.minute().toString().padStart(2, '0')}`
		const end_time = `${values.end_time.hour().toString().padStart(2, '0')}:${values.end_time.minute().toString().padStart(2, '0')}`

		const formattedValues = {
			...values,
			start_time,
			end_time,
		}

		setMembers([...members, { ...formattedValues }])
		setIsCollaboratorModalOpen(false)
	}

	const deleteActivity = (key) => {
		setActivities(activities.filter((activity) => activity.id !== key))
	}

	const deleteCollaborator = (key) => {		
		setMembers(members.filter((member) => member.name !== key));
	}

	const activityColumns = [
		{
			title: 'Atividade',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Ações',
			key: 'actions',
			render: (_, record) => (
				<Button
					onClick={() => deleteActivity(record.id)}
					icon={<DeleteOutlined />}
					danger
				/>
			),
		},
	]

	const membersColumns = [
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
					onClick={() => deleteCollaborator(record.name)}
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
									<Option key={e._id} value={`${e.location} - ${e.project}`}>
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
								{membersData?.collaborators.map((e) => (
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

					{members.length > 0 ? (
						<Table
							size="small"
							rowKey={(record) => record.id}
							dataSource={members}
							columns={membersColumns}
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
							form={membersForm}
							layout="vertical"
							onFinish={handleMembersSubmit}
						>
							<Form.Item
								name="name"
								label="Colaborador"
								rules={[{ required: true, message: 'Selecione o colaborador' }]}
							>
								<Select placeholder="Selecione o colaborador" allowClear>
									{membersData?.collaborators.map((member) => (
										<Option key={member._id} value={member.name}>
											{member.name}
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
									{activityData?.activities.map((activity) => (
										<Option key={activity._id} value={activity.name}>
											{activity.description}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								name="duration"
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
