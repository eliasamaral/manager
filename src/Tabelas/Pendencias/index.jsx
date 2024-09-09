import { Table } from 'antd'

function Pendencias() {
	const columns = [
		{
			title: 'Descrição',
			dataIndex: 'descricao',
			key: '1',
		},
	]

	return (
		<>
			<Table
				columns={columns}
				rowKey={(record) => record.id}
				dataSource={null}
				pagination={{ pageSize: 100 }}
				scroll={{ y: '80vh' }}
				style={{ width: '1050px', marginInlineStart: '16px' }}
			/>
		</>
	)
}

export default Pendencias
