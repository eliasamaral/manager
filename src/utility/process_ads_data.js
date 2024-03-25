import * as XLSX from 'xlsx'

export function extractServicesAndMaterialsADS(arquivo) {
  return new Promise((resolve, reject) => {
    const input = arquivo.target.files[0]
    const leitor = new window.FileReader()

    leitor.onload = ({ target: { result } }) => {
      const pastaDeTrabalho = XLSX.read(result, { type: 'binary' })
      const planilha = pastaDeTrabalho.Sheets[pastaDeTrabalho.SheetNames[1]]
      const dados = XLSX.utils.sheet_to_json(planilha, { header: 2 })

      const codesFilteredByColumns = dados.map((item) => ({
        codigo: item['Código'],
        descricao: item['Descrição'],
        unid: item['Unid.'],
        qntOrcada: item.Planejado,
      }))

      const removeEmptyLines = codesFilteredByColumns.filter(
        (objeto) =>
          objeto.codigo !== undefined || objeto.descricao !== undefined,
      )

      const codigosAgrupadosESomados = removeEmptyLines.reduce(
        (agrupado, item) => {
          const { codigo, qntOrcada } = item

          if (agrupado[codigo]) {
            agrupado[codigo].qntOrcada += qntOrcada
          } else {
            agrupado[codigo] = { ...item, qntOrcada }
          }

          return agrupado
        },
        {},
      )
      const codigosAgrupadosESomadosArray = Object.values(
        codigosAgrupadosESomados,
      )

      const materiais = []
      const servicos = []

      codigosAgrupadosESomadosArray.forEach((obj) => {
        if (obj.unid === 'SRV') {
          servicos.push({ ...obj, unid: undefined })
        } else {
          materiais.push({ ...obj, unid: undefined })
        }
      })

      resolve({ materiais, servicos })
    }

    leitor.onerror = (erro) => {
      reject(erro)
    }

    leitor.readAsBinaryString(input)
  })
}
