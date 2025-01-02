import { CameraOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Button, Upload } from 'antd'
import { CREATED_URL_SIGNED } from '../../schemas'

function UploaderFile() {
	const [generateSignedUrl] = useMutation(CREATED_URL_SIGNED)

	const [fileList, setFileList] = useState([])

	const onFinish = async (values) => {
		// const fileName = `${values.id}-${values.image.file.name}`
		// const filetype = values.image.file.type

		// const { data } = await generateSignedUrl({
		// 	variables: { contentType: filetype, key: fileName },
		// })

		// handleUpload(data, filetype)

		console.log(values)
	}

	// const handleUpload = async () => {
	//     if (fileList.length === 0) {
	//         message.error('Nenhum arquivo para enviar.')
	//         return
	//     }

	//     setUploading(true)

	//     try {
	//         // Obter URLs assinadas para todos os arquivos
	//         const signedUrls = await Promise.all(
	//             fileList.map(async (file) => {
	//                 const { data } = await generateSignedUrl({
	//                     variables: { contentType: file.type, key: file.name },
	//                 })
	//                 return { file, signedUrl: data.generateSignedUrl }
	//             }),
	//         )

	//         // Fazer upload de todos os arquivos
	//         await Promise.all(
	//             signedUrls.map(({ file, signedUrl }) =>
	//                 axios.put(signedUrl, file, {
	//                     headers: { 'Content-Type': file.type },
	//                 }),
	//             ),
	//         )

	//         message.success('Todos os arquivos foram enviados com sucesso!')
	//         setFileList([]) // Limpa a lista de arquivos após o sucesso
	//     } catch (error) {
	//         console.error('Erro ao enviar os arquivos:', error)
	//         message.error('Ocorreu um erro ao enviar os arquivos.')
	//     } finally {
	//         setUploading(false)
	//     }
	// }

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
	return (
		<Upload action={onFinish} {...props}>
			<Button icon={<CameraOutlined />} />
		</Upload>
	)
}

export default UploaderFile
