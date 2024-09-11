import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportPDF(params) {
	console.log(params)

	const doc = new jsPDF()

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
		head: [['Nome', 'Função', 'Inicio', 'Fim']],
		columns: [
			{ header: 'Nome', dataKey: 'nome' },
			{ header: 'Função', dataKey: 'funcao' },
			{ header: 'Inicio', dataKey: 'inicio' },
			{ header: 'Fim', dataKey: 'fim' },
		],
		body: params.maoDeObra,

	})

	autoTable(doc, {
        head: [['Observação']],
		body: [[params.observacoes]],
		theme: 'plain',
	})

	doc.save('a4.pdf')
}
