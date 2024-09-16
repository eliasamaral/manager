import { useState } from 'react'

export const useForm = (callback, inicialState = {}) => {
	const [values, setValues] = useState(inicialState)

	const onChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value })
	}

	const onSubmit = () => {
		callback(values)
	}

	return {
		onChange,
		onSubmit,
		values,
	}
}

