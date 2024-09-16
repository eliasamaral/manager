import React, { useState, useContext } from 'react'
import { AuthContext } from '../../utility/context/authContext'
import { useForm } from '../../utility/hooks'
import { Button, Typography, Form, Input } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER_EMAIL } from '../../Schemas'
import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

const { Title } = Typography

export default function Login() {
	const navigate = useNavigate()
	const context = useContext(AuthContext)
	const [errors, setErrors] = useState([])

	function loginUserCallback() {
		loginFromEmail()
	}

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		email: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		onChange({ target: { name, value: value.trim() } })
	}

	const [loginFromEmail] = useMutation(LOGIN_USER_EMAIL, {
		update(_, { data: { loginFromEmail: userData } }) {
			context.login(userData)
			navigate('/')
		},
		onError: ({ graphQLErrors }) => {
			setErrors(graphQLErrors)
		},
		variables: { loginInput: values },
	})

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				width: '100%',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '10px',
				}}
			>
				<Title level={2}>
					Acessar o <strong>Manager.</strong>
				</Title>
				<Form onFinish={onSubmit}>
					<Form.Item
						name="email"
						extra={errors.map((error) => {
							// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
							return <span>{error.message}</span>
						})}
						rules={[
							{
								required: true,
								message: 'Obrigatorio.',
							},
						]}
					>
						<Input
							size="large"
							variant="outlined"
							onChange={handleChange}
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
	)
}
