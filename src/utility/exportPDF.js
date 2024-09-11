import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import logo from '../assets/MTELogo.png'

export function exportPDF(params) {
	const doc = new jsPDF()

	doc.addImage(logo, 'png', 176, 10, 20, 20)
	doc.setFontSize(10)
	doc.text('MTE Solutions', 174, 37)

	autoTable(doc, {
		head: [[`ID: ${params._id}`]],
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
		head: [['Projeto', 'Líder', 'Local', 'Data']],
		body: [
			[params.projeto, params.encarregado, params.local, params.dataDaProducao],
		],
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
		body: [[params.clima.manha, params.clima.tarde]],

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
		head: [['Atividade', 'Duração']],
		columns: [
			{ header: 'Atividade', dataKey: 'atividade' },
			{ header: 'Duração', dataKey: 'duracao' },
		],
		body: params.atividades,
	})

	autoTable(doc, {
		head: [['Mão de obra aplicada']],
		headStyles: {
			fontSize: 12,
		},
		theme: 'plain',
	})

	autoTable(doc, {
		head: [['Nome', 'Função', 'Início', 'Fim']],
		columns: [
			{ header: 'Nome', dataKey: 'nome' },
			{ header: 'Função', dataKey: 'funcao' },
			{ header: 'Início', dataKey: 'inicio' },
			{ header: 'Fim', dataKey: 'fim' },
		],
		body: params.maoDeObra,
	})

	autoTable(doc, {
		head: [['Observação']],
		body: [[params.observacoes]],
		theme: 'plain',
	})

	autoTable(doc, {
		body: [['Assinatura da supervisão:']],
		theme: 'grid',
		margin: { top: 40 },
	})

	doc.save('a4.pdf')
}
