import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatDate } from '../date'
import { PAPER_CONFIG, TABLE_STYLES } from './constants'

export function exportPDF(params) {
	// Inicialização do documento com configurações padrão
	const doc = new jsPDF({
		orientation: 'portrait',
		unit: 'mm',
		format: 'a4',
	})

	// Configurações do cabeçalho
	const renderHeader = () => {
		doc.addImage(logo, 'png', 170, 10, 20, 20)
		doc.setFontSize(10)
		doc.text('Energia que movimenta!', 160, 37)
	}

	// Informações básicas do relatório
	const renderBasicInfo = () => {
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
	}

	// Detalhes do projeto
	const renderProjectDetails = () => {
		autoTable(doc, {
			head: [['Projeto', 'Líder', 'Data']],
			body: [[params.project, params.leader, formatDate(params.report_date)]],
		})
	}

	// Condições climáticas
	const renderWeatherConditions = () => {
		autoTable(doc, {
			head: [['Condições do clima']],
			headStyles: TABLE_STYLES.sectionHeader,
			theme: 'plain',
		})

		autoTable(doc, {
			head: [['Manhã', 'Tarde']],
			body: [
				[params.morning_weather_condition, params.afternoon_weather_condition],
			],
			tableWidth: 'wrap',
		})
	}

	// Atividades executadas
	const renderActivities = () => {
		autoTable(doc, {
			head: [['Atividades executadas']],
			headStyles: TABLE_STYLES.sectionHeader,
			theme: 'plain',
		})

		autoTable(doc, {
			head: [['Atividade', 'Duração', 'Descrição']],
			body: params.activities,
			columns: [
				{ header: 'Atividade', dataKey: 'id' },
				{ header: 'Duração', dataKey: 'duration' },
				{ header: 'Descrição', dataKey: 'description' },
			],
		})
	}

	// Mão de obra
	const renderWorkforce = () => {
		autoTable(doc, {
			head: [['Mão de obra aplicada']],
			headStyles: TABLE_STYLES.sectionHeader,
			theme: 'plain',
		})

		autoTable(doc, {
			head: [['Nome', 'Início', 'Fim', 'Descrição']],
			body: params.members,
			columns: [
				{ header: 'Nome', dataKey: 'name' },
				{ header: 'Início', dataKey: 'start_time' },
				{ header: 'Fim', dataKey: 'end_time' },
				{ header: 'Descrição', dataKey: 'description' },
			],
		})
	}

	// Observações e assinatura
	const renderFooter = () => {
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
	}

	try {
		// Renderiza todas as seções
		renderHeader()
		renderBasicInfo()
		renderProjectDetails()
		renderWeatherConditions()
		renderActivities()
		renderWorkforce()
		renderFooter()

		// Salva o documento
		doc.save(`RDO-${params.id}.pdf`)
	} catch (error) {
		console.error('Erro ao gerar PDF:', error)
		throw new Error('Falha ao gerar o PDF')
	}
}
