// Handles fields that use plus seperator like "4+1+0+2+3+"

import { useState, useCallback, useEffect } from 'react'

export default function EnumInput({ name, value, onChange, options }) {
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
    onChange({ target: { name, value: c.map((v) => `${v}+`).join('') } })
  }

  const handleCheckAll = (e) => {
    const o = Object.keys(options)
    if (e.target.checked) {
      onChange({ target: { name, value: o.map((k) => `${k}+`).join('') } })
    } else {
      onChange({ target: { name, value: o.includes('0') ? '0+' : '' } })
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <label className='flex flex-row gap-2'>
        <input type='checkbox' className='toggle' checked={allChechecked} onChange={handleCheckAll} />
        <span>All</span>
      </label>
      {Object.keys(options).map((k) => (
        <label key={k} className='flex flex-row gap-2'>
          <input disabled={k === '0'} type='checkbox' className='toggle' value={k} checked={checks.includes(k)} onChange={handleChange} />
          <span>{options[k]}</span>
        </label>
      ))}
    </div>
  )
}
