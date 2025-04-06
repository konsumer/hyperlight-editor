// this handles object-fields that are encoded like "ValuedashHS=6>ValuebadassOfficeState=2>"
// use id for sub-field name (like ValuedashHS) and value/onChange is for parent value.

import { useState, useCallback, useEffect } from 'react'

const regexField = /([\-a-zA-Z0-9]+)=([\-a-zA-Z0-9]+)>/g

export default function ValueInput({ id, onChange, value, ...props }) {
	const [inputValue, inputValueSet] = useState('')

	useEffect(() => {
		let v
		while ((v = regexField.exec(value))) {
			if (v[1] === id) {
				inputValueSet(v[2])
				break
			}
		}
	}, [value])

	const handleChange = (e) => {
		let nv
		const regexThisField = new RegExp(`${id}=([\-a-zA-Z0-9]+)>`)
		if (regexThisField.exec(value)) {
			nv = value.replace(regexThisField, `${id}=${e.target.value}>`)
		} else {
			nv = value + `${id}=${e.target.value}>`
		}
		onChange({ target: { value: nv } })
		inputValueSet(e.target.value)
	}

	return <input id={id} {...props} value={inputValue} onChange={handleChange} />
}
