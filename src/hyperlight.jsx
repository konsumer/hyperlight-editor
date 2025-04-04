import { createContext, useContext, useState, useCallback } from 'react'

// this context stores the current parsed file and has some functions for messing with hyperlight files
export const context = createContext()

// hook for react-context
export const useHyperlight = () => useContext(context)

// decode a file buffer (base64 text)
export function decode(text) {
  const buffer = atob(text)
  const header = buffer.slice(0, 60)
  const settings = JSON.parse(buffer.slice(60, -1))
  return { header, settings }
}

// encode a file buffer (base64 text)
export function encode({ settings }) {
  const json = JSON.stringify(settings)
  const header = atob(document.querySelector('input[name="id"]').value)
  return btoa(`${header}${json}\u0000`)
}

// download a file
export function download(filename, contents, type = 'application/octet-stream') {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// provider for react-context
export function HyperlightProvider({ children }) {
  const [current, currentSet] = useState({})

  // handles a file and inserts current value
  const handleFile = useCallback(async (e) => {
    const data = decode(await e.target.files[0].text())
    data.name = e.target.files[0].name

    // TODO: parse it all into a nice structure
    data.parsed = {}

    currentSet(data)
  })

  // save file for user
  const saveFile = useCallback((e) => {
    // TODO: put parsed back into settings
    download(current.name, encode(current))
  })

  return <context.Provider value={{ current, handleFile, saveFile }}>{children}</context.Provider>
}
