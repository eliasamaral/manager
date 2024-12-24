import {
	Input,
	message,
	Modal,
	Select,
	Space,
	Upload,
	Button,
	Form,
} from 'antd'
import { CameraOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { CREATED_URL_SIGNED } from '../../schemas'

const { TextArea } = Input
const { Option } = Select

const atividadesData = [
	{
		id: 'SPDA-001',
		description: 'Inspeção inicial do local',
	},
	{
		id: 'SPDA-002',
		description: 'Projeto e dimensionamento do sistema',
	},
	{
		id: 'SPDA-003',
		description: 'Instalação de captores e condutores',
	},
	{
		id: 'SPDA-004',
		description: 'Instalação de sistemas de aterramento',
	},
	{
		id: 'SPDA-005',
		description: 'Teste e certificação do sistema',
	},
]

function AddActivityModal({ isModalOpen, handleOk, handleCancel }) {
	const [fileList, setFileList] = useState([])
	const [uploading, setUploading] = useState(false)
	const [generateSignedUrl] = useMutation(CREATED_URL_SIGNED)

	const onFinish = async (values) => {
		const fileName = `${values.id}-${values.image.file.name}`
		const filetype = values.image.file.type

		const { data } = await generateSignedUrl({
			variables: { contentType: filetype, key: fileName },
		})

		handleUpload(data, filetype)
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	const props = {
		name: 'file',
		accept: '.png, .jpeg, .jpg',
		method: 'put',
		onRemove: (file) => {
			const index = fileList.indexOf(file)
			const newFileList = fileList.slice()
			newFileList.splice(index, 1)
			setFileList(newFileList)
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file])
			return false
		},
		fileList,
	}

	const handleUpload = async () => {
		if (fileList.length === 0) {
			message.error('Nenhum arquivo para enviar.')
			return
		}

		setUploading(true)

		try {
			// Obter URLs assinadas para todos os arquivos
			const signedUrls = await Promise.all(
				fileList.map(async (file) => {
					const { data } = await generateSignedUrl({
						variables: { contentType: file.type, key: file.name },
					})
					return { file, signedUrl: data.generateSignedUrl }
				}),
			)

			// Fazer upload de todos os arquivos
			await Promise.all(
				signedUrls.map(({ file, signedUrl }) =>
					axios.put(signedUrl, file, {
						headers: { 'Content-Type': file.type },
					}),
				),
			)

			message.success('Todos os arquivos foram enviados com sucesso!')
			setFileList([]) // Limpa a lista de arquivos após o sucesso
		} catch (error) {
			console.error('Erro ao enviar os arquivos:', error)
			message.error('Ocorreu um erro ao enviar os arquivos.')
		} finally {
			setUploading(false)
		}
	}

	return (
		<Modal
			title="Adicionar atividade"
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={null}
		>
			<Form
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600, margin: '20px 10px' }}
				initialValues={{ remember: true }}
				autoComplete="off"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Space direction="vertical" style={{ width: '100%' }}>
					<Form.Item
						name="id"
						rules={[
							{
								required: true,
								message: 'Obrigatorio!',
							},
						]}
						noStyle
					>
						<Select
							placeholder="Atividade"
							allowClear
							dropdownStyle={{ width: 'auto' }}
						>
							<Option value={'not_listed'}>Não listada</Option>
							{atividadesData.map((e) => (
								<Option key={e.id} value={e.id}>
									{e.description}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name="duracao"
						rules={[
							{
								required: true,
								message: 'Obrigatorio!',
							},
						]}
						noStyle
					>
						<Input type="time" style={{ width: 'fit-content' }} />
					</Form.Item>

					<Form.Item
						name="description"
						rules={[
							{
								required: true,
								message: 'Obrigatorio!',
							},
						]}
						noStyle
					>
						<TextArea rows={4} />
					</Form.Item>

					<Form.Item
						name="image"
						rules={[
							{
								required: true,
								message: 'Obrigatorio!',
							},
						]}
					>
						<Upload {...props}>
							<Button icon={<CameraOutlined />} />
						</Upload>
					</Form.Item>

					<Space style={{ marginBlock: '10px' }}>
						<Button
							type="primary"
							htmlType="submit"
							disabled={fileList.length === 0}
							loading={uploading}
						>
							{uploading ? 'Adicionando' : 'Adicionar'}
						</Button>
					</Space>
				</Space>
			</Form>
		</Modal>
	)
}

export default AddActivityModal
