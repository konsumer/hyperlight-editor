// Handles fields that use plus seperator like "4+1+0+2+3+"

import { useState, useCallback } from 'react'

export default function EnumInput({ id, value, onChange, options }) {
  const handleChange = useCallback((e) => {
    // 0 is not optional (like base gear)
    if (Object.keys(options).includes('0') && e.target.value === '0') {
      return
    }
    if (e.target.checked) {
      onChange({ target: { value: value + `${e.target.value}+` } })
    } else {
      const nv = value
        .split('+')
        .filter((v) => v && v !== e.target.value)
        .map((v) => `${v}+`)
        .join('')
      onChange({ target: { value: nv } })
    }
  })

  const handleCheckAll = useCallback((e) => {
    if (!e.target.checked) {
      onChange({ target: { value: Object.keys(options).includes('0') ? '0+' : '' } })
    } else {
      onChange({
        target: {
          value: Object.keys(options)
            .map((i) => `${i}+`)
            .join('')
        }
      })
    }
  })

  const values = value.split('+').filter((v) => v)

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-2'>
        <input id={`${id}_ALL`} type='checkbox' className='toggle' checked={values.length === Object.keys(options).length} onChange={handleCheckAll} />
        <label htmlFor={`${id}_ALL`}>All</label>
      </div>
      {Object.keys(options).map((k) => (
        <div className='flex flex-row gap-2' key={k}>
          <input id={`${id}_${k}`} type='checkbox' className='toggle' value={k} checked={values.includes(k)} onChange={handleChange} />
          <label htmlFor={`${id}_${k}`}>{options[k]}</label>
        </div>
      ))}
    </div>
  )
}
