// Handles fields that use plus seperator like "4+1+0+2+3+"

import { useState, useCallback, useEffect } from 'react'

export default function EnumInput({ id, value, onChange, options }) {
  const [checks, checksSet] = useState([])
  const [allChechecked, allChecheckedSet] = useState(false)

  useEffect(() => {
    const c = value.split('+').filter((v) => v)
    checksSet(c)
    allChecheckedSet(Object.keys(options).length === c.length)
  }, [value])

  const handleChange = (e) => {
    let c = [...checks]
    if (e.target.checked) {
      c.push(e.target.value)
    } else {
      c = c.filter((v) => v !== e.target.value)
    }
    onChange({ target: { value: c.map((v) => `${v}+`).join('') } })
  }

  const handleCheckAll = (e) => {
    const o = Object.keys(options)
    if (e.target.checked) {
      onChange({ target: { value: o.map((k) => `${k}+`).join('') } })
    } else {
      onChange({ target: { value: o.includes('0') ? '0+' : '' } })
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-2'>
        <input id={`${id}_ALL`} type='checkbox' className='toggle' checked={allChechecked} onChange={handleCheckAll} />
        <label htmlFor={`${id}_ALL`}>All</label>
      </div>
      {Object.keys(options).map((k) => (
        <div className='flex flex-row gap-2' key={k}>
          <input disabled={k === '0'} id={`${id}_${k}`} type='checkbox' className='toggle' value={k} checked={checks.includes(k)} onChange={handleChange} />
          <label htmlFor={`${id}_${k}`}>{options[k]}</label>
        </div>
      ))}
    </div>
  )
}
