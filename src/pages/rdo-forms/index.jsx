import { Button, DatePicker, Divider, Form, Input, Space, Typography } from 'antd'

const { TextArea } = Input
const { Title, Text } = Typography

export default function FormsRDO() {
	const handleAtividadeChange = (e) => {
		console.log(e)
	}
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				height: '100vh',
				width: '100%',
			}}
		>
			<div
				style={{
					height: '100vh',
					width: '100%',
					padding: '20px',
				}}
			>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600, margin: '20px 10px' }}
					initialValues={{ remember: false }}
					autoComplete="off"
				>
					<Space
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Title level={4} style={{ margin: '0px' }}>
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
						<Title type="secondary" level={5} style={{ margin: '0px' }}>
							Projeto
						</Title>
						<Form.Item
							name="projeto"
							rules={[
								{
									required: false,
									message: 'Obrigatorio!',
								},
							]}
							style={{ margin: '0px' }}
						>
							<Input name="projeto" onChange={(e) => handleInputChange(e)} />
						</Form.Item>
					</Space>

					<Space
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Title type="secondary" level={5} style={{ margin: '0px' }}>
							Local
						</Title>
						<Form.Item
							name="local"
							rules={[
								{
									required: false,
									message: 'Obrigatorio!',
								},
							]}
							style={{ margin: '0px' }}
						>
							<Input name="local" onChange={(e) => handleInputChange(e)} />
						</Form.Item>
					</Space>
					<Divider orientation="left">Informante</Divider>

					<Space>
						<Form.Item
							name="encarregado"
							rules={[
								{
									required: false,
									message: 'Obrigatorio!',
								},
							]}
						>
							<Input type="text" placeholder="Líder de equipe" name="encarregado" />
						</Form.Item>

						<Form.Item
							name="data"
							rules={[
								{
									required: false,
									message: 'Obrigatorio!',
								},
							]}
						>
							<DatePicker format={'DD/MM/YYYY'} placeholder="Data" inputReadOnly={true} />
						</Form.Item>
					</Space>

					<Divider orientation="left">Clima</Divider>

					<Space>
						<Form.Item
							rules={[
								{
									required: true,
									message: 'Precisamos de um diagrama ou ordem.',
								},
							]}
						>
							<Input addonBefore="Manhã" placeholder="Clima" name="climaManha" onChange={(e) => handleInputChange(e)} />
						</Form.Item>

						<Form.Item>
							<Input addonBefore="Tarde" placeholder="Clima" name="climaTarde" onChange={(e) => handleInputChange(e)} />
						</Form.Item>
					</Space>

					<Divider orientation="left">Mão de obra</Divider>

					<Space>
						<Button onClick={''} type="default">
							Adicionar
						</Button>
					</Space>

					<Divider orientation="left">Atividades</Divider>

					<Space>
						<Button onClick={''} type="default">
							Adicionar
						</Button>
					</Space>

					<Divider orientation="left">Relatos de desvios e/ou retrabalhos</Divider>

					<TextArea placeholder="..." rows={4} name="observacoes" onChange={(e) => handleInputChange(e)} />

					<Space style={{ marginBlock: '10px' }}>
						<Button type="primary" htmlType="submit">
							Enviar
						</Button>
					</Space>
				</Form>
			</div>
			<div
				style={{
					height: '100vh',
					width: '100%',
					background: 'linear-gradient(98deg, rgba(115,118,208,1) 0%, rgba(59,59,233,1) 35%, rgba(36,189,221,1) 100%)',
				}}
			/>
		</div>
	)
}
