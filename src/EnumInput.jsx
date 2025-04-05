import { useState, useCallback, useEffect } from 'react'

export default function EnumInput({ id, value, onChange, options }) {
	const [values, valuesSet] = useState([])

	useEffect(() => {
		valuesSet(value.split('+').filter((v) => v))
	}, [value])

	const handleChange = useCallback((e) => {
		let v = [...values]
		if (e.target.checked) {
			v.push(e.target.value)
		} else {
			v = v.filter((f) => f !== e.target.value)
		}
		onChange({ target: { value: v.map((i) => `${i}+`).join('') } })
	})

	return (
		<div className='flex flex-col gap-2'>
			{Object.keys(options).map((k) => (
				<div key={k} className='flex flex-row'>
					<input type='checkbox' id={`${id}_${k}`} value={k} className='toggle mr-2' checked={values.includes(k)} onChange={handleChange} />
					<label htmlFor={`${id}_${k}`}>{options[k]}</label>
				</div>
			))}
		</div>
	)
}
