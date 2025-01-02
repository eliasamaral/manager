import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import logo from '../assets/MTELogo.png'

export function exportPDF(params) {
	const doc = new jsPDF()

	doc.addImage(logo, 'png', 170, 10, 20, 20)
	doc.setFontSize(10)
	doc.text('Energia que movimenta!', 160, 37)

	autoTable(doc, {
		head: [[`ID: ${params.id}`]],
		headStyles: {
			fontSize: 8,
		},
		theme: 'plain',
	})

	autoTable(doc, {
		head: [['Relatório diário de obra']],
		headStyles: {
			fontSize: 20,
		},
		theme: 'plain',
	})

	autoTable(doc, {
		head: [['Projeto', 'Líder', 'Data']],
		body: [[params.project, params.leader, params.report_date]],
	})

	autoTable(doc, {
		head: [['Condições do clima']],
		headStyles: {
			fontSize: 12,
		},
		theme: 'plain',
	})

	autoTable(doc, {
		head: [['Manhã', 'Tarde']],
		body: [
			[params.morning_weather_condition, params.afternoon_weather_condition],
		],

		tableWidth: 'wrap',
	})

	autoTable(doc, {
		head: [['Atividades executadas']],
		headStyles: {
			fontSize: 12,
		},
		theme: 'plain',
	})

	autoTable(doc, {
		head: [['Atividade', 'Duração', 'Descrição']],
		columns: [
			{ header: 'Atividade', dataKey: 'id' },
			{ header: 'Duração', dataKey: 'duration' },
			{ header: 'Descrição', dataKey: 'description' },
		],
		body: params.activities,
	})

	autoTable(doc, {
		head: [['Mão de obra aplicada']],
		headStyles: {
			fontSize: 12,
		},
		theme: 'plain',
	})

	autoTable(doc, {
		head: [['Nome', 'Início', 'Fim', 'Descrição']],
		columns: [
			{ header: 'Nome', dataKey: 'name' },
			{ header: 'Início', dataKey: 'start_time' },
			{ header: 'Fim', dataKey: 'end_time' },
			{ header: 'Descrição', dataKey: 'description' },
		],
		body: params.members,
	})

	autoTable(doc, {
		head: [['Observação']],
		body: [[params.observations]],
		theme: 'plain',
	})

	autoTable(doc, {
		body: [['Assinatura da supervisão:']],
		theme: 'grid',
		margin: { top: 40 },
	})

	doc.save(`${params.id}.pdf`)
}
