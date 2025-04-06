// this handles object-fields that are encoded like "ValuedashHS=6>ValuebadassOfficeState=2>"
// use sub-field for fieldName (like ValuedashHS) and name/value/onChange is for parent name/value.

import { useState, useCallback, useEffect } from 'react'

const regexField = /([\-a-zA-Z0-9]+)=([\-a-zA-Z0-9]+)>/g

export default function ValueInput({ name, fieldName, onChange, value, ...props }) {
	const [inputValue, inputValueSet] = useState('')

	useEffect(() => {
		let v
		while ((v = regexField.exec(value))) {
			if (v[1] === fieldName) {
				inputValueSet(v[2])
				break
			}
		}
	}, [value])

	const handleChange = (e) => {
		let nv
		const regexThisField = new RegExp(`${name}=([\-a-zA-Z0-9]+)>`)
		if (regexThisField.exec(value)) {
			nv = value.replace(regexThisField, `${fieldName}=${e.target.value}>`)
		} else {
			nv = value + `${fieldName}=${e.target.value}>`
		}
		onChange({ target: { value: nv, name } })
		inputValueSet(e.target.value)
	}

	return <input name={name} {...props} value={inputValue} onChange={handleChange} />
}
