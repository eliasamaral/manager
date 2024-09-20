import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Table, Form, Input } from "antd";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ACTIVITY, CREATED_ACTIVITY, DELETE_ACTIVITY } from "../../schemas";

export default function Setting() {
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};

	const {
		data: { activities } = {},
		loading,
		error,
	} = useQuery(GET_ACTIVITY);

	const [createActivity] = useMutation(CREATED_ACTIVITY, {
		refetchQueries: [GET_ACTIVITY],
	});

	const [deleteActivity] = useMutation(DELETE_ACTIVITY, {
		refetchQueries: [GET_ACTIVITY],
	});

	const columns = [
		{
			title: "Nome",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Descrição",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Valor",
			dataIndex: "price",
			key: "price",
			render: (valor) => <>R$ {valor}</>,
		},
		{
			width: 150,
			fixed: "right",
			render: ({ _id }) => (
				<Button
					onClick={() => {
						handleDeleteActivity(_id);
					}}
					icon={<DeleteOutlined />}
				/>
			),
		},
	];

	const submit = (props) => createActivity({ variables: props });
	const handleDeleteActivity = (_id) => {
		deleteActivity({
			variables: { _id },
		});
	};

	if (loading) {
		return <div>Carregando...</div>;
	}

	if (error) {
		return <div>Houve um erro ao buscar as informações</div>;
	}

	const onClose = () => {
		setOpen(false);
	};

	const onFinish = (values) => {
		const data = {
			name: values.name,
			description: values.description,
			price: Number.parseFloat(values.price),
		};

		submit(data);
		setOpen(false);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					marginBottom: "20px",
				}}
			>
				<div style={{ fontSize: "20px" }}>Atividades</div>
				<Button icon={<PlusOutlined />} type="primary" onClick={showDrawer}>
					Nova atividade
				</Button>
			</div>
			<Table
				dataSource={activities}
				columns={columns}
				rowKey={(record) => record._id}
			/>

			<Drawer title="Adicionar nova atividade" onClose={onClose} open={open}>
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
						label="Nome"
						name="name"
						rules={[
							{
								required: true,
								message: "Obrigatório",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item label="Descrição" name="description">
						<Input />
					</Form.Item>

					<Form.Item
						label="Valor"
						name="price"
						rules={[
							{
								required: true,
								message: "Obrigatório",
							},
						]}
					>
						<Input type="number" />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
							Adicionar
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
}
